import misoLogo from '../../../assets/logo.svg';

export function Footer() {
  return (
    <footer className="w-full bg-white py-20 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <img src={misoLogo} alt="miso" className="h-[20px] mb-6" />
          <p className="text-sm text-[#717171]">© 2026 Miso. All rights reserved.</p>
        </div>
        
        <div>
          <h4 className="font-bold text-[#313131] mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-[#717171]">
            <li>Features</li>
            <li>Pricing</li>
            <li>Security</li>
            <li>Roadmap</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#313131] mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-[#717171]">
            <li>Documentation</li>
            <li>API Reference</li>
            <li>Help Center</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#313131] mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-[#717171]">
            <li>About Us</li>
            <li>Press Kit</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#313131] mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-[#717171]">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Compliance</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
