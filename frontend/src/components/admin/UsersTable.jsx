// frontend/src/components/admin/UsersTable.jsx
import { useState } from "react";
import API_BASE_URL from "../../config/api";
import * as adminApi from "../../services/adminApi";

const UsersTable = ({ users, loading, onRefresh }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    role: "user",
    password: "",
  });

  const [addForm, setAddForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      password: "",
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData = { ...editForm };

      if (!updateData.password) {
        delete updateData.password;
      }

      await adminApi.updateUser(editingUser._id, updateData);

      if (onRefresh) {
        await onRefresh();
      }

      setEditingUser(null);

      setEditForm({
        fullName: "",
        email: "",
        role: "user",
        password: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error updating user");
    } finally {
      setSaving(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (addForm.password !== addForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (addForm.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: addForm.fullName,
          email: addForm.email,
          password: addForm.password,
          confirmPassword: addForm.confirmPassword,
        }),
      });

      if (response.ok) {
        alert("Hockey user added successfully!");

        if (onRefresh) {
          await onRefresh();
        }

        setShowAddModal(false);

        setAddForm({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
      } else {
        const error = await response.json();
        alert(error.message || "Error adding user");
      }
    } catch (error) {
      alert(error.message || "Error adding user");
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this hockey user permanently?")) {
      return;
    }

    try {
      await adminApi.deleteUser(id);

      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-green-300 text-lg animate-pulse">
          Loading hockey users...
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 p-5 rounded-2xl border border-green-500/20 shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-green-300">
            🏑 Hockey Users Management
          </h1>
          <p className="text-green-200/70 text-sm mt-1">
            Manage hockey players, customers and admins
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl hover:scale-105 hover:shadow-green-500/30 hover:shadow-lg transition-all duration-300 font-semibold"
        >
          + Add Hockey User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-green-500/20 bg-gradient-to-b from-slate-900 to-green-950 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-green-900/40 border-b border-green-500/20">
            <tr>
              <th className="p-4 text-green-300">Player Name</th>
              <th className="p-4 text-green-300">Email</th>
              <th className="p-4 text-green-300">Role</th>
              <th className="p-4 text-green-300">Joined</th>
              <th className="p-4 text-green-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-green-500/10 hover:bg-green-900/10 transition duration-300"
              >
                <td className="p-4 text-white font-medium">
                  {user.fullName}
                </td>

                <td className="p-4 text-green-100/70">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20"
                        : "bg-green-500/20 text-green-300 border border-green-400/20"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4 text-green-100/60">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-emerald-300 hover:text-emerald-200 mr-4 font-semibold transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-400 hover:text-red-300 font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty */}
      {users.length === 0 && (
        <div className="text-center text-green-200/50 py-10">
          No hockey users found. Add a new one.
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-slate-900 to-green-950 border border-green-500/20 rounded-3xl p-7 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-green-300">
                ✏️ Edit Hockey User
              </h2>

              <button
                onClick={() => setEditingUser(null)}
                className="text-green-200 hover:text-white text-3xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={editForm.fullName}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    fullName: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                required
              />

              <input
                type="password"
                placeholder="New Password"
                value={editForm.password}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    password: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
              />

              <select
                value={editForm.role}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    role: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update Hockey User"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-slate-900 to-green-950 border border-green-500/20 rounded-3xl p-7 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-green-300">
                🏑 Add Hockey User
              </h2>

              <button
                onClick={() => setShowAddModal(false)}
                className="text-green-200 hover:text-white text-3xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={addForm.fullName}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    fullName: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={addForm.email}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    email: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={addForm.password}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    password: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={addForm.confirmPassword}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
                required
              />

              <select
                value={addForm.role}
                onChange={(e) =>
                  setAddForm({
                    ...addForm,
                    role: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Hockey User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;