import { motion } from 'motion/react';
import svgPaths from "../../../imports/svg-6z873ywox0";

function RainbowText() {
  return (
    <motion.div 
      className="w-[231px] h-[94px]"
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 231 94">
        <g>
          <path d={svgPaths.p3d150b00} fill="#FFB5D0" />
          <path d={svgPaths.p336a5980} fill="#FF80B8" />
          <path d={svgPaths.p1d915c80} fill="#FF80B8" />
          <path d={svgPaths.p3b924700} fill="#FF4D6B" />
          <path d={svgPaths.p5062080} fill="#FF4D6B" />
          <path d={svgPaths.p1f7b2000} fill="#FF3A3C" />
          <path d={svgPaths.p17c0de80} fill="#FF3A3C" />
          <path d={svgPaths.p1a5442c0} fill="#FF5100" />
          <path d={svgPaths.p30e9d200} fill="#FF5100" />
          <path d={svgPaths.p127c4000} fill="#FF7416" />
          <path d={svgPaths.p1467f100} fill="#FFA727" />
          <path d={svgPaths.pcb35e80} fill="#FFA727" />
          <path d={svgPaths.p1ec5100} fill="#FFCD1A" />
          <path d={svgPaths.p21303880} fill="#FFCD1A" />
          <path d={svgPaths.p45aae80} fill="#D1FF27" />
          <path d={svgPaths.p224de00} fill="#D1FF27" />
          <path d={svgPaths.p2317f680} fill="#A7F70A" />
          <path d={svgPaths.p3d336e00} fill="#A7F70A" />
          <path d={svgPaths.pfcd5880} fill="#90DA00" />
          <path d={svgPaths.p27a8cd00} fill="#90DA00" />
        </g>
      </svg>
    </motion.div>
  );
}

export function MissingIngredient() {
  return (
    <div className="flex flex-col items-center justify-center text-center my-32 px-4">
      <RainbowText />
      
      <div className="mt-8 max-w-[800px] text-[28px] font-semibold text-[#bababa] leading-normal">
        <p className="mb-8">
          Right now your funds live in different card apps, spending means selling, top-ups are manual, and your collateral options are narrow.
        </p>
        <p className="mb-8 text-[#313131]">Everything works in isolation, but nothing connects.</p>
        
        <p className="mb-2">
          <span className="text-[#FF5100] font-bold">Miso</span> is the foundational ingredient that brings it all together:
          the consumer credit layer crypto has been waiting for.
        </p>
        
        <p className="text-[#313131] mt-8 font-bold">
          Your cards, credit, earnings, and automation - finally in one place.
        </p>
      </div>
    </div>
  );
}
