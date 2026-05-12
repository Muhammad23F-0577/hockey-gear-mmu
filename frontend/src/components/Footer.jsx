import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 via-green-950 to-black relative bottom-0 w-full text-gray-300 border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-extrabold text-green-400 mb-4 tracking-wide">
              🏑 Hockey Gears
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Premium hockey equipment crafted for champions.
              Built with durability, performance, and modern innovation.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-300 text-sm font-medium">
                Trusted by Hockey Players
              </span>
            </div>
          </div>

          {/* Owners Section */}
          <div>
            <h3 className="text-green-400 font-bold mb-5 uppercase tracking-widest text-sm">
              Team Owners
            </h3>

            <ul className="space-y-5">

              {/* Owner 1 */}
              <li className="flex items-center justify-between bg-green-900/10 border border-green-500/10 rounded-xl px-4 py-3 hover:bg-green-900/20 transition">
                <div>
                  <p className="font-semibold text-green-300">Muhammad</p>
                  <p className="text-xs text-gray-500">Founder</p>
                </div>
                <div className="flex gap-3">
                  <FiGithub className="hover:text-green-400 cursor-pointer" />
                  <FiLinkedin className="hover:text-green-400 cursor-pointer" />
                  <FiInstagram className="hover:text-green-400 cursor-pointer" />
                </div>
              </li>

              {/* Owner 2 */}
              <li className="flex items-center justify-between bg-green-900/10 border border-green-500/10 rounded-xl px-4 py-3 hover:bg-green-900/20 transition">
                <div>
                  <p className="font-semibold text-green-300">Muhammad Mursaleen</p>
                  <p className="text-xs text-gray-500">Co-Founder</p>
                </div>
                <div className="flex gap-3">
                  <FiGithub className="hover:text-green-400 cursor-pointer" />
                  <FiLinkedin className="hover:text-green-400 cursor-pointer" />
                  <FiInstagram className="hover:text-green-400 cursor-pointer" />
                </div>
              </li>

              {/* Owner 3 */}
              <li className="flex items-center justify-between bg-green-900/10 border border-green-500/10 rounded-xl px-4 py-3 hover:bg-green-900/20 transition">
                <div>
                  <p className="font-semibold text-green-300">Muhammad Usman</p>
                  <p className="text-xs text-gray-500">Operations Head</p>
                </div>
                <div className="flex gap-3">
                  <FiGithub className="hover:text-green-400 cursor-pointer" />
                  <FiLinkedin className="hover:text-green-400 cursor-pointer" />
                  <FiInstagram className="hover:text-green-400 cursor-pointer" />
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-500/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-gray-500 text-sm tracking-wide">
            © 2026 HOCKEY GEARS. BUILT FOR CHAMPIONS OF THE GAME.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;