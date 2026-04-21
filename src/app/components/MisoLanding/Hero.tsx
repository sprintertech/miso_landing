import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import misoLogo from '../../../assets/logo.svg';
import seaweedSvg from '../../../assets/mascots/Seaweed.svg';
import carrotSvg from '../../../assets/mascots/Carrot.svg';
import carrot1Svg from '../../../assets/mascots/Carrot-1.svg';
import leekSvg from '../../../assets/mascots/Leek.svg';
import leek1Svg from '../../../assets/mascots/Leek-1.svg';
import tofuSvg from '../../../assets/mascots/Tofu.svg';
import coinSvg from '../../../assets/mascots/Group 1312321863.svg';
import stashLogo from '../../../assets/stash.svg';

const mascots = [
  { src: seaweedSvg, size: 149, finalX: -467, finalY: -227, mobileX: -140, mobileY: -200, mobileSize: 70, rotate: 0, floatX: 8, floatY: 12, floatDuration: 6 },
  { src: carrotSvg, size: 124, finalX: 412, finalY: -178, mobileX: 130, mobileY: -180, mobileSize: 60, rotate: 0, floatX: -10, floatY: 8, floatDuration: 5.5 },
  { src: carrot1Svg, size: 124, finalX: -707, finalY: 32, mobileX: -160, mobileY: 30, mobileSize: 55, rotate: 0, floatX: 6, floatY: -10, floatDuration: 7 },
  { src: coinSvg, size: 99, finalX: -490, finalY: 194, mobileX: -130, mobileY: 180, mobileSize: 45, rotate: 0, floatX: -8, floatY: 6, floatDuration: 6.5 },
  { src: leekSvg, size: 149, finalX: 430, finalY: 287, mobileX: 140, mobileY: 200, mobileSize: 65, rotate: 0, floatX: 10, floatY: -8, floatDuration: 5 },
  { src: tofuSvg, size: 99, finalX: 793, finalY: -11, mobileX: 165, mobileY: 20, mobileSize: 45, rotate: 0, floatX: -6, floatY: 10, floatDuration: 7.5 },
  { src: leek1Svg, size: 149, finalX: 818, finalY: -398, mobileX: 155, mobileY: -260, mobileSize: 55, rotate: 0, floatX: 7, floatY: -7, floatDuration: 6.2 },
];

const words = ['Let', 'Your', 'Money', 'Cook'];
const WORD_STAGGER = 0.15;
const DOT_DELAY = words.length * WORD_STAGGER + 0.3;
const SUBTITLE_DELAY = DOT_DELAY + 0.5;
const MASCOT_DELAY = 0.2;

function MobileMenu({ open, onClose, onOpenSignup }: { open: boolean; onClose: () => void; onOpenSignup: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white flex flex-col"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <img src={misoLogo} alt="miso" className="h-[20px]" />
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4L16 16M16 4L4 16" stroke="#313131" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 mt-12">
            <a href="#features" className="text-2xl font-semibold text-[#313131] cursor-pointer" onClick={onClose}>Features</a>
            <a href="#how-it-works" className="text-2xl font-semibold text-[#313131] cursor-pointer" onClick={onClose}>How It Works</a>
            <a href="#about" className="text-2xl font-semibold text-[#313131] cursor-pointer" onClick={onClose}>About</a>
            <Link to="/faq" className="text-2xl font-semibold text-[#313131] cursor-pointer" onClick={onClose}>FAQ</Link>
            <div onClick={() => { onClose(); onOpenSignup(); }} className="group bg-[#313131] text-white px-8 py-3 rounded-full text-lg font-bold cursor-pointer flex items-center gap-1 mt-4">
              Get Early Access
              <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[20px] group-hover:opacity-100">→</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Hero({ onOpenSignup }: { onOpenSignup: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / innerWidth);
      mouseY.set((e.clientY - innerHeight / 2) / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), springConfig);
  const smoothRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), springConfig);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-white flex flex-col items-center justify-center perspective-[1000px]">

      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#f2f2f2] rounded-full pl-6 pr-[6px] py-[6px] flex items-center gap-8 z-50 max-md:hidden">
        <img src={misoLogo} alt="miso" className="h-[20px] shrink-0" />
        <div className="flex gap-6 text-sm font-semibold text-[#313131]">
            <a href="#features" className="cursor-pointer transition-colors hover:text-[#ff7416]">Features</a>
            <a href="#how-it-works" className="cursor-pointer transition-colors hover:text-[#ff7416]">How It Works</a>
            <a href="#about" className="cursor-pointer transition-colors hover:text-[#ff7416]">About</a>
            <Link to="/faq" className="cursor-pointer transition-colors hover:text-[#ff7416]">FAQ</Link>
        </div>
        <div onClick={onOpenSignup} className="group bg-[#313131] text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer flex items-center gap-1">
            Get Early Access
            <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[20px] group-hover:opacity-100">→</span>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-5 z-50 md:hidden">
        <img src={misoLogo} alt="miso" className="h-[18px]" />
        <button onClick={() => setMenuOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f2f2f2]">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M1 1H17M1 7H17M1 13H17" stroke="#313131" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenSignup={onOpenSignup} />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center gap-4 md:gap-6 px-6"
        style={isMobile ? undefined : { rotateX: smoothRotateX, rotateY: smoothRotateY }}
      >
        <h1 className="text-[48px] md:text-[88px] font-bold text-[#313131] leading-[0.9] flex flex-wrap justify-center gap-x-[0.3em]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * WORD_STAGGER, ease: "easeOut" }}
            >
              {word}
              {i === words.length - 1 && (
                <motion.span
                  className="text-[#ff7416]"
                  initial={{ opacity: 0, y: -60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: DOT_DELAY, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  .
                </motion.span>
              )}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="text-[16px] md:text-[20px] font-semibold text-[#717171] max-w-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: SUBTITLE_DELAY }}
        >
          Your cards, credit, earnings, and automation all in one app.
        </motion.p>
        <motion.div
          onClick={onOpenSignup}
          className="group bg-[#313131] text-white px-8 py-3 rounded-full font-bold flex items-center gap-1 cursor-pointer mt-4 hover:scale-105 transition-transform text-[14px] md:text-[16px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: SUBTITLE_DELAY + 0.15 }}
        >
          Get Early Access
          <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[20px] group-hover:opacity-100">→</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: SUBTITLE_DELAY + 0.4 }}
      >
        <span className="text-[12px] text-[#1f1f1f] font-normal">powered by</span>
        <img src={stashLogo} alt="stash" className="h-[24px] w-auto" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        {mascots.map(({ src, size, finalX, finalY, mobileX, mobileY, mobileSize, rotate, floatX, floatY, floatDuration }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ width: isMobile ? mobileSize : size, height: isMobile ? mobileSize : size }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: isMobile ? mobileX : finalX,
              y: isMobile ? mobileY : finalY,
              scale: 1,
              opacity: isMobile ? 0.6 : 1,
              rotate,
            }}
            transition={{
              duration: 0.8,
              delay: MASCOT_DELAY + i * 0.08,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              className="w-full h-full"
              animate={{
                x: [0, floatX * (isMobile ? 0.5 : 1), 0, -floatX * 0.5 * (isMobile ? 0.5 : 1), 0],
                y: [0, floatY * (isMobile ? 0.5 : 1), 0, -floatY * 0.5 * (isMobile ? 0.5 : 1), 0],
              }}
              transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img src={src} alt="" className="w-full h-full" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
