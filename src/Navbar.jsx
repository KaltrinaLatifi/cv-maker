import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // <-- shto

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // <-- merr logout-in e context-it

  const handleLogout = () => {
    logout(); // ✅ kjo e fshin jwt + user + edhe admin keys (siç e ke në AuthContext)
    navigate("/", { replace: true }); // ✅ direkt homepage (foto 4)
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 admin-navbar">
      <button
        className="btn btn-outline-light d-lg-none me-2"
        onClick={onToggleSidebar}
      >
        ☰
      </button>

      <span className="navbar-brand mb-0">CV Maker - Admin</span>

      <div className="ms-auto">
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
