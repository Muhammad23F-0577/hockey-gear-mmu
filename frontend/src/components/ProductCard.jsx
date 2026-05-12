import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const [selectedPrice, setSelectedPrice] = useState(
    product.priceOptions?.[0] || null
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);

  const decreaseQty = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, selectedPrice, quantity);
  };

  if (!product.priceOptions || product.priceOptions.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl border border-green-500/20 p-4 text-center">
        <p className="text-gray-400">🏑 Hockey product data incomplete</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-950 via-slate-900 to-black rounded-xl border border-green-500/20 overflow-hidden hover:border-green-400 transition hover:-translate-y-1 shadow-lg shadow-green-500/10">

      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={
            product.imageUrl ||
            "https://via.placeholder.com/300x200?text=Hockey+Gear"
          }
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4">

        {/* Brand */}
        <div className="text-sm text-green-400 font-semibold">
          {product.brand}
        </div>

        {/* Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-white mt-1 hover:text-green-300 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400">
            {"★".repeat(Math.floor(product.rating || 4))}
          </span>
          <span className="text-gray-500">
            {"☆".repeat(5 - Math.floor(product.rating || 4))}
          </span>
          <span className="text-xs text-gray-400 ml-1">
            ({product.rating || 4})
          </span>
        </div>

        {/* Price Options */}
        {product.priceOptions?.length > 0 && (
          <div className="mt-3">
            <select
              value={selectedPrice?.type}
              onChange={(e) => {
                const newOption = product.priceOptions.find(
                  (opt) => opt.type === e.target.value
                );
                setSelectedPrice(newOption);
              }}
              className="w-full bg-slate-800 border border-green-500/30 rounded-lg px-3 py-2 text-white text-sm focus:border-green-500 focus:outline-none"
            >
              {product.priceOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.type} - ₨{option.price.toLocaleString()}{" "}
                  {option.stock > 0
                    ? `(In Stock: ${option.stock})`
                    : "(Out of Stock)"}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity + Total */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center gap-2">
            <button
              onClick={decreaseQty}
              className="w-8 h-8 rounded-full bg-slate-800 text-white hover:bg-green-600 transition"
            >
              -
            </button>

            <span className="text-white font-semibold min-w-8 text-center">
              {quantity}
            </span>

            <button
              onClick={increaseQty}
              className="w-8 h-8 rounded-full bg-slate-800 text-white hover:bg-green-600 transition"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-xl font-bold text-green-400">
              ₨
              {(
                (selectedPrice?.price ||
                  product.priceOptions[0]?.price) * quantity
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={selectedPrice?.stock === 0}
          className={`w-full mt-4 py-2 rounded-lg font-semibold transition ${
            selectedPrice?.stock > 0
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {selectedPrice?.stock > 0
            ? "Add Hockey Gear"
            : "Out of Stock"}
        </button>

      </div>
    </div>
  );
};

export default ProductCard;