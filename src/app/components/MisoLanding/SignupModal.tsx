import { motion } from 'motion/react';
import { useEffect } from 'react';
import misoLogoIcon from '../../../assets/miso-logo-icon.svg';

export function SignupModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    const w = window as Window & { Tally?: { loadEmbeds: () => void } };
    w.Tally?.loadEmbeds();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-[480px] bg-white rounded-[24px] overflow-hidden shadow-2xl border border-[#f2f2f2]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <img src={misoLogoIcon} alt="Miso" className="h-6 w-auto" style={{ aspectRatio: '34.35 / 20' }} />
            <div>
              <h3 className="text-[18px] font-bold text-[#313131] leading-tight">Get Early Access</h3>
              <p className="text-[13px] text-[#999] font-medium">Be first to let your money cook</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2f2f2] transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="#999" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="h-px bg-[#f2f2f2] mx-6" />

        <div className="px-6 py-4">
          <iframe
            data-tally-src="https://tally.so/embed/44LdXo?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="178"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Miso Beta Signup Form"
            className="w-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
