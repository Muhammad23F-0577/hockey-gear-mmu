import { useState, useEffect, useCallback } from "react";
import * as adminApi from "../services/adminApi";

export const useAdminData = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState({
    products: true,
    users: true,
    orders: true,
  });

  const [error, setError] = useState({
    products: null,
    users: null,
    orders: null,
  });

  // 🏑 Load Hockey Products
  const loadProducts = useCallback(async () => {
    try {
      setLoading((p) => ({ ...p, products: true }));

      const res = await adminApi.fetchProducts();
      setProducts(res.data.products || []);

      setError((p) => ({ ...p, products: null }));
    } catch (err) {
      setError((p) => ({
        ...p,
        products: err.response?.data?.message || err.message,
      }));
      setProducts([]);
    } finally {
      setLoading((p) => ({ ...p, products: false }));
    }
  }, []);

  // 🏑 Load Players (Users)
  const loadUsers = useCallback(async () => {
    try {
      setLoading((p) => ({ ...p, users: true }));

      const res = await adminApi.fetchUsers();
      setUsers(res.data.users || []);

      setError((p) => ({ ...p, users: null }));
    } catch (err) {
      setError((p) => ({
        ...p,
        users: err.response?.data?.message || err.message,
      }));
      setUsers([]);
    } finally {
      setLoading((p) => ({ ...p, users: false }));
    }
  }, []);

  // 🏑 Load Matches (Orders)
  const loadOrders = useCallback(async () => {
    try {
      setLoading((p) => ({ ...p, orders: true }));

      const res = await adminApi.fetchOrders();
      setOrders(res.data.orders || []);

      setError((p) => ({ ...p, orders: null }));
    } catch (err) {
      setError((p) => ({
        ...p,
        orders: err.response?.data?.message || err.message,
      }));
      setOrders([]);
    } finally {
      setLoading((p) => ({ ...p, orders: false }));
    }
  }, []);

  // 🔄 Refresh All Data
  const refreshAll = useCallback(() => {
    loadProducts();
    loadUsers();
    loadOrders();
  }, [loadProducts, loadUsers, loadOrders]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    products,
    users,
    orders,
    loading,
    error,
    refreshAll,
    loadProducts,
    loadUsers,
    loadOrders,
  };
};