import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-400 scale-110 font-bold underline hover:text-green-300"
      : "text-white hover:text-green-300 transition";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-slate-950 via-green-950 to-slate-900 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-50 border-b border-green-500/20">

      {/* Logo */}
      <span>
        <img
          src="/Images/navbarlogo.png"
          alt="Logo"
          className="w-24 h-20 object-contain"
        />
      </span>

      {/* Navigation */}
      <div className="flex gap-6 bg-green-900/20 backdrop-blur-md p-4 rounded-xl border border-green-500/20 shadow-md">
        <NavLink to="/home" className={linkClass}>Home</NavLink>
        <NavLink to="/bats" className={linkClass}>Bats</NavLink>
        <NavLink to="/balls" className={linkClass}>Balls</NavLink>
        <NavLink to="/kits" className={linkClass}>Kits</NavLink>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-5">

        {/* Profile */}
        <NavLink to="/profile" className="hover:text-green-400 transition">
          <FiUser size={22} />
        </NavLink>

        {/* Cart */}
        <NavLink to="/cart" className="relative hover:text-green-400 transition">
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition"
        >
          <FiLogOut size={18} />
          <span className="hidden sm:inline">Signout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;