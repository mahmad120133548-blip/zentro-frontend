import { Link, NavLink,useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { BoxIcon } from "lucide-react";
import { useContext, useState } from "react";
import CartContext from "../Context/CartContext";
import { useAuth } from "../Context/authContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [showAuthModal, setShowAuthModal] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Privacy", path: "/privacy" },
  ];

  const { cartItems } = useContext(CartContext);

  const handleCartClick = () => {
  if (user) {
    navigate("/cart");
  } else {
    setShowAuthModal(true);
  }
};

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/40 bg-[#061525]">
      <div className="mx-auto flex min-h-17 max-w-350 items-center px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-1">
          <BoxIcon className="text-orange-300" size={28} />
          <span className="text-2xl font-bold text-orange-500">
            Zen<span className="text-white">Tro</span>
          </span>
        </Link>

        <div className="ml-32 hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative flex h-17 items-center text-[14px] font-medium transition-colors ${
                  isActive
                    ? "text-orange-500"
                    : "text-white hover:text-orange-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-orange-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-4 md:flex lg:gap-6">
          

          <button
  type="button"
  onClick={handleCartClick}
  className="relative text-white transition-colors hover:text-orange-500 cursor-pointer"
>
            <ShoppingCart size={23} strokeWidth={1.8} />

            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </button>

          <Link
            to="/login"
            className="flex h-10 items-center gap-2 rounded-lg bg-orange-500 px-3 text-[13px] font-semibold text-white transition-colors hover:bg-orange-600 lg:px-4"
          >
            <User size={16} strokeWidth={2} />
            Login
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-4 md:hidden">
          <button
  type="button"
  onClick={handleCartClick}
  className="relative text-white transition-colors hover:text-orange-500"
>
            <ShoppingCart size={22} strokeWidth={1.8} />

            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-[#112337] hover:text-orange-500"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-700/40 bg-[#061525] px-4 pb-5 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `border-b border-white/5 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <User size={16} strokeWidth={2} />
               Login
            </Link>
          </div>
        </div>
      )}
      {showAuthModal && (
  <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#061525]/50 px-4 backdrop-blur-sm">
    <div className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

      <button
        type="button"
        onClick={() => setShowAuthModal(false)}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <X size={18} />
      </button>

      <div className="text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
          <ShoppingCart size={25} className="text-orange-500" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#0B1F33]">
          Login to View Your Cart
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please log in to your account to view your cart and continue shopping
        </p>

      </div>
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;

