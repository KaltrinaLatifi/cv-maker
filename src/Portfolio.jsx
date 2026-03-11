import React from 'react';

function Portfolio (){
  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <span>Portfolio</span>
        <h2>Portfolio</h2>
        <p>prov</p>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

          <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            <li data-filter="*" className="filter-active">All</li>
            <li data-filter=".filter-app">App</li>
            <li data-filter=".filter-product">Product</li>
            <li data-filter=".filter-branding">Branding</li>
            <li data-filter=".filter-books">Books</li>
          </ul>
          {/* End Portfolio Filters */}

          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

            {/* Portfolio Item 1 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <img src="assets/img/portfolio/app-1.jpg" className="img-fluid" alt="" />
              <div className="portfolio-info">
                <h4>App 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/app-1.jpg" title="App 1" data-gallery="portfolio-gallery-app" className="glightbox preview-link">
                  <i className="bi bi-zoom-in"></i>
                </a>
                <a href="portfolio-details.html" title="More Details" className="details-link">
                  <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
            {/* End Portfolio Item */}

            {/* Portfolio Item 2 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <img src="assets/img/portfolio/product-1.jpg" className="img-fluid" alt="" />
              <div className="portfolio-info">
                <h4>Product 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/product-1.jpg" title="Product 1" data-gallery="portfolio-gallery-product" className="glightbox preview-link">
                  <i className="bi bi-zoom-in"></i>
                </a>
                <a href="portfolio-details.html" title="More Details" className="details-link">
                  <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
            {/* End Portfolio Item */}

            {/* Portfolio Item 3 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <img src="assets/img/portfolio/branding-1.jpg" className="img-fluid" alt="" />
              <div className="portfolio-info">
                <h4>Branding 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/branding-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-branding" className="glightbox preview-link">
                  <i className="bi bi-zoom-in"></i>
                </a>
                <a href="portfolio-details.html" title="More Details" className="details-link">
                  <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
            {/* End Portfolio Item */}

            {/* Portfolio Item 4 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <img src="assets/img/portfolio/books-1.jpg" className="img-fluid" alt="" />
              <div className="portfolio-info">
                <h4>Books 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/books-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-book" className="glightbox preview-link">
                  <i className="bi bi-zoom-in"></i>
                </a>
                <a href="portfolio-details.html" title="More Details" className="details-link">
                  <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
            {/* End Portfolio Item */}

            {/* Additional portfolio items (app, product, branding, books) follow the same structure as the above items */}

          </div>
          {/* End Portfolio Container */}

        </div>
      </div>
    </section>
  );
}

export default Portfolio;
