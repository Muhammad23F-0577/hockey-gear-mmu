// frontend/src/components/admin/ProductsTable.jsx

const ProductsTable = ({
  products,
  loading,
  onAdd,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-green-300 text-lg animate-pulse">
          Loading Hockey Products...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-400">
          🏑 Hockey Products Management
        </h1>

        <button
          onClick={onAdd}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2.5 rounded-xl hover:from-green-500 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-green-900/30"
        >
          + Add Hockey Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-green-500/20 bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 shadow-2xl shadow-green-900/20">
        <table className="w-full text-left">
          
          <thead className="bg-green-950/40 border-b border-green-500/20">
            <tr>
              <th className="p-4 text-green-300">Image</th>
              <th className="p-4 text-green-300">Name</th>
              <th className="p-4 text-green-300">Category</th>
              <th className="p-4 text-green-300">Brand</th>
              <th className="p-4 text-green-300">Price</th>
              <th className="p-4 text-green-300">Stock</th>
              <th className="p-4 text-green-300">Rating</th>
              <th className="p-4 text-green-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-green-500/10 hover:bg-green-900/10 transition duration-300"
              >
                <td className="p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-xl border border-green-500/20 shadow-md"
                  />
                </td>

                <td className="p-4 text-white font-medium max-w-xs truncate">
                  {product.name}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-500/20">
                    🏑 {product.category}
                  </span>
                </td>

                <td className="p-4 text-green-200/80">
                  {product.brand}
                </td>

                <td className="p-4 text-green-400 font-semibold">
                  ₨{" "}
                  {product.priceOptions?.[0]?.price?.toLocaleString()}
                </td>

                <td className="p-4 text-white">
                  {product.priceOptions?.[0]?.stock || 0}
                </td>

                <td className="p-4 text-yellow-300 font-medium">
                  {product.rating} ★
                </td>

                <td className="p-4">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-green-400 hover:text-green-300 mr-4 transition font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product._id)}
                    className="text-red-400 hover:text-red-300 transition font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center text-green-200/60 py-12 text-lg">
          No hockey products found. Click{" "}
          <span className="text-green-400 font-semibold">
            "Add Hockey Product"
          </span>{" "}
          to create one.
        </div>
      )}
    </div>
  );
};

export default ProductsTable;