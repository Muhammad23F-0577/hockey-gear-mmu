// frontend/src/pages/ProductDetailsPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`, {
          signal: controller.signal,
        });

        if (isMounted) {
          setProduct(res.data.product);
          if (res.data.product.priceOptions?.length > 0) {
            setSelectedPrice(res.data.product.priceOptions[0]);
          }
          setError("");
        }
      } catch (err) {
        if (isMounted && err.name !== "CanceledError") {
          setError("Hockey product not found");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-green-400 text-xl animate-pulse">
          Loading hockey gear...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">
            {error || "Hockey product not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (selectedPrice) {
      addToCart(product, selectedPrice, quantity);
      alert(`Added ${quantity} x ${product.name} to cart!`);
      setQuantity(1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-6xl">

        <button
          onClick={() => navigate(-1)}
          className="text-green-400 hover:text-green-300 mb-6 flex items-center gap-2 transition"
        >
          ← Back to Hockey Store
        </button>

        <div className="grid md:grid-cols-2 gap-8">

          {/* IMAGE */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-green-500/20">
            {!imageLoaded && (
              <div className="h-96 w-full bg-slate-800 rounded-xl animate-pulse" />
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full object-cover rounded-xl transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0 h-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* DETAILS */}
          <div>

            <div className="text-sm text-green-400 font-semibold mb-2">
              {product.brand}
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-green-400">
                {"★".repeat(Math.floor(product.rating || 4))}
                {"☆".repeat(5 - Math.floor(product.rating || 4))}
              </div>
              <span className="text-gray-400">
                ({product.rating || 4})
              </span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* VARIANTS */}
            {product.priceOptions && product.priceOptions.length > 0 && (
              <div className="mb-6">

                <label className="block text-gray-400 mb-2">
                  Select Hockey Variant
                </label>

                <select
                  value={selectedPrice?.type}
                  onChange={(e) => {
                    const option = product.priceOptions.find(
                      (opt) => opt.type === e.target.value
                    );
                    setSelectedPrice(option);
                  }}
                  className="w-full md:w-64 bg-slate-800 border border-green-500/20 rounded-lg px-4 py-2 text-white"
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

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mb-6">

              <span className="text-gray-400">Quantity:</span>

              <div className="flex items-center gap-3">

                <button
                  onClick={decreaseQty}
                  className="w-10 h-10 rounded-full bg-slate-800 text-white text-xl hover:bg-green-600 transition"
                >
                  -
                </button>

                <span className="text-white text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>

                <button
                  onClick={increaseQty}
                  className="w-10 h-10 rounded-full bg-slate-800 text-white text-xl hover:bg-green-600 transition"
                >
                  +
                </button>

              </div>
            </div>

            {/* TOTAL + BUTTON */}
            <div className="border-t border-green-500/10 pt-6">

              <div className="flex items-center justify-between mb-4">

                <span className="text-gray-400">Total Price:</span>

                <span className="text-3xl font-bold text-green-400">
                  ₨
                  {(
                    (selectedPrice?.price ||
                      product.priceOptions?.[0]?.price ||
                      0) * quantity
                  ).toLocaleString()}
                </span>

              </div>

              <button
                onClick={handleAddToCart}
                disabled={selectedPrice?.stock === 0}
                className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                  selectedPrice?.stock > 0
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedPrice?.stock > 0
                  ? "Add Hockey Gear to Cart"
                  : "Out of Stock"}
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;