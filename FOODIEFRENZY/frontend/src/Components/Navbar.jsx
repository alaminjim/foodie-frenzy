import { GiChefToque, GiForkKnifeSpoon } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiStar,
  FiPhone,
  FiShoppingCart,
  FiLogOut,
  FiKey,
} from "react-icons/fi";
import { useContext, useState } from "react";
import { useCart } from "../Context/CartContext";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import SocialLogin from "../Pages/Social/SocialLogin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const totalItems = useCart();
  const { user, userLogout, setUser } = useContext(AuthContext);

  const navLinks = [
    { name: "Home", to: "/", icon: <FiHome /> },
    { name: "Menu", to: "/menu", icon: <FiBook /> },
    { name: "About", to: "/about", icon: <FiStar /> },
    { name: "Contact", to: "/contact", icon: <FiPhone /> },
  ];

  const handleLogout = () => {
    userLogout()
      .then(() => {
        setUser(null);
        toast.success("logout successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
            <div className="h-[3px] bg-gradient-to-r from-amber-600/30 via-amber-400/50 to-amber-600/30 w-full mt-1 mr-2  shadow-amber-500/50"></div>
          </NavLink>
        </div>

        {/* desktop icon */}
        <div className="hidden md:flex items-center space-x-2 md:space-x-1 lg:space-x-4 flex-1 justify-end">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `group px-3 md:px-3 lg:px-4 py-2 md:py-2 lg:py-2 text-sm md:text-[15px] lg:text-base relative transition-all duration-300 flex items-center hover:bg-amber-900/20 rounded-3xl border-2 ${
                  isActive
                    ? "border-amber-600/50 bg-amber-900/20 shadow-[inset_0_0_15px] shadow-amber-500/20"
                    : "border-amber-900/30 hover:border-amber-600/50"
                } shadow-md shadow-amber-900/20`
              }
            >
              <span className="mr-2 text-sm md:text-[15px] lg:text-base text-amber-500 group-hover:text-amber-300 transition-all">
                {link.icon}
              </span>
              <span className="text-amber-100 group-hover:text-amber-300 relative">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 transition-all group-hover:w-full " />
              </span>
            </NavLink>
          ))}

          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 ml-3 md:ml-3 lg:ml-6 mr-2 md:mr-3 lg:mr-4">
            <NavLink
              to="/cart"
              className="p-2 md:p-2.0 lg:p-3 text-amber-100 rounded-xl transition-all relative   hover:text-amber-400  hover:shadow-lg hover:shadow-amber-500/30 shadow-md shadow-amber-900/20"
            >
              <FiShoppingCart className="text-base md:text-lg lg:text-lg"></FiShoppingCart>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-amber-100 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
            {/* Login Button */}
            {user && user?.email ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl shadow-md shadow-amber-900/20 transition-all
             bg-gradient-to-r from-amber-400 to-amber-600  hover:from-amber-300 hover:to-amber-500 flex items-center justify-center gap-1.5 text-black font-bold"
              >
                <FiLogOut className="text-lg"></FiLogOut>
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 rounded-xl shadow-md shadow-amber-900/20 transition-all
             bg-gradient-to-r from-amber-400 to-amber-600  hover:from-amber-300 hover:to-amber-500 flex items-center justify-center gap-1.5 text-black font-bold"
              >
                <FiKey className="text-lg"></FiKey>
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center mr-2">
          <button
            className="text-amber-500 hover:text-amber-300 focus:outline-none transition-all p-2.5 pt-1 rounded-xl border-2 border-amber-900/30 hover:border-amber-600/50 relative shadow-md shadow-amber-600/50 hover:shadow-lg hover:shadow-amber-500/30"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-2 relative">
              <span
                className={`block w-6 h-[2px] bg-current transition-all ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-[2px] bg-current ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-[2px] bg-current transition-all ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#2D1B0E] border-t-4 border-amber-900/40 relative shadow-lg shadow-amber-900/30 w-full">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm rounded-xl transition-all flex items-center ${
                    isActive
                      ? "bg-amber-600/30 text-amber-400"
                      : "hover:bg-amber-600/30  text-amber-400"
                  }`
                }
              >
                <span className="mr-3 text-amber-500">{link.icon}</span>
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t-2 border-amber-900/30 space-y-2">
              <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 text-center text-amber-100 rounded-xl border-2 border-amber-900/30 hover:border-amber-600/50 flex items-center justify-center space-x-2 text-sm gap-2.5"
              >
                <FiShoppingCart className="text-lg">
                  {totalItems > 0 && (
                    <span className="top-2 right-2 bg-amber-600 text-amber-100 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </FiShoppingCart>{" "}
                Cart
              </NavLink>

              {/* Login Button */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full px-4 py-3 rounded-xl shadow-md shadow-amber-900/20 transition-all
             bg-gradient-to-r from-amber-400 to-amber-600  hover:from-amber-300 hover:to-amber-500 flex items-center justify-center gap-1.5 text-black font-bold"
              >
                <FiKey className="text-lg"></FiKey>
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLoginModal(false)} // outside click closes modal
        >
          <div
            className="bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] rounded-xl p-8 w-full max-w-[480px] relative border-4 border-amber-700/30 shadow-[0_0_30px] shadow-amber-500/30"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-amber-500 hover:text-amber-300 text-3xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-amber-400 mb-4 text-center">
              {" "}
              Foodie-Frenzy Login{" "}
            </h2>

            <Login setShowLoginModal={setShowLoginModal}></Login>

            {/* Divider */}
            <div className="my-4 flex items-center">
              <hr className="flex-grow border-amber-700" />
              <span className="px-3 text-amber-300 text-sm">OR</span>
              <hr className="flex-grow border-amber-700" />
            </div>

            {/* social  */}
            <SocialLogin
              closeModal={() => setShowLoginModal(false)}
            ></SocialLogin>

            {/* Switch to Register */}
            <p className="text-sm text-center text-amber-200 mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  setShowLoginModal(false);
                  setShowRegisterModal(true);
                }}
                className="text-amber-400 cursor-pointer hover:underline font-semibold"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRegisterModal(false)} // outside click closes modal
        >
          <div
            className="bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] rounded-xl p-4 md:p-8 w-full max-w-[360px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[480px] relative border-4 border-amber-700/30 shadow-[0_0_30px] shadow-amber-500/30"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            {/* Close Button */}
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-3 right-3 text-2xl md:text-3xl text-amber-500 hover:text-amber-300"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4 md:mb-6 text-center">
              Create Your Account
            </h2>

            {/* Register Form */}
            <Register setShowRegisterModal={setShowRegisterModal} />

            {/* Divider */}
            <div className="my-4 flex items-center">
              <hr className="flex-grow border-amber-700" />
              <span className="px-3 text-amber-300 text-sm">OR</span>
              <hr className="flex-grow border-amber-700" />
            </div>

            {/* social  */}
            <SocialLogin
              closeModal={() => setShowRegisterModal(false)}
            ></SocialLogin>

            {/* Switch to Login */}
            <p className="text-sm md:text-base text-center text-amber-200 mt-4 md:mt-6">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
                className="text-amber-400 cursor-pointer hover:underline font-semibold"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
