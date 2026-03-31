import { motion } from 'motion/react';
import svgPaths from "../../../imports/svg-6z873ywox0";
import img123121 from "../../../assets/7f42231256b19c3220e2a7b0fe96c7f1f753692c.png";
import img9Fcb87D542F84A9B991707F6272196Ed2 from "../../../assets/799e884a21e99aa10838cdb5cba15eaaa42119c7.png";
import { ImageWithFallback } from "../figma/ImageWithFallback";

function PixelDollarSigns() {
  return (
    <div className="absolute right-0 bottom-0 w-[140px] h-[140px] md:w-[220px] md:h-[220px]">
      <motion.div
        className="absolute w-[57px] h-[113px] md:w-[89px] md:h-[178px] bottom-0 right-[80px] md:right-[130px]"
        animate={{ y: [0, -10, 0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 89 178">
          <path d={svgPaths.p36901e80} fill="#313131" />
          <path d={svgPaths.p2f9f8680} fill="#313131" />
          <path d={svgPaths.p2fa1ab80} fill="#313131" />
          <path d={svgPaths.p3cf2d300} fill="#313131" />
          <path d={svgPaths.p368bd500} fill="#313131" />
          <path d={svgPaths.p1f792480} fill="#313131" />
          <path d={svgPaths.p3b641f80} fill="#313131" />
          <path d={svgPaths.p21964700} fill="#313131" />
          <path d={svgPaths.p360d6500} fill="#313131" />
          <path d={svgPaths.p2ede8300} fill="#313131" />
          <path d={svgPaths.p2b71580} fill="#313131" />
          <path d={svgPaths.p17973300} fill="#313131" />
          <path d={svgPaths.p28f615f0} fill="#313131" />
          <path d={svgPaths.p11f4ce80} fill="#313131" />
          <path d={svgPaths.p15315780} fill="#313131" />
          <path d={svgPaths.p21d3a720} fill="#313131" />
          <path d={svgPaths.p3082c800} fill="#313131" />
          <path d={svgPaths.p366ff300} fill="#313131" />
          <path d={svgPaths.p2ae8bc00} fill="#313131" />
          <path d={svgPaths.p1b05ab00} fill="#313131" />
          <path d={svgPaths.pa363700} fill="#313131" />
          <path d={svgPaths.p15334100} fill="#313131" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute w-[57px] h-[113px] md:w-[89px] md:h-[178px] bottom-[20px] md:bottom-[30px] right-[25px] md:right-[40px]"
        animate={{ y: [0, -8, 0, -12, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 89 178">
          <path d={svgPaths.p36901e80} fill="#313131" />
          <path d={svgPaths.p2f9f8680} fill="#313131" />
          <path d={svgPaths.p2fa1ab80} fill="#313131" />
          <path d={svgPaths.p3cf2d300} fill="#313131" />
          <path d={svgPaths.p368bd500} fill="#313131" />
          <path d={svgPaths.p1f792480} fill="#313131" />
          <path d={svgPaths.p3b641f80} fill="#313131" />
          <path d={svgPaths.p21964700} fill="#313131" />
          <path d={svgPaths.p360d6500} fill="#313131" />
          <path d={svgPaths.p2ede8300} fill="#313131" />
          <path d={svgPaths.p2b71580} fill="#313131" />
          <path d={svgPaths.p17973300} fill="#313131" />
          <path d={svgPaths.p28f615f0} fill="#313131" />
          <path d={svgPaths.p11f4ce80} fill="#313131" />
          <path d={svgPaths.p15315780} fill="#313131" />
          <path d={svgPaths.p21d3a720} fill="#313131" />
          <path d={svgPaths.p3082c800} fill="#313131" />
          <path d={svgPaths.p366ff300} fill="#313131" />
          <path d={svgPaths.p2ae8bc00} fill="#313131" />
          <path d={svgPaths.p1b05ab00} fill="#313131" />
          <path d={svgPaths.pa363700} fill="#313131" />
          <path d={svgPaths.p15334100} fill="#313131" />
        </svg>
      </motion.div>
    </div>
  );
}

function MixingLevels() {
  const tracks = [
    { x: 20, baseY: 100, animateY: [100, 30, 140, 60, 100], duration: 3.2 },
    { x: 100, baseY: 40, animateY: [40, 120, 20, 80, 40], duration: 2.8 },
    { x: 180, baseY: 160, animateY: [160, 60, 130, 30, 160], duration: 3.5 },
  ];

  return (
    <div className="absolute right-[20px] bottom-[20px] w-[112px] h-[112px] md:right-[36px] md:bottom-[36px] md:w-[220px] md:h-[218px]">
      <svg className="w-full h-full" viewBox="0 0 220 218" fill="none">
        {tracks.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={0} width={20} height={218} fill="#1F1F1F" />
            <motion.g
              animate={{ y: tracks[i].animateY.map(v => v - t.baseY) }}
              transition={{ duration: tracks[i].duration, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x={t.x - 20} y={t.baseY} width={60} height={20} fill="#1F1F1F" />
              <rect x={t.x} y={t.baseY} width={20} height={20} fill="#F9F9F9" />
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function EverythingInTheMix() {
  return (
    <div id="features" className="w-full max-w-[1280px] mx-auto px-4 py-12 md:py-20 flex flex-col items-center scroll-mt-20">
      <div className="text-center mb-10 md:mb-16 px-2">
        <h2 className="text-[32px] md:text-[48px] font-bold text-[#313131] mb-4">Everything In The Mix</h2>
        <p className="text-[16px] md:text-[20px] font-semibold text-[#717171] max-w-[800px] mx-auto">
          Miso has all the ingredients to make your money work harder, together in one app.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full md:auto-rows-[356px]">
        {/* All your cards - Span 2 cols, 2 rows */}
        <div className="md:col-span-2 md:row-span-2 h-[280px] md:h-auto bg-[#f9f9f9] rounded-[24px] p-6 md:p-9 overflow-hidden relative">
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#313131] mb-2">All your cards, one place.</h3>
          <p className="text-[14px] md:text-[16px] font-semibold text-[#bababa] max-w-[400px]">Connect, compare, and spend with the right card every time.</p>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4 w-[70%] md:w-[120%]">
             <ImageWithFallback src={img123121} alt="Cards" className="w-full object-contain" />
          </div>
        </div>

        {/* Your rules - Span 2 cols */}
        <div className="md:col-span-2 h-[280px] md:h-auto bg-[#f9f9f9] rounded-[24px] p-6 md:p-9 relative overflow-hidden">
          <div className="w-2/3 md:w-1/2">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#313131] mb-2">Your rules, your control.</h3>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#bababa]">No more manual top-ups. Set your rules once and let them run, and Miso handles the rest.</p>
          </div>
          <MixingLevels />
        </div>

        {/* Collateral */}
        <div className="bg-[#f4ffe0] rounded-[24px] p-6 md:p-9 flex flex-col justify-between h-[180px] md:h-auto">
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#313131] mb-2">Collateral that works for you.</h3>
          <p className="text-[14px] md:text-[16px] font-semibold text-[#abcd6b]">Not just stablecoins. Miso works with the assets you actually hold.</p>
        </div>

        {/* Credit Without Selling */}
        <div className="bg-[#ffedec] rounded-[24px] p-6 md:p-9 flex flex-col justify-between h-[180px] md:h-auto">
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#313131] mb-2">Credit Without Selling.</h3>
          <p className="text-[14px] md:text-[16px] font-semibold text-[#edb3b3]">Most cards make you sell to spend. Miso gives you credit backed by what you hold, your portfolio stays intact.</p>
        </div>

        {/* Earn while you borrow - Span 2 cols */}
        <div className="md:col-span-2 h-[280px] md:h-auto bg-[#f9f9f9] rounded-[24px] p-6 md:p-9 relative overflow-hidden">
          <div className="w-2/3 md:w-1/2">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#313131] mb-2">Earn while you borrow.</h3>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#bababa]">The money backing your credit doesn't sit idle. It keeps earning the whole time you're spending against it.</p>
          </div>
          <PixelDollarSigns />
        </div>

        {/* Unified Dashboard - Span 2 cols */}
        <div className="md:col-span-2 h-[280px] md:h-auto bg-[#f9f9f9] rounded-[24px] p-6 md:p-9 relative overflow-hidden">
          <div className="w-2/3 md:w-1/3">
            <h3 className="text-[20px] md:text-[24px] font-bold text-[#313131] mb-2">Unified Dashboard.</h3>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#bababa]">All your cards, balances, and credit in one place. You always know exactly where you stand.</p>
          </div>
          <div className="absolute right-[16px] top-[80px] bottom-[-60px] w-[140px] md:right-[36px] md:top-[48px] md:w-[244px]">
             <ImageWithFallback src={img9Fcb87D542F84A9B991707F6272196Ed2} alt="Dashboard" className="w-full h-full object-cover object-top rounded-[24px] shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
