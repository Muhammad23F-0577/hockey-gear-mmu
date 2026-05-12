// frontend/src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
} from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    setFormData({
      fullName: parsedUser.fullName || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
    });

    setLoading(false);
    fetchUserOrders(parsedUser.email);
  }, [navigate]);

  const fetchUserOrders = async (email) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/orders?email=${email}`
      );
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setEditing(false);
        alert("Hockey profile updated successfully!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-green-500/20 text-green-400",
      shipped: "bg-emerald-500/20 text-emerald-400",
      delivered: "bg-lime-500/20 text-lime-400",
    };
    return styles[status] || "bg-gray-500/20 text-gray-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-green-400 text-xl">Loading hockey profile...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          My Hockey Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {/* PROFILE CARD */}
          <div className="md:col-span-1">
            <div className="bg-slate-900 rounded-xl border border-green-500/20 p-6 text-center sticky top-24">

              <div className="w-32 h-32 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-5xl text-green-400">🏒</span>
              </div>

              <h2 className="text-xl font-bold text-white">
                {user.fullName}
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                {user.email}
              </p>

              <p className="text-gray-500 text-xs mt-2">
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4 pt-4 border-t border-green-500/10">
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-white">Role:</span>{" "}
                  <span
                    className={
                      user.role === "admin"
                        ? "text-green-400"
                        : "text-emerald-400"
                    }
                  >
                    {user.role === "admin"
                      ? "Hockey Admin"
                      : "Hockey Player"}
                  </span>
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="md:col-span-2 space-y-8">

            {/* PROFILE INFO */}
            <div className="bg-slate-900 rounded-xl border border-green-500/20 p-6">

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold text-white">
                  Hockey Profile Information
                </h2>

                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300"
                  >
                    <FiEdit2 size={16} /> Edit
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                  >
                    <FiX size={16} /> Cancel
                  </button>
                )}

              </div>

              {/* VIEW MODE */}
              {!editing ? (
                <div className="space-y-3">

                  <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                    <FiUser className="text-green-400" />
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-white">{user.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                    <FiMail className="text-green-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-white">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                    <FiPhone className="text-green-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-white">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                    <FiCalendar className="text-green-400" />
                    <div>
                      <p className="text-xs text-gray-500">Joined</p>
                      <p className="text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                /* EDIT MODE */
                <form onSubmit={handleUpdateProfile} className="space-y-4">

                  <input
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-green-500/20"
                    placeholder="Full Name"
                  />

                  <input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-green-500/20"
                    placeholder="Email"
                  />

                  <input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-green-500/20"
                    placeholder="Phone"
                  />

                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                    <FiSave size={16} /> Save Hockey Profile
                  </button>

                </form>
              )}
            </div>

            {/* ORDERS */}
            <div className="bg-slate-900 rounded-xl border border-green-500/20 p-6">

              <h2 className="text-xl font-bold text-white mb-4">
                Hockey Orders History
              </h2>

              {ordersLoading ? (
                <div className="text-gray-400">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No hockey orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">

                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border border-green-500/10 rounded-lg p-4"
                    >

                      <div className="flex justify-between mb-3">

                        <p className="text-white font-mono">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>

                        <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>

                      </div>

                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-300">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-white">
                            ₨ {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;