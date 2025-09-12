import { GiChefToque, GiForkKnifeSpoon } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#2D1B0E] border-b-8 border-amber-900/30 shadow-amber-900/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] font-vibes overflow-x-hidden">
      {/* Gradient line with embedded icons */}
      <div className="relative  max-w-7xl mx-auto px-4">
        <div className="shadow-amber-500/30 relative">
          {/* Icons inside the line */}
          <GiForkKnifeSpoon
            className="absolute -top-6 left-0 text-amber-500/50 rotate-45"
            size={32}
          />
          <GiForkKnifeSpoon
            className="absolute -top-6 right-0 text-amber-500/50 rotate-45"
            size={32}
          />
        </div>
      </div>

      {/* Main navbar section */}
      <div className="max-w-7xl mx-auto px-4 b-6 md:py-4 lg:py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 md:translate-x-4 lg:translate-x-6">
          <GiChefToque className="text-3xl md:text-4xl lg:text-5xl text-amber-500 transition-transform hover:rotate-12" />
          <NavLink
            to="/"
            className="text-2xl md:text-xl lg:text-4xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-monsieur tracking-wider"
          >
            Foodie-Frenzy
          </NavLink>
        </div>

        {/* Optional nav links */}
        <div className="flex space-x-6 text-amber-300">
          <NavLink to="/" className="hover:text-amber-400 transition-colors">
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-amber-400 transition-colors"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-amber-400 transition-colors"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
