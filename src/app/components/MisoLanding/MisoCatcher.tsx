import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import bowlSrc from '../../../assets/bowl.svg';
import seaweedSrc from '../../../assets/mascots/Seaweed.svg';
import carrotSrc from '../../../assets/mascots/Carrot.svg';
import tofuSrc from '../../../assets/mascots/Tofu.svg';
import leekSrc from '../../../assets/mascots/Leek.svg';

const RAINBOW = [
  "#FFDFE5", "#FFB5D0", "#FF80B8", "#FF5A92", "#FF4D6B",
  "#FF3A3C", "#FF5100", "#FF7416", "#FFA727", "#FFCD1A",
  "#F1F624", "#D1FF27", "#A7F70A", "#9DED00", "#90DA00",
];

const FOOD_SRCS = [seaweedSrc, carrotSrc, tofuSrc, leekSrc];

const PX = "'Pixelify Sans', monospace";

const CRYPTO_PIXELS: { name: string; grid: string[][]; color: string; bonus: number; label: string }[] = [
  {
    name: 'BTC', color: '#F7931A', bonus: 5, label: '+5 SATS!',
    grid: [
      ['0','0','1','1','1','1','0','0'],
      ['0','1','1','0','0','1','1','0'],
      ['0','1','0','1','1','0','1','0'],
      ['0','1','0','1','1','1','0','0'],
      ['0','1','0','1','1','1','0','0'],
      ['0','1','0','1','1','0','1','0'],
      ['0','1','1','0','0','1','1','0'],
      ['0','0','1','1','1','1','0','0'],
    ],
  },
  {
    name: 'ETH', color: '#627EEA', bonus: 3, label: '+3 GAS!',
    grid: [
      ['0','0','0','1','1','0','0','0'],
      ['0','0','1','1','1','1','0','0'],
      ['0','1','1','0','0','1','1','0'],
      ['1','1','0','0','0','0','1','1'],
      ['0','1','1','1','1','1','1','0'],
      ['0','0','1','0','0','1','0','0'],
      ['0','0','1','1','1','1','0','0'],
      ['0','0','0','1','1','0','0','0'],
    ],
  },
  {
    name: 'SOL', color: '#9945FF', bonus: 4, label: 'SPEED UP!',
    grid: [
      ['1','1','1','1','1','1','1','0'],
      ['0','0','0','0','0','0','1','1'],
      ['0','0','0','0','0','0','0','0'],
      ['0','1','1','1','1','1','1','1'],
      ['1','1','0','0','0','0','0','0'],
      ['0','0','0','0','0','0','0','0'],
      ['1','1','1','1','1','1','1','0'],
      ['0','0','0','0','0','0','1','1'],
    ],
  },
];

function createPixelCanvas(crypto: typeof CRYPTO_PIXELS[0], size: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d')!;
  const px = size / 8;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (crypto.grid[y][x] === '1') {
        ctx.fillStyle = crypto.color;
        ctx.fillRect(x * px, y * px, px, px);
        const n = parseInt(crypto.color.slice(1), 16);
        const r = Math.max(0, (n >> 16) - 40);
        const g = Math.max(0, ((n >> 8) & 0xff) - 40);
        const b = Math.max(0, (n & 0xff) - 40);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x * px, (y + 0.8) * px, px, px * 0.2);
      }
    }
  }
  return c;
}

interface FallingItem {
  x: number;
  y: number;
  speed: number;
  imgIndex: number;
  size: number;
  id: number;
  isCrypto: boolean;
  cryptoIndex: number;
}

interface FloatText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

function getLeaderboard(): LeaderboardEntry[] {
  try { return JSON.parse(localStorage.getItem('miso-leaderboard') || '[]'); }
  catch { return []; }
}

function saveToLeaderboard(entry: LeaderboardEntry) {
  const board = getLeaderboard();
  board.push(entry);
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem('miso-leaderboard', JSON.stringify(board.slice(0, 10)));
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function MisoCatcher({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(getLeaderboard());
  const [submitted, setSubmitted] = useState(false);
  const [shared, setShared] = useState(false);

  const gRef = useRef({
    bowlX: 0,
    bowlW: 180,
    bowlH: 74,
    items: [] as FallingItem[],
    floats: [] as FloatText[],
    score: 0,
    missed: 0,
    difficulty: 1,
    running: false,
    nextId: 0,
    foodImgs: [] as HTMLImageElement[],
    cryptoImgs: [] as HTMLCanvasElement[],
    bowlImg: null as HTMLImageElement | null,
    keys: { left: false, right: false },
    mouseX: -1,
    frame: 0,
    loaded: false,
    catchFlash: 0,
    spawnTimer: 0,
    stars: [] as { x: number; y: number; s: number; a: number }[],
  });

  const startGame = useCallback(() => {
    const g = gRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.getBoundingClientRect().width;
    g.bowlX = W / 2 - g.bowlW / 2;
    g.items = [];
    g.floats = [];
    g.score = 0;
    g.missed = 0;
    g.difficulty = 1;
    g.running = true;
    g.nextId = 0;
    g.frame = 0;
    g.mouseX = -1;
    g.catchFlash = 0;
    g.spawnTimer = 30;
    setScore(0);
    setGameState('playing');
    setSubmitted(false);
    setShared(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dead = false;
    const g = gRef.current;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      g.mouseX = e.clientX - rect.left;
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      g.mouseX = e.touches[0].clientX - rect.left;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); g.keys.left = true; }
      if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); g.keys.right = true; }
      if (e.key === 'Escape') onClose();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') g.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') g.keys.right = false;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('touchmove', onTouch, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    if (!g.loaded) {
      Promise.all([loadImg(bowlSrc), ...FOOD_SRCS.map(loadImg)]).then(([bowl, ...food]) => {
        if (dead) return;
        g.bowlImg = bowl;
        g.foodImgs = food;
        g.cryptoImgs = CRYPTO_PIXELS.map((cp) => createPixelCanvas(cp, 64));
        g.loaded = true;
        const W = canvas.getBoundingClientRect().width;
        const H = canvas.getBoundingClientRect().height;
        g.stars = Array.from({ length: 40 }, () => ({
          x: Math.random() * W, y: Math.random() * H,
          s: 0.5 + Math.random() * 1.5, a: Math.random() * Math.PI * 2,
        }));
      });
    }

    const BOWL_SPEED = 7;

    const loop = () => {
      if (dead) return;
      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;

      if (g.running) {
        g.frame++;

        if (g.mouseX >= 0) {
          const target = g.mouseX - g.bowlW / 2;
          g.bowlX += (target - g.bowlX) * 0.15;
        }
        if (g.keys.left) g.bowlX -= BOWL_SPEED;
        if (g.keys.right) g.bowlX += BOWL_SPEED;
        g.bowlX = Math.max(0, Math.min(W - g.bowlW, g.bowlX));

        g.spawnTimer--;
        if (g.frame > 30 && g.spawnTimer <= 0) {
          const count = g.difficulty >= 4 ? (Math.random() < 0.3 ? 2 : 1) : 1;
          for (let s = 0; s < count; s++) {
            const isCrypto = Math.random() < 0.12;
            const size = isCrypto ? 44 : (38 + Math.random() * 18);
            g.items.push({
              x: Math.random() * (W - size),
              y: -size - s * 40,
              speed: isCrypto ? (1 + Math.random() * 0.8) : (1.2 + Math.random() * 1 + g.difficulty * 0.15),
              imgIndex: isCrypto ? 0 : Math.floor(Math.random() * g.foodImgs.length),
              size, id: g.nextId++,
              isCrypto,
              cryptoIndex: isCrypto ? Math.floor(Math.random() * CRYPTO_PIXELS.length) : -1,
            });
          }
          const baseRate = Math.max(20, 50 - g.difficulty * 4);
          g.spawnTimer = baseRate + Math.floor(Math.random() * 15);
        }

        if (g.frame % 600 === 0) g.difficulty = Math.min(g.difficulty + 0.4, 8);

        const bowlY = H - g.bowlH - 16;
        const catchPad = 30;
        const kept: FallingItem[] = [];

        for (const it of g.items) {
          it.y += it.speed;
          const cx = it.x + it.size / 2;
          const bot = it.y + it.size;

          if (bot >= bowlY - catchPad && bot <= bowlY + g.bowlH + 20 && cx >= g.bowlX - catchPad && cx <= g.bowlX + g.bowlW + catchPad) {
            if (it.isCrypto) {
              const cp = CRYPTO_PIXELS[it.cryptoIndex];
              g.score += cp.bonus;
              g.catchFlash = 14;
              g.floats.push({ x: cx, y: bowlY - 20, text: cp.label, color: cp.color, life: 50 });
            } else {
              g.score++;
              g.catchFlash = 6;
            }
            setScore(g.score);
          } else if (it.y > H) {
            if (!it.isCrypto) {
              g.missed++;
              if (g.missed >= 1) {
                g.running = false;
                setFinalScore(g.score);
                setGameState('gameover');
              }
            }
          } else {
            kept.push(it);
          }
        }
        g.items = kept;

        g.floats = g.floats.filter((f) => { f.life--; f.y -= 1.2; return f.life > 0; });
      }

      if (g.catchFlash > 0) g.catchFlash--;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, W, H);

      for (const star of g.stars) {
        star.a += 0.02;
        const alpha = 0.15 + Math.sin(star.a) * 0.1;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillRect(star.x, star.y, star.s, star.s);
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 2;
      ctx.strokeRect(8, 8, W - 16, H - 16);

      const grad = ctx.createLinearGradient(0, H - 2, W, H - 2);
      RAINBOW.forEach((c, i) => grad.addColorStop(i / (RAINBOW.length - 1), c));
      ctx.fillStyle = grad;
      ctx.fillRect(8, H - 4, W - 16, 2);

      for (const it of g.items) {
        if (it.isCrypto) {
          const cImg = g.cryptoImgs[it.cryptoIndex];
          if (cImg) {
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            const glow = CRYPTO_PIXELS[it.cryptoIndex].color;
            ctx.shadowColor = glow;
            ctx.shadowBlur = 12 + Math.sin(g.frame * 0.1) * 4;
            ctx.drawImage(cImg, it.x, it.y, it.size, it.size);
            ctx.restore();
            ctx.fillStyle = glow;
            ctx.font = `bold 10px ${PX}`;
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.7;
            ctx.fillText(CRYPTO_PIXELS[it.cryptoIndex].name, it.x + it.size / 2, it.y + it.size + 11);
            ctx.globalAlpha = 1;
          }
        } else {
          const img = g.foodImgs[it.imgIndex];
          if (img) ctx.drawImage(img, it.x, it.y, it.size, it.size);
        }
      }

      if (g.bowlImg) {
        const bowlY = H - g.bowlH - 16;
        if (g.catchFlash > 0) {
          ctx.save();
          ctx.shadowColor = g.catchFlash > 10 ? RAINBOW[Math.floor(Math.random() * RAINBOW.length)] : '#fff';
          ctx.shadowBlur = g.catchFlash > 10 ? 30 : 15;
          ctx.drawImage(g.bowlImg, g.bowlX, bowlY, g.bowlW, g.bowlH);
          ctx.restore();
        } else {
          ctx.drawImage(g.bowlImg, g.bowlX, bowlY, g.bowlW, g.bowlH);
        }
      }

      for (const f of g.floats) {
        ctx.font = `bold 18px ${PX}`;
        ctx.textAlign = 'center';
        ctx.fillStyle = f.color;
        ctx.globalAlpha = Math.min(1, f.life / 15);
        ctx.fillText(f.text, f.x, f.y);
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = '#fff';
      ctx.font = `bold 20px ${PX}`;
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE`, 24, 40);
      const scoreText = String(g.score).padStart(4, '0');
      ctx.font = `bold 36px ${PX}`;
      const scoreGrad = ctx.createLinearGradient(24, 48, 24 + 100, 48);
      scoreGrad.addColorStop(0, RAINBOW[4]);
      scoreGrad.addColorStop(1, RAINBOW[12]);
      ctx.fillStyle = scoreGrad;
      ctx.fillText(scoreText, 24, 74);

      ctx.fillStyle = '#FF4D6B';
      ctx.font = `bold 24px ${PX}`;
      ctx.textAlign = 'right';
      ctx.fillText(g.missed >= 1 ? 'x' : '♥', W - 38, 50);
      if (g.missed < 1) {
        ctx.font = `bold 14px ${PX}`;
        ctx.fillText('x1', W - 24, 50);
      }

      if (!g.running && gameState === 'ready') {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.font = `bold 32px ${PX}`;
        ctx.textAlign = 'center';
        ctx.fillText('MISO CATCHER', W / 2, H / 2 - 50);
        ctx.font = `16px ${PX}`;
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText('Use arrow keys or mouse to move', W / 2, H / 2 - 10);
        ctx.fillText('Catch ingredients \u2022 Grab crypto for bonus points!', W / 2, H / 2 + 18);

        ctx.font = `bold 18px ${PX}`;
        ctx.fillStyle = '#fff';
        const pulse = 0.7 + Math.sin(Date.now() / 400) * 0.3;
        ctx.globalAlpha = pulse;
        ctx.fillText('[ PRESS SPACE OR CLICK TO START ]', W / 2, H / 2 + 70);
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    const onStart = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'ready') {
        e.preventDefault();
        startGame();
      }
    };
    const onClickStart = () => {
      if (gameState === 'ready') startGame();
    };
    window.addEventListener('keydown', onStart);
    canvas.addEventListener('click', onClickStart);

    return () => {
      dead = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('touchmove', onTouch);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onStart);
      canvas.removeEventListener('click', onClickStart);
    };
  }, [gameState, startGame, onClose]);

  const handleSubmitScore = () => {
    if (!playerName.trim()) return;
    saveToLeaderboard({ name: playerName.trim(), score: finalScore, date: new Date().toLocaleDateString() });
    setLeaderboard(getLeaderboard());
    setSubmitted(true);
  };

  const handleShare = (platform: 'twitter' | 'copy') => {
    const text = `I scored ${finalScore} in Miso Catcher! Can you beat my score?`;
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-[95vw] max-w-[900px] h-[90vh] max-h-[800px] bg-[#0a0a0a] rounded-[16px] overflow-hidden border-2 border-white/10 shadow-[0_0_60px_rgba(255,77,107,0.15)] flex flex-col"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
      >
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {RAINBOW.slice(0, 7).map((c, i) => (
                <div key={i} className="w-1.5 h-4 rounded-sm" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase" style={{ fontFamily: PX }}>Miso Catcher</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center text-white/30 text-[10px]" style={{ fontFamily: PX }}>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">&larr;</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">&rarr;</kbd>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-sm px-2 py-1 rounded border border-white/10 hover:border-white/30" style={{ fontFamily: PX }}>ESC</button>
          </div>
        </div>

        <div className="flex-1 relative">
          <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: 'none', cursor: gameState === 'playing' ? 'none' : 'pointer' }} />

          <AnimatePresence>
            {gameState === 'gameover' && (
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-[#111] rounded-[16px] p-8 w-[90%] max-w-[420px] border border-white/10 shadow-[0_0_40px_rgba(255,77,107,0.1)]"
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <div className="text-center mb-6">
                    <p className="text-[14px] text-white/30 tracking-widest uppercase mb-2" style={{ fontFamily: PX }}>Game Over</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-[56px] font-bold leading-none" style={{
                        background: `linear-gradient(135deg, ${RAINBOW[4]}, ${RAINBOW[9]}, ${RAINBOW[13]})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: PX,
                      }}>{String(finalScore).padStart(4, '0')}</span>
                    </div>
                    <p className="text-white/40 text-sm font-semibold mt-2" style={{ fontFamily: PX }}>
                      {finalScore === 0 ? 'Better luck next time!' : finalScore < 10 ? 'Not bad, keep going!' : finalScore < 25 ? 'Nice catch!' : 'Legendary chef!'}
                    </p>
                  </div>

                  {!submitted ? (
                    <div className="mb-5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter name..."
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSubmitScore()}
                          maxLength={15}
                          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#ff7416]/50 transition-colors"
                          style={{ fontFamily: PX }}
                          autoFocus
                        />
                        <button
                          onClick={handleSubmitScore}
                          className="px-5 py-3 rounded-full text-sm font-bold transition-colors hover:brightness-110"
                          style={{ background: '#ff7416', color: '#fff', fontFamily: PX }}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 mb-5">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex-1 rounded-full px-4 py-3 text-white text-sm font-bold hover:brightness-110 transition-colors"
                        style={{ fontFamily: PX, background: '#ff7416' }}
                      >
                        SHARE ON X
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="flex-1 rounded-full px-4 py-3 text-white text-sm font-bold hover:brightness-110 transition-colors border border-[#ff7416]"
                        style={{ fontFamily: PX, background: 'transparent', color: '#ff7416' }}
                      >
                        {shared ? 'COPIED!' : 'COPY'}
                      </button>
                    </div>
                  )}

                  {leaderboard.length > 0 && (
                    <div className="border-t border-white/10 pt-4 mb-5">
                      <h4 className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ fontFamily: PX }}>High Scores</h4>
                      <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                        {leaderboard.slice(0, 5).map((entry, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-1 px-2 rounded" style={{ background: i === 0 ? 'rgba(255,255,255,0.03)' : 'transparent', fontFamily: PX }}>
                            <div className="flex items-center gap-3">
                              <span className="w-5 text-right font-bold" style={{ color: RAINBOW[i * 3] || '#fff' }}>
                                {i + 1}.
                              </span>
                              <span className="text-white/70">{entry.name}</span>
                            </div>
                            <span className="text-white/50 font-bold">{String(entry.score).padStart(4, '0')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={startGame}
                    className="w-full py-3.5 rounded-full font-bold text-sm tracking-wider text-white transition-all hover:brightness-110"
                    style={{ background: '#ff7416', fontFamily: PX }}
                  >
                    PLAY AGAIN
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
