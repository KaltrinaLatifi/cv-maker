
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

function ServicesSection() {
  return (
    <section id="services" className="services section light-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <span>Templates</span>
        <h2>Templates</h2>
        <p>Styles of CVs We Offer</p>
      </div>

   
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className="template-card">
              <h4>Modern Template</h4>
              <p>Clean and professional layout for modern resumes.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="template-card">
              <h4>Classic Template</h4>
              <p>Timeless design that works across all kind of industries.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="template-card">
              <h4>Creative Template</h4>
              <p>Visually engaging layout for artistic and creative professions.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="template-card">
              <h4>Minimalist Template</h4>
              <p>Sleek, simple design focused on clarity and content.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="template-card">
              <h4>Professional Template</h4>
              <p>Balanced and formal layout suitable for any industry.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default ServicesSection;
