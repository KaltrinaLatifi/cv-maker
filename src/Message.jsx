import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import UserMenu from "./UserMenu";



function Header() {
  const { user, loading } = useAuth();
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setOffset = () => {
      const h = el.offsetHeight || 0;
      document.documentElement.style.setProperty("--header-offset", `${h}px`);
    };

    setOffset();
    window.addEventListener("resize", setOffset);


    const ro = new ResizeObserver(setOffset);
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", setOffset);
      ro.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="header"
      className="header d-flex align-items-center"
    >
      <div
        className="container-fluid d-flex align-items-center justify-content-between px-4"
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "12px 16px" }}
      >
        {/* Logo (left) */}
        <div className="logo-container d-flex align-items-center" style={{ flex: 1 }}>
          <Link to="/" style={{ display: "inline-block" }}>
            <img
              src="/assets/img/2.png"
              alt="CV Maker Logo"
              className="logo-image"
            />
          </Link>
        </div>

        <div className="d-flex align-items-center" style={{ gap: 24 }}>
          <NavMenu />

          {!loading && (
            user ? (
              <UserMenu />
            ) : (
              <div className="butt-log-reg d-flex align-items-center" style={{ gap: 12 }}>
                <Link to="/login" className="btn-getstarted">Login</Link>
                <Link to="/register" className="btn-getstarted">Register</Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}

function NavMenu() {
  return (
    <nav id="navmenu" className="navmenu">
      <ul className="d-flex align-items-center" style={{ gap: 24, margin: 0, listStyle: "none" }}>
<li><Link to="/cvtemplates">Templates</Link></li>
<li><Link to="/#about">About Us</Link></li>
<li><Link to="/#contact">Contact</Link></li>
      </ul>
      <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
    </nav>
  );
}

export default Header;
