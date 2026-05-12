// frontend/src/components/admin/OrdersTable.jsx
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

const OrdersTable = ({ orders, onOrderUpdate }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const API = `${API_BASE_URL}/api`;

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`${API}/orders/${id}`, { status });
      if (onOrderUpdate) await onOrderUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">
          🏑 Hockey Orders Management
        </h1>

        <p className="text-gray-600">
          Total Hockey Orders: {orders.length}
        </p>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No hockey orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-gray-700">Order ID</th>
                <th className="p-3 text-gray-700">Customer</th>
                <th className="p-3 text-gray-700">Email</th>
                <th className="p-3 text-gray-700">Items</th>
                <th className="p-3 text-gray-700">Total</th>
                <th className="p-3 text-gray-700">Status</th>
                <th className="p-3 text-gray-700">Date</th>
                <th className="p-3 text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-black font-mono text-sm">
                    {order._id.slice(-8).toUpperCase()}
                  </td>

                  <td className="p-3 text-black">
                    {order.customerName}
                  </td>

                  <td className="p-3 text-gray-600">
                    {order.customerEmail}
                  </td>

                  <td className="p-3 text-gray-600">
                    {order.items?.length || 0} hockey items
                  </td>

                  <td className="p-3 text-black font-semibold">
                    ₨ {order.totalAmount?.toLocaleString()}
                  </td>

                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-md text-xs border bg-white ${getStatusColor(
                        order.status
                      )} focus:outline-none`}
                    >
                      <option value="pending">🏑 Pending</option>
                      <option value="shipped">🚚 Shipped</option>
                      <option value="delivered">✅ Delivered</option>
                    </select>
                  </td>

                  <td className="p-3 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-black hover:underline transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white border rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">
                🏑 Hockey Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-black text-2xl transition"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border rounded-lg">
                <div>
                  <p className="text-gray-500 text-sm">Order ID</p>
                  <p className="text-black font-mono">
                    {selectedOrder._id}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Date</p>
                  <p className="text-black">
                    {new Date(
                      selectedOrder.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Customer</p>
                  <p className="text-black">
                    {selectedOrder.customerName}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-black">
                    {selectedOrder.customerEmail}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Hockey Items
                </h3>

                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg"
                    >
                      <div>
                        <p className="text-black font-medium">
                          {item.name}
                        </p>

                        <p className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-black font-semibold">
                        ₨ {item.price?.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-600">
                  Total Amount:
                </span>

                <span className="text-2xl font-bold text-black">
                  ₨ {selectedOrder.totalAmount?.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600">Status:</span>

                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    updateOrderStatus(
                      selectedOrder._id,
                      e.target.value
                    );

                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value,
                    });
                  }}
                  className={`px-3 py-1 rounded-md border bg-white ${getStatusColor(
                    selectedOrder.status
                  )} focus:outline-none`}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;