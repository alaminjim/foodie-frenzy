import { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { dummyMenuData } from "../../../public/FOODIE-FRENZY-FINAL/OmDD";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./OurMenu.css";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Mexican",
  "Italian",
  "Desserts",
  "Drinks",
];

const OurMenu = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [activeCategories, setActiveCategories] = useState(categories[0]);
  const displayItems = dummyMenuData[activeCategories] || [];

  const getQuantity = (id) => cartItems.find((i) => i.id === id)?.quantity || 0;
  return (
    <div className="bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
          <span className="font-dancingScript block text-5xl md:text-7xl sm:text-6xl mb-2">
            Our Exquisite Menu
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-amber-100/80 ">
            A Symphony of Flavours
          </span>
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategories(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm ${
                activeCategories === cat
                  ? "bg-gradient-to-r from-amber-900/20 to-amber-700/80 border-amber-800 scale-105 shadow-xl shadow-amber-900/30"
                  : "bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-95"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {displayItems.map((items) => {
            const quantity = getQuantity(items.id);

            return (
              <div
                key={items.id}
                className="relative bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10">
                  <img
                    src={items.image}
                    alt={items.name}
                    className="max-w-full max-h-full object-contain transition-all duration-700"
                  />
                </div>

                {/* Text */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent opacity-50 mb-3"></div>

                  <h3 className="text-xl sm:text-2xl mb-2 font-dancingScript text-amber-100 transition-colors">
                    {items.name}
                  </h3>
                  <p className="text-amber-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed">
                    {items.description}
                  </p>

                  {/* Price + Cart */}
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-amber-400">
                      ${items.price}
                    </span>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
                          onClick={() => updateQuantity(items.id, quantity - 1)}
                        >
                          <FaMinus className="text-amber-100" />
                        </button>

                        <span className="w-8 text-center text-amber-100">
                          {quantity}
                        </span>

                        <button
                          className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
                          onClick={() => updateQuantity(items.id, quantity + 1)}
                        >
                          <FaPlus className="text-amber-100" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(items, 1)}
                        className="bg-amber-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs uppercase sm:text-sm tracking-wider transition-transform duration-300 hover:scale-110 hover:shadow-amber-900/20 relative overflow-hidden border border-amber-800/50"
                      >
                        <span className="relative z-10 text-black">
                          Add to cart
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
