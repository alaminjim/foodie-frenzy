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
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import Register from "../Pages/Register/Register";
import SocialLogin from "../Pages/Social/SocialLogin";
import Login from "../Pages/Login/Login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { totalItems } = useCart();
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
        toast.success("Logout successful");
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <nav className="bg-[#2D1B0E] border-b-8 border-amber-900/30 shadow-amber-900/30 sticky top-0 z-50 font-vibes">
      <div className="relative max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <GiChefToque className="text-3xl md:text-4xl lg:text-5xl text-amber-500 hover:rotate-12 transition-transform" />
          <NavLink
            to="/"
            className="text-2xl md:text-xl lg:text-4xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-monsieur tracking-wider"
          >
            Foodie-Frenzy
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-3xl flex items-center transition-all duration-300 border-2 ${
                  isActive
                    ? "border-amber-600/50 bg-amber-900/20 shadow-[inset_0_0_15px] shadow-amber-500/20"
                    : "border-amber-900/30 hover:border-amber-600/50"
                }`
              }
            >
              <span className="mr-2 text-amber-500">{link.icon}</span>
              <span className="text-amber-100">{link.name}</span>
            </NavLink>
          ))}

          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative p-2 text-amber-100 rounded-xl hover:text-amber-400"
          >
            <FiShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-amber-100 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Login / Logout */}
          {user && user.email ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold flex items-center gap-1.5"
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold flex items-center gap-1.5"
            >
              <FiKey /> Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-amber-500"
          >
            <div className="space-y-1">
              <span
                className={`block w-6 h-0.5 bg-current ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-current ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-current ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#2D1B0E] border-t-4 border-amber-900/40 p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-amber-600/30 text-amber-400"
                    : "hover:bg-amber-600/30 text-amber-400"
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Login / Logout */}
          {user && user.email ? (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold flex items-center gap-1.5"
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold flex items-center gap-1.5"
            >
              <FiKey /> Login
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] rounded-xl p-8 w-full max-w-[480px] relative border-4 border-amber-700/30 shadow-[0_0_30px] shadow-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-amber-500 hover:text-amber-300 text-3xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-amber-400 mb-4 text-center">
              Foodie-Frenzy Login
            </h2>

            <Login onSuccess={() => setShowLoginModal(false)} />

            <div className="my-4 flex items-center">
              <hr className="flex-grow border-amber-700" />
              <span className="px-3 text-amber-300 text-sm">OR</span>
              <hr className="flex-grow border-amber-700" />
            </div>

            <SocialLogin closeModal={() => setShowLoginModal(false)} />

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
          className="min-h-screen bg-[#1a120b] flex items-center justify-center p-4"
          onClick={() => setShowRegisterModal(false)}
        >
          <div
            className="bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] rounded-xl p-8 w-full max-w-[480px] relative border-4 border-amber-700/30 shadow-[0_0_30px] shadow-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-3 right-3 text-2xl md:text-3xl text-amber-500 hover:text-amber-300"
            >
              &times;
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-6 text-center">
              Create Your Account
            </h2>

            <Register setShowRegisterModal={setShowRegisterModal} />

            <div className="my-4 flex items-center">
              <hr className="flex-grow border-amber-700" />
              <span className="px-3 text-amber-300 text-sm">OR</span>
              <hr className="flex-grow border-amber-700" />
            </div>

            <SocialLogin closeModal={() => setShowRegisterModal(false)} />

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
