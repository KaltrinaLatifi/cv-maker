import React from "react";

function FeaturedServices() {
  return (
    <section id="featured-services" className="featured-services section">
      <div className="container">
        <div className="row gy-4">

          <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="100">
            <div className="service-item position-relative">
              <div className="icon"><i className="bi bi-check-circle icon"></i></div>
              <h4>Easy to use</h4>
              <p>Fill out our simple form to generate your resume step-by-step</p>
            </div>
          </div>

          <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item position-relative">
              <div className="icon"><i className="bi bi-layout-text-sidebar-reverse icon"></i></div>
              <h4>Professional templates</h4>
              <p>Choose from a variety of experity designed CV layouts</p>
            </div>
          </div>

          <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="300">
            <div className="service-item position-relative">
              <div className="icon"><i className="bi bi-download icon"></i></div>
              <h4>Download in PDF</h4>
              <p>Instantly download a PDF of your resume once you're finished</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturedServices;
