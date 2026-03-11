import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="about section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <span>About Us<br /></span>
        <h2>About Us</h2>
        <h4>A simple tool for a big career step</h4>
      </div>
      {/* End Section Title */} 

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/img/aboutus.png" className="img-fluid"  alt="" />
            
          </div>
          <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
            <h3 >Why choose us for your CV?</h3>
            <p className="fst-italic">
              We understand how important it is to present yourself at your best when applying for jobs or internships.
              That's why we've created a user-friendly platform with modern designs and functionalities that guide you step by step. <br />
              With just a few clicks, you can:
                <ul>
              <li><i className="bi bi-check2-all"></i> <span>Fill in your professional information</span></li>
              <li><i className="bi bi-check2-all"></i> <span>Choose from several beautiful templates</span></li>
              <li><i className="bi bi-check2-all"></i> <span>Download your CV in PDF format</span></li>
            </ul>
                Created with love by a team that knows how challenging starting a career can be.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
