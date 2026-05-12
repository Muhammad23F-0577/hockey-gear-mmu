// frontend/src/pages/Checkout.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config/api";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  // Redirect if cart empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.zipCode}`;

    const orderData = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress,
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: getCartTotal(),
      status: "pending",
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/orders`,
        orderData
      );

      console.log(res.data);

      alert("Order placed successfully! Check your email for confirmation.");
      clearCart();
      navigate("/home");
    } catch (error) {
      console.error("Order error:", error.response?.data);
      alert(error.response?.data?.message || "Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950 to-black py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-green-400 mb-8">
          Hockey Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-900/70 border border-green-500/20 rounded-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-green-400 mb-4">
                Shipping Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-slate-800 px-4 py-3 rounded-lg border border-green-500/20 w-full"
                  required
                />

                <input
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-800 px-4 py-3 rounded-lg border border-green-500/20 w-full"
                  required
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-800 px-4 py-3 rounded-lg border border-green-500/20 w-full"
                  required
                />

                <input
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-slate-800 px-4 py-3 rounded-lg border border-green-500/20 w-full"
                  required
                />

                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-slate-800 px-4 py-3 rounded-lg border border-green-500/20 w-full"
                  required
                />

                <input
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="bg-slate-800 px-4 py-3 rounded-lg border border-green-500/20 w-full"
                  required
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold text-lg transition disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Hockey Order"}
              </button>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-slate-900/70 border border-green-500/20 rounded-xl p-6 h-fit sticky top-24">

            <h2 className="text-xl font-bold text-green-400 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">

              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-green-400">
                    ₨ {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

            </div>

            <div className="border-t border-green-500/20 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-green-400">
                ₨ {getCartTotal().toLocaleString()}
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;