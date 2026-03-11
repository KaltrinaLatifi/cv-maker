// src/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer id="footer" className="footer">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="d-flex align-items-center">
                <span className="sitename"> CV Maker</span>
              </Link>
              <div className="footer-contact pt-3">
                <p>A108 Antigona Fazliu</p>
                <p>Pristine, 10000</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+383 49 554 855</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>cvmaker@gmail.com</span>
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#about">About us</Link></li>
                <li><Link to="/#services">Services</Link></li>
                <li><Link to="/#terms">Terms of service</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><Link to="/#web-design">Web Design</Link></li>
                <li><Link to="/#web-dev">Web Development</Link></li>
                <li><Link to="/#product">Product Management</Link></li>
                <li><Link to="/#marketing">Marketing</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12">
              <h4>Follow Us</h4>
              <p>
                Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies
              </p>
              <div className="social-links d-flex">
                
                <a href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-facebook" /></a>
                <a href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-instagram" /></a>
                <a href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-linkedin" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">cvMaker</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            Designed by{" "}
            <a href="https://bootstrapmade.com/" target="_blank" rel="noreferrer">
              BootstrapMade
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
