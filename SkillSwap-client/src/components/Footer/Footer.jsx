const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Explore Skills", href: "#" },
      { name: "Find Mentors", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Pricing", href: "#" },
    ],
    mentors: [
      { name: "Become a Mentor", href: "#" },
      { name: "Mentor Dashboard", href: "#" },
      { name: "Earnings", href: "#" },
      { name: "Resources", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms", href: "#" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-display font-bold text-white text-lg">
              SkillSwap
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            The mentorship platform where expertise meets ambition. Learn faster
            with 1-on-1 guidance.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-sm transition-colors">
              𝕏
            </button>
            <button className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-sm transition-colors">
              in
            </button>
            <button className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-sm transition-colors">
              ▶
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
          <ul className="space-y-2">
            {footerLinks.platform.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">For Mentors</h4>
          <ul className="space-y-2">
            {footerLinks.mentors.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
          <ul className="space-y-2">
            {footerLinks.company.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-slate-800 text-xs text-center">
        © 2026 SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
