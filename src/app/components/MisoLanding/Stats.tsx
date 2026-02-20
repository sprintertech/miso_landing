import { motion } from 'motion/react';

const StatCard = ({ title, subtitle, desc, className }: { title: string, subtitle: string, desc: string, className?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className={`bg-[#f5f5f5] rounded-[24px] p-6 flex flex-col justify-end h-full ${className}`}
  >
    <div className="flex flex-col items-start gap-2">
      <h3 className="text-[42px] font-bold text-[#313131] leading-none">{title}</h3>
      <p className="text-[18px] font-bold text-[#313131] leading-tight w-full">{subtitle}</p>
      <p className="text-[16px] font-semibold text-[#bababa] w-full">{desc}</p>
    </div>
  </motion.div>
);

export function Stats() {
  return (
    <div className="w-full max-w-[1068px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-24 px-6 md:px-0">
      <StatCard 
        title="$850M+" 
        subtitle="Collateral Locked" 
        desc="Secured across multiple chains" 
      />
      <StatCard 
        title="45K+" 
        subtitle="Active Credit Lines" 
        desc="Empowering crypto natives" 
      />
      <StatCard 
        title="92%" 
        subtitle="Avg. Collateral Ratio" 
        desc="Healthy, sustainable lending" 
      />
    </div>
  );
}
