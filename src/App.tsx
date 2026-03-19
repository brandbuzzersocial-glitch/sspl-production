 import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WhatsAppToggle from './components/WhatsAppToggle';
import Loader3D from './components/Loader3D';
import YarnJourney from './components/YarnJourney';
import { ArrowRight, Globe, ShieldCheck, Zap, Package } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader3D onComplete={() => setLoading(false)} />
      ) : (
        <main className="main-site">
          <Navbar />

          {/* Hero Section */}
          <section id="home" className="hero-section">
            <div className="container hero-content">
              <div className="hero-text-wrap">
                <h4 className="hero-subtitle text-yellow">Sustainable. Reliable. Global.</h4>
                <h1 className="hero-title">
                  RELIABLE YARN <span className="text-yellow">IMPORT & SUPPLY</span> ACROSS INDIA
                </h1>
                <p className="hero-desc">
                  Connecting India to the world's finest yarn manufacturers.
                  Experience premium quality, strategic sourcing, and unmatched supply chain efficiency.
                </p>
                <div className="hero-actions">
                  <a href="#products" className="btn-primary">View Products <ArrowRight size={20} /></a>
                  <a href="#contact" className="btn-outline">Contact Us</a>
                </div>
              </div>
            </div>
            <div className="hero-overlay"></div>
          </section>

          {/* Yarn Journey Section */}
          <YarnJourney />

          {/* Products Section */}
          <section id="products" className="products-section section-padding">
            <div className="container">
              <div className="section-header">
                <h4 className="text-yellow">Our Portfolio</h4>
                <h2>PREMIUM YARN SOLUTIONS</h2>
              </div>

              <div className="products-grid">
                {[
                  { name: "POY", desc: "Partially Oriented Yarn for diverse textile applications." },
                  { name: "FDY", desc: "Fully Drawn Yarn for high-tenacity and uniform color." },
                  { name: "DTY", desc: "Draw Textured Yarn with excellent softness and bulk." },
                  { name: "Fake Cotton", desc: "Innovative recycled fibers with cotton-like feel." },
                  { name: "Mother Yarn", desc: "High-quality base for specialized yarn products." }
                ].map((product, i) => (
                  <div key={i} className="product-card">
                    <div className="product-icon">
                      <Package size={40} className="text-yellow" />
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.desc}</p>
                    <a href="#contact" className="btn-link">Enquire Now <ArrowRight size={16} /></a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section id="about" className="about-section section-padding bg-dark">
            <div className="container about-grid">
              <div className="about-img">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Industrial Innovation" />
              </div>
              <div className="about-text">
                <h4 className="text-yellow">Our Legacy</h4>
                <h2>PRECISION & SUSTAINABILITY</h2>
                <p>
                  At Surat Sales Private Limited, we bridge the gap between global innovation and India's textile heartland.
                  Our strategic sourcing network ensures that our clients always have access to the highest quality recycled fibers.
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <h4>15+</h4>
                    <p>Years Experience</p>
                  </div>
                  <div className="stat-item">
                    <h4>500+</h4>
                    <p>Global Partners</p>
                  </div>
                  <div className="stat-item">
                    <h4>100%</h4>
                    <p>Quality Assured</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact-section section-padding">
            <div className="container contact-grid">
              <div className="contact-info">
                <h2>GET IN <span className="text-yellow">TOUCH</span></h2>
                <p>Ready to elevate your production with sustainable yarn? Contact our experts today.</p>
                <div className="contact-details">
                  <p><strong>Email:</strong> info@suratsales.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Office:</strong> Surat, Gujarat, India</p>
                </div>
              </div>
              <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email Address" required />
                <textarea placeholder="Tell us about your requirements" rows={5}></textarea>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer bg-dark">
            <div className="container footer-content">
              <div className="footer-logo">
                <h3>SURAT<span className="text-yellow">SALES</span></h3>
                <p>Leading the way in sustainable yarn import.</p>
              </div>
              <div className="footer-links">
                <a href="#home">Home</a>
                <a href="#products">Products</a>
                <a href="#journey">Journey</a>
                <a href="#about">About</a>
              </div>
              <div className="footer-social">
                <p>© 2026 Surat Sales Pvt. Ltd. All Rights Reserved.</p>
              </div>
            </div>
          </footer>

          <WhatsAppToggle />

          <style>{`
            .hero-section {
              height: 100vh;
              display: flex;
              align-items: center;
              position: relative;
              background: url('https://images.unsplash.com/photo-1558444479-c8a027920927?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
              overflow: hidden;
            }

            .hero-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.7) 50%, transparent 100%);
              z-index: 1;
            }

            .hero-content {
              position: relative;
              z-index: 2;
            }

            .hero-text-wrap {
              max-width: 800px;
            }

            .hero-subtitle {
              text-transform: uppercase;
              letter-spacing: 4px;
              font-size: 0.9rem;
              margin-bottom: 1rem;
              display: block;
            }

            .hero-title {
              font-size: clamp(2.5rem, 8vw, 4.5rem);
              margin-bottom: 2rem;
            }

            .hero-desc {
              font-size: 1.1rem;
              color: var(--color-text-dim);
              margin-bottom: 3rem;
              max-width: 600px;
            }

            .hero-actions {
              display: flex;
              gap: 1.5rem;
              flex-wrap: wrap;
            }

            /* Products Section Styles */
            .products-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              margin-top: 4rem;
            }

            .product-card {
              background: rgba(255, 255, 255, 0.02);
              border: 1px solid rgba(255, 255, 255, 0.05);
              padding: 3rem;
              border-radius: 8px;
              transition: var(--transition-smooth);
            }

            .product-card:hover {
              background: rgba(255, 215, 0, 0.05);
              border-color: var(--color-primary);
              transform: translateY(-10px);
            }

            .product-icon {
              margin-bottom: 2rem;
            }

            .product-card h3 {
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }

            .product-card p {
              color: var(--color-text-dim);
              margin-bottom: 2rem;
            }

            .btn-link {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              font-weight: 700;
              font-size: 0.8rem;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: var(--color-primary);
            }

            /* About Section */
            .about-grid {
              display: grid;
              grid-template-columns: 1fr 1.2fr;
              gap: 5rem;
              align-items: center;
            }

            .about-img img {
              width: 100%;
              border-radius: 8px;
              filter: grayscale(1) contrast(1.2);
            }

            .about-text p {
              margin-top: 2rem;
              font-size: 1.2rem;
              color: var(--color-text-dim);
            }

            .stats-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 2rem;
              margin-top: 4rem;
            }

            .stat-item h4 {
              font-size: 2.5rem;
              color: var(--color-primary);
            }

            .stat-item p {
              margin-top: 0.5rem;
              font-size: 0.9rem;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            /* Contact Section */
            .contact-grid {
              display: grid;
              grid-template-columns: 1fr 1.5fr;
              gap: 8rem;
            }

            .contact-info h2 {
              font-size: 3rem;
              margin-bottom: 2rem;
            }

            .contact-details {
              margin-top: 3rem;
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            .contact-form {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            }

            .contact-form input, .contact-form textarea {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              padding: 1.2rem;
              color: white;
              border-radius: 4px;
              font-family: inherit;
            }

            .contact-form input:focus, .contact-form textarea:focus {
              border-color: var(--color-primary);
              outline: none;
            }

            /* Footer */
            .footer {
              padding: 4rem 0;
              border-top: 1px solid rgba(255, 255, 255, 0.05);
            }

            .footer-content {
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              gap: 3rem;
            }

            .footer-links {
              display: flex;
              gap: 2rem;
            }

            .footer-links a {
              font-size: 0.9rem;
              opacity: 0.6;
            }

            .footer-links a:hover {
              opacity: 1;
              color: var(--color-primary);
            }

            @media (max-width: 992px) {
              .about-grid, .contact-grid {
                grid-template-columns: 1fr;
                gap: 4rem;
              }
            }
          `}</style>
        </main>
      )}
    </>
  );
}

export default App;
