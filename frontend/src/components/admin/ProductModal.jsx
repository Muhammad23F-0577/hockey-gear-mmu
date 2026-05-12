// frontend/src/components/admin/ProductModal.jsx
import { useState } from "react";

const ProductModal = ({ product, onSave, onClose, loading }) => {
  const isEditing = !!product;

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "sticks",
    brand: product?.brand || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    rating: product?.rating || 4,
    priceOptions: product?.priceOptions || [
      { type: "Standard", price: 0, stock: 0 },
    ],
  });

  // Hockey Categories
  const categories = ["sticks", "balls", "kits"];

  const addPriceOption = () => {
    setForm({
      ...form,
      priceOptions: [...form.priceOptions, { type: "", price: 0, stock: 0 }],
    });
  };

  const updatePriceOption = (index, field, value) => {
    const newOptions = [...form.priceOptions];
    newOptions[index][field] = value;
    setForm({ ...form, priceOptions: newOptions });
  };

  const removePriceOption = (index) => {
    const newOptions = form.priceOptions.filter((_, i) => i !== index);
    setForm({ ...form, priceOptions: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 border border-green-500/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-green-900/30">
        
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-green-400">
            {isEditing
              ? "🏑 Edit Hockey Product"
              : "🏑 Add New Hockey Product"}
          </h2>

          <button
            onClick={onClose}
            className="text-green-300 hover:text-white text-3xl transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Hockey Product Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="bg-slate-900/80 text-white px-4 py-3 rounded-xl border border-green-500/20 focus:outline-none focus:border-green-400"
              required
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="bg-slate-900/80 text-white px-4 py-3 rounded-xl border border-green-500/20 focus:outline-none focus:border-green-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Hockey Brand"
              value={form.brand}
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
              className="bg-slate-900/80 text-white px-4 py-3 rounded-xl border border-green-500/20 focus:outline-none focus:border-green-400"
              required
            />

            <input
              type="number"
              placeholder="Rating (0-5)"
              value={form.rating}
              onChange={(e) =>
                setForm({
                  ...form,
                  rating: parseFloat(e.target.value),
                })
              }
              className="bg-slate-900/80 text-white px-4 py-3 rounded-xl border border-green-500/20 focus:outline-none focus:border-green-400"
              step="0.1"
              min="0"
              max="5"
            />
          </div>

          <textarea
            placeholder="Hockey Product Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="bg-slate-900/80 text-white px-4 py-3 rounded-xl border border-green-500/20 focus:outline-none focus:border-green-400 w-full"
            rows="3"
            required
          />

          <input
            type="url"
            placeholder="Product Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
            className="bg-slate-900/80 text-white px-4 py-3 rounded-xl border border-green-500/20 focus:outline-none focus:border-green-400 w-full"
            required
          />

          <div>
            <label className="text-green-300 block mb-3 font-medium">
              🏑 Hockey Price Options
            </label>

            {form.priceOptions.map((opt, idx) => (
              <div
                key={idx}
                className="flex gap-2 mb-3 items-center"
              >
                <input
                  type="text"
                  placeholder="Type"
                  value={opt.type}
                  onChange={(e) =>
                    updatePriceOption(
                      idx,
                      "type",
                      e.target.value
                    )
                  }
                  className="bg-slate-900/80 text-white px-3 py-2 rounded-xl border border-green-500/20 flex-1 focus:outline-none focus:border-green-400"
                  required
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={opt.price}
                  onChange={(e) =>
                    updatePriceOption(
                      idx,
                      "price",
                      parseFloat(e.target.value)
                    )
                  }
                  className="bg-slate-900/80 text-white px-3 py-2 rounded-xl border border-green-500/20 w-32 focus:outline-none focus:border-green-400"
                  required
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={opt.stock}
                  onChange={(e) =>
                    updatePriceOption(
                      idx,
                      "stock",
                      parseInt(e.target.value)
                    )
                  }
                  className="bg-slate-900/80 text-white px-3 py-2 rounded-xl border border-green-500/20 w-28 focus:outline-none focus:border-green-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => removePriceOption(idx)}
                  className="text-red-400 hover:text-red-300 text-xl px-2 transition"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addPriceOption}
              className="text-green-400 hover:text-green-300 text-sm mt-2 transition"
            >
              + Add Hockey Price Option
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl hover:scale-[1.01] hover:from-green-500 hover:to-emerald-400 transition-all duration-300 font-semibold shadow-lg shadow-green-900/30"
          >
            {loading
              ? "Saving Hockey Product..."
              : isEditing
              ? "Update Hockey Product"
              : "Add Hockey Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;