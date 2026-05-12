import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as adminApi from "../services/adminApi";
import { useAdminData } from "../hooks/useAdminData";

import AdminSidebar from "../components/admin/AdminSidebar";
import ProductsTable from "../components/admin/ProductsTable";
import UsersTable from "../components/admin/UsersTable";
import OrdersTable from "../components/admin/OrdersTable";
import ProductModal from "../components/admin/ProductModal";
import ConfirmModal from "../components/admin/ConfirmModal";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("products");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const { products, users, orders, loading, refreshAll } = useAdminData();

  // 🏑 Admin Guard (fixed properly)
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);

      if (user.role !== "admin") {
        navigate("/home");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  // Show loader
  if (
    loading.products &&
    loading.users &&
    loading.orders &&
    !products.length &&
    !users.length
  ) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Hockey Dashboard...
      </div>
    );
  }

  // 🟢 Save Hockey Product
  const handleSaveProduct = async (formData) => {
    setModalLoading(true);

    try {
      if (editingProduct) {
        await adminApi.updateProduct(editingProduct._id, formData);
      } else {
        await adminApi.addProduct(formData);
      }

      await refreshAll();
      setShowProductModal(false);
      setEditingProduct(null);
    } finally {
      setModalLoading(false);
    }
  };

  // 🗑 Delete Hockey Product
  const handleDeleteProduct = async () => {
    if (!deleteTarget) return;

    setModalLoading(true);

    try {
      await adminApi.deleteProduct(deleteTarget);
      await refreshAll();
    } finally {
      setModalLoading(false);
      setShowConfirmModal(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productsCount={products.length}
        usersCount={users.length}
        ordersCount={orders.length}
      />

      <div className="ml-64 flex-1 p-8">

        {activeTab === "products" && (
          <ProductsTable
            products={products}
            loading={loading.products}
            onAdd={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            onEdit={(p) => {
              setEditingProduct(p);
              setShowProductModal(true);
            }}
            onDelete={(id) => {
              setDeleteTarget(id);
              setShowConfirmModal(true);
            }}
          />
        )}

        {activeTab === "users" && (
          <UsersTable users={users} loading={loading.users} onRefresh={refreshAll} />
        )}

        {activeTab === "orders" && (
          <OrdersTable orders={orders} loading={loading.orders} onRefresh={refreshAll} />
        )}
      </div>

      {/* 🟢 Hockey Product Modal */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowProductModal(false)}
          loading={modalLoading}
        />
      )}

      {/* 🟢 Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete Hockey Product"
        message="This hockey gear will be permanently removed."
        onConfirm={handleDeleteProduct}
        onCancel={() => setShowConfirmModal(false)}
        loading={modalLoading}
      />
    </div>
  );
};

export default AdminDashboard;