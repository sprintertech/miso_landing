import misoLogo from '../../../assets/logo.svg';

export function Footer() {
  return (
    <footer className="w-full bg-white py-12 md:py-20 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center">
        <img src={misoLogo} alt="miso" className="h-[20px] mb-6" />
        <p className="text-sm text-[#717171]">© 2026 Miso. All rights reserved.</p>
      </div>
    </footer>
  );
}
