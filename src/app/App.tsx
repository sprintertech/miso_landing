import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Hero } from "./components/MisoLanding/Hero";
import { Stats } from "./components/MisoLanding/Stats";
import { MissingIngredient } from "./components/MisoLanding/MissingIngredient";
import { EverythingInTheMix } from "./components/MisoLanding/EverythingInTheMix";
import { StartCooking } from "./components/MisoLanding/StartCooking";
import { Footer } from "./components/MisoLanding/Footer";
import { MisoCatcher } from "./components/MisoLanding/MisoCatcher";
import { SignupModal } from "./components/MisoLanding/SignupModal";

function AnimatedBowl({ visible }: { visible: boolean }) {
  const [eyesRight, setEyesRight] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setEyesRight((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, [visible]);

  const leftEyeBlack = eyesRight ? "white" : "#1F1F1F";
  const leftEyeWhite = eyesRight ? "#1F1F1F" : "white";
  const rightEyeBlack = eyesRight ? "white" : "#1F1F1F";
  const rightEyeWhite = eyesRight ? "#1F1F1F" : "white";

  return (
    <motion.svg
      width="320"
      height="132"
      viewBox="0 0 320 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ y: 200 }}
      animate={visible ? { y: 0 } : { y: 200 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <path d="M26.6264 0H0V26.5714H26.6264V0Z" fill="#FFDFE5"/>
      <path d="M53.2527 0H26.6263V26.5714H53.2527V0Z" fill="#FFB5D0"/>
      <path d="M26.6264 26.5713H0V53.1427H26.6264V26.5713Z" fill="#FFB5D0"/>
      <path d="M79.879 0H53.2527V26.5714H79.879V0Z" fill="#FF80B8"/>
      <path d="M53.2527 26.5713H26.6263V53.1427H53.2527V26.5713Z" fill="#FF80B8"/>
      <path d="M26.6264 53.1431H0V79.7145H26.6264V53.1431Z" fill="#FF80B8"/>
      <path d="M106.506 0H79.8792V26.5714H106.506V0Z" fill="#FF5A92"/>
      <path d="M79.879 26.5713H53.2527V53.1427H79.879V26.5713Z" fill="#FF5A92"/>
      <path d="M53.2527 53.1431H26.6263V79.7145H53.2527V53.1431Z" fill="#FF5A92"/>
      <motion.path d="M106.506 53.1431H79.8792V79.7145H106.506V53.1431Z" animate={{ fill: leftEyeBlack }} transition={{ duration: 0.15 }}/>
      <motion.path d="M133.132 53.1431H106.505V79.7145H133.132V53.1431Z" animate={{ fill: leftEyeWhite }} transition={{ duration: 0.15 }}/>
      <motion.path d="M213.011 53.1431H186.385V79.7145H213.011V53.1431Z" animate={{ fill: rightEyeBlack }} transition={{ duration: 0.15 }}/>
      <motion.path d="M239.637 53.1431H213.011V79.7145H239.637V53.1431Z" animate={{ fill: rightEyeWhite }} transition={{ duration: 0.15 }}/>
      <path d="M133.132 0H106.505V26.5714H133.132V0Z" fill="#FF4D6B"/>
      <path d="M106.506 26.5713H79.8792V53.1427H106.506V26.5713Z" fill="#FF4D6B"/>
      <path d="M79.879 53.1431H53.2527V79.7145H79.879V53.1431Z" fill="#FF4D6B"/>
      <path d="M53.2527 79.7144H26.6263V106.286H53.2527V79.7144Z" fill="#FF4D6B"/>
      <path d="M159.758 0H133.132V26.5714H159.758V0Z" fill="#FF3A3C"/>
      <path d="M133.132 26.5713H106.505V53.1427H133.132V26.5713Z" fill="#FF3A3C"/>
      <path d="M79.879 79.7144H53.2527V106.286H79.879V79.7144Z" fill="#FF3A3C"/>
      <path d="M53.2527 106.286H26.6263V132.857H53.2527V106.286Z" fill="#FF3A3C"/>
      <path d="M186.385 0H159.758V26.5714H186.385V0Z" fill="#FF5100"/>
      <path d="M159.758 26.5713H133.132V53.1427H159.758V26.5713Z" fill="#FF5100"/>
      <path d="M106.506 79.7144H79.8792V106.286H106.506V79.7144Z" fill="#FF5100"/>
      <path d="M79.879 106.286H53.2527V132.857H79.879V106.286Z" fill="#FF5100"/>
      <path d="M213.011 0H186.385V26.5714H213.011V0Z" fill="#FF7416"/>
      <path d="M186.385 26.5713H159.758V53.1427H186.385V26.5713Z" fill="#FF7416"/>
      <path d="M159.758 53.1431H133.132V79.7145H159.758V53.1431Z" fill="#FF7416"/>
      <path d="M133.132 79.7144H106.505V106.286H133.132V79.7144Z" fill="#FF7416"/>
      <path d="M106.506 106.286H79.8792V132.857H106.506V106.286Z" fill="#FF7416"/>
      <path d="M239.637 0H213.011V26.5714H239.637V0Z" fill="#FFA727"/>
      <path d="M213.011 26.5713H186.385V53.1427H213.011V26.5713Z" fill="#FFA727"/>
      <path d="M186.385 53.1431H159.758V79.7145H186.385V53.1431Z" fill="#FFA727"/>
      <path d="M159.758 79.7144H133.132V106.286H159.758V79.7144Z" fill="#FFA727"/>
      <path d="M133.132 106.286H106.505V132.857H133.132V106.286Z" fill="#FFA727"/>
      <path d="M266.264 0H239.637V26.5714H266.264V0Z" fill="#FFCD1A"/>
      <path d="M239.637 26.5713H213.011V53.1427H239.637V26.5713Z" fill="#FFCD1A"/>
      <path d="M186.385 79.7144H159.758V106.286H186.385V79.7144Z" fill="#FFCD1A"/>
      <path d="M159.758 106.286H133.132V132.857H159.758V106.286Z" fill="#FFCD1A"/>
      <path d="M292.89 106.286H266.264V132.857H292.89V106.286Z" fill="#90DA00"/>
      <path d="M292.89 0H266.264V26.5714H292.89V0Z" fill="#F1F624"/>
      <path d="M266.264 26.5713H239.637V53.1427H266.264V26.5713Z" fill="#F1F624"/>
      <path d="M213.011 79.7144H186.385V106.286H213.011V79.7144Z" fill="#F1F624"/>
      <path d="M186.385 106.286H159.758V132.857H186.385V106.286Z" fill="#F1F624"/>
      <path d="M319.503 0H292.876V26.5714H319.503V0Z" fill="#D1FF27"/>
      <path d="M292.89 26.5713H266.264V53.1427H292.89V26.5713Z" fill="#D1FF27"/>
      <path d="M266.264 53.1431H239.637V79.7145H266.264V53.1431Z" fill="#D1FF27"/>
      <path d="M239.637 79.7144H213.011V106.286H239.637V79.7144Z" fill="#D1FF27"/>
      <path d="M213.011 106.286H186.385V132.857H213.011V106.286Z" fill="#D1FF27"/>
      <path d="M319.503 26.5713H292.876V53.1427H319.503V26.5713Z" fill="#A7F70A"/>
      <path d="M292.89 53.1431H266.264V79.7145H292.89V53.1431Z" fill="#A7F70A"/>
      <path d="M266.264 79.7144H239.637V106.286H266.264V79.7144Z" fill="#A7F70A"/>
      <path d="M239.637 106.286H213.011V132.857H239.637V106.286Z" fill="#A7F70A"/>
      <path d="M319.503 53.1431H292.876V79.7145H319.503V53.1431Z" fill="#9DED00"/>
      <path d="M292.89 79.7144H266.264V106.286H292.89V79.7144Z" fill="#9DED00"/>
      <path d="M266.264 106.286H239.637V132.857H266.264V106.286Z" fill="#9DED00"/>
    </motion.svg>
  );
}

function BottomCTA({ onOpenSignup }: { onOpenSignup: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 mb-12 md:mb-20">
      <div ref={ref} className="bg-[#ebfeff] rounded-[24px] relative overflow-hidden min-h-[200px] md:min-h-[240px]">
        <div className="flex flex-col gap-3 md:gap-4 items-start justify-center px-6 py-8 md:px-10 md:py-10">
          <h2 className="text-[28px] md:text-[48px] font-bold text-[#1f1f1f] leading-tight max-w-[70%] md:max-w-none">Your money should work both ways</h2>
          <p className="text-[14px] md:text-[20px] font-semibold text-[#717171] leading-relaxed md:leading-[32px] max-w-[65%] md:max-w-none">Credit when you need it, earnings that never stop. Why choose?</p>
          <div onClick={onOpenSignup} className="group bg-[#1f1f1f] text-white px-6 md:px-8 py-3 rounded-full font-bold flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform text-[14px] md:text-[16px]">
            Get Early Access
            <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-[20px] group-hover:opacity-100">→</span>
          </div>
        </div>
        <div className="absolute right-[10px] md:right-[20px] bottom-0 w-[160px] md:w-[320px] pointer-events-none">
          <AnimatedBowl visible={isInView} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [gameOpen, setGameOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const openSignup = () => setSignupOpen(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setGameOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
      <Hero onOpenSignup={openSignup} />
      <Stats />
      <MissingIngredient />
      <EverythingInTheMix />
      <StartCooking />

      {/* Bottom CTA Section */}
      <BottomCTA onOpenSignup={openSignup} />

      <Footer />

      <AnimatePresence>
        {gameOpen && <MisoCatcher onClose={() => setGameOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {signupOpen && <SignupModal onClose={() => setSignupOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
