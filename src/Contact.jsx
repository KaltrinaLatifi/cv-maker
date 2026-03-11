import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", text: "" });
const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setStatus({ type: "", text: "" });

  try {
    const res = await axios.post("http://localhost:4000/api/contact", formData);

    setStatus({ type: "success", text: res.data?.message || "Message sent!" });
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (err) {
    setStatus({ type: "error", text: "Error sending message" });
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (!status.type) return;
  const t = setTimeout(() => setStatus({ type: "", text: "" }), 3000);
  return () => clearTimeout(t);
}, [status.type]);

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <span>Contact Us</span>
        <h2>Contact Us</h2>
        <p>Do you have any questions or need help?<br />
        Fill out the form below and our team will get back to you as soon as possible.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>Antigona Fazliu, Pristine, 10000</p>
                </div>
              </div>
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+383 49 554 855</p>
                </div>
              </div>
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>cvmaker@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name-field"
                    className="form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email-field" className="pb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email-field"
                    className="form-control"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="subject-field" className="pb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject-field"
                    className="form-control"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="message-field" className="pb-2">Message</label>
                  <textarea
                    name="message"
                    id="message-field"
                    className="form-control"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="col-md-12 text-center">
                  {isLoading && <div className="loading">Loading</div>}

{status.type && (
  <div className={`toast ${status.type === "success" ? "toast-success" : "toast-error"}`}>
    <span className="toast-icon">
      {status.type === "success" ? "✓" : "!"}
    </span>
    <span>{status.text}</span>
  </div>
)}


<button type="submit" disabled={isLoading}>
  {isLoading ? "Sending..." : "Send Message"}
</button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
