import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'motion/react';
import { useRef, useState } from 'react';
import misoLogoIcon from '../../../assets/miso-logo-icon.svg';

const RAINBOW_COLORS = [
  "#FFDFE5", "#FFB5D0", "#FF80B8", "#FF5A92", "#FF4D6B",
  "#FF3A3C", "#FF5100", "#FF7416", "#FFA727", "#FFCD1A",
  "#F1F624", "#D1FF27", "#A7F70A", "#9DED00", "#90DA00",
];

const STEPS = [
  { title: "Connect Your Cards", desc: "Link your crypto cards and deposit funds. Your money stays yours and keeps earning.", align: "left" as const },
  { title: "Deposit to Earn", desc: "Send supported assets to activate your credit line and earn passive yield at the same time.", align: "right" as const },
  { title: "Get Instant Credit", desc: "Your credit line is based on your collateral. No credit checks, no paperwork, no waiting.", align: "left" as const },
  { title: "Start Spending", desc: "Spend anywhere, switch cards when you need to. Your money keeps cooking in the background.", align: "right" as const },
  { title: "Set your own rules", desc: "Pick your refill recipe: top up manually or let us auto-fund your balance when needed — always staying within your risk appetite.", align: "left" as const },
];

const RainbowBar = ({ clipPath }: { clipPath: MotionValue<string> }) => {
  const totalBlocks = 120;

  return (
    <div className="relative w-[8px] h-full">
      <div className="absolute inset-0 bg-[#f2f2f2]" />
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath }}
      >
        <div className="w-full h-full flex flex-col">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className="w-full"
              style={{
                flex: 1,
                backgroundColor: RAINBOW_COLORS[Math.min(Math.floor((i / totalBlocks) * RAINBOW_COLORS.length), RAINBOW_COLORS.length - 1)],
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Step = ({ title, desc, align = "left", active, passed }: { title: string; desc: string; align?: "left" | "right"; active: boolean; passed: boolean }) => {
  return (
    <div className={`flex w-full justify-start ${align === "right" ? "md:justify-end" : "md:justify-start"}`}>
      <motion.div
        className={`w-full md:w-[45%] text-left ${align === "right" ? "md:text-right" : "md:text-left"}`}
        animate={{
          opacity: active || passed ? 1 : 0.3,
          x: active ? 0 : (align === "left" ? -10 : 10),
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.h3
          className="text-[22px] md:text-[28px] font-bold mb-2 md:mb-4"
          animate={{ color: active ? "#313131" : passed ? "#313131" : "#d4d4d4" }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-[14px] md:text-[16px] font-semibold"
          animate={{ color: active ? "#717171" : passed ? "#bababa" : "#d4d4d4" }}
          transition={{ duration: 0.3 }}
        >
          {desc}
        </motion.p>
      </motion.div>
    </div>
  );
};

export function StartCooking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [lineComplete, setLineComplete] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const clipPath = useTransform(scrollYProgress, [0, 0.9], [
    "inset(0 0 100% 0)",
    "inset(0 0 0% 0)",
  ]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const stepCount = STEPS.length;
    const stepProgress = v * stepCount;
    const current = Math.floor(stepProgress);
    setActiveStep(Math.min(current, stepCount - 1));
    setLineComplete(v > 0.92);
  });

  return (
    <div id="how-it-works" className="w-full max-w-[1280px] mx-auto py-16 md:py-32 px-6 md:px-4 flex flex-col items-center scroll-mt-20">
      <div className="text-center mb-12 md:mb-24">
        <h2 className="text-[32px] md:text-[48px] font-bold text-[#313131] mb-4">Start Cooking in Minutes</h2>
        <p className="text-[16px] md:text-[20px] font-semibold text-[#717171] max-w-[800px] mx-auto">
          Deposit, get your credit line, and start spending.<br />Your money keeps earning the whole time.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-[1000px]">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full">
          <RainbowBar clipPath={clipPath} />
        </div>

        <div className="flex flex-col gap-16 md:gap-32 relative py-10 pl-8 md:pl-0">
          {STEPS.map((step, i) => (
            <Step
              key={i}
              title={step.title}
              desc={step.desc}
              align={step.align}
              active={i === activeStep}
              passed={i < activeStep}
            />
          ))}
        </div>

        <div className="relative flex justify-center mt-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -30, scale: 0.5 }}
            animate={lineComplete ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.5 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              animate={lineComplete ? {
                y: [0, -6, 0, -3, 0],
              } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <img src={misoLogoIcon} alt="" className="w-[103px] h-[60px]" />
            </motion.div>

            {lineComplete && (
              <>
                {[-20, -10, 0, 10, 20].map((x, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 left-1/2 w-[6px] h-[6px] rounded-full"
                    style={{ backgroundColor: RAINBOW_COLORS[i * 3] }}
                    initial={{ opacity: 1, x: x - 3, y: -10 }}
                    animate={{ opacity: [1, 1, 0], y: [-10, -30, -40], x: [x - 3, x * 1.5, x * 2] }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
