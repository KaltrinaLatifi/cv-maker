import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUsers, updateUserRole } from "./api/users";

const ManageUsers = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");

  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        if (mounted) setUsers(data || []);
      } catch (err) {
        console.error("Failed to load users", err);
        if (mounted) setUsers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => (mounted = false);
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setSavingId(userId);
      await updateUserRole(userId, newRole);

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Failed to update role", err);
      alert("Failed to update role");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-title">Manage Users</h2>
        </div>

        {loading ? (
          <p className="text-muted mb-0">Loading users...</p>
        ) : (
          <div className="table-responsive">
            <table className="table admin-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th style={{ width: 140 }}>Role</th>
                  <th style={{ width: 230 }}>Created At</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="text-muted">{u.id}</td>
                    <td>{u.fullName || ""}</td>
                    <td className="text-muted">{u.email || ""}</td>
                    <td>
                      <select
                        className="form-select form-select-sm admin-select"
                        value={u.role || "user"}
                        disabled={savingId === u.id}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="text-muted">
                      {u.createdAt ? new Date(u.createdAt).toLocaleString() : ""}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
