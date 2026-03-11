import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* OVERLAY (mobile only) */}
      {open && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <nav className="sb-sidenav sb-sidenav-dark">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>

              <NavLink to="/Dashboard" className="nav-link" end>
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </NavLink>

              <div className="sb-sidenav-menu-heading">Admin Tools</div>

              <NavLink to="/managetemplates" className="nav-link">
                <i className="fas fa-columns me-2"></i>
                Manage Templates
              </NavLink>

              <NavLink to="/manageusers" className="nav-link">
                <i className="fas fa-users me-2"></i>
                Manage Users
              </NavLink>

              <NavLink to="/manageCv" className="nav-link">
                <i className="fas fa-columns me-2"></i>
                Manage CV
              </NavLink>

              <NavLink to="/dashboard/messages" className="nav-link">
                <i className="fas fa-envelope me-2"></i>
                Messages
              </NavLink>
            </div>
          </div>

          <div className="sb-sidenav-footer">
            Logged in as:<br />Admin
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
