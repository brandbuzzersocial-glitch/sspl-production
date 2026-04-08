import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import WhatsAppToggle from './components/WhatsAppToggle';
import { ArrowRight, Globe, ShieldCheck, Zap, Package } from 'lucide-react';
import './App.css';

const Loader3D = lazy(() => import('./components/Loader3D'));
const YarnJourney = lazy(() => import('./components/YarnJourney'));

const PRODUCTS_DATA = [
  { name: "POY", desc: "Partially Oriented Yarn for diverse textile applications." },
  { name: "FDY", desc: "Fully Drawn Yarn for high-tenacity and uniform color." },
  { name: "DTY", desc: "Draw Textured Yarn with excellent softness and bulk." },
  { name: "Fake Cotton", desc: "Innovative recycled fibers with cotton-like feel." },
  { name: "Mother Yarn", desc: "High-quality base for specialized yarn products." }
];

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Suspense fallback={<div style={{ height: '100vh', width: '100vw', background: '#050505' }} />}>
          <Loader3D onComplete={() => setLoading(false)} />
        </Suspense>
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
          <Suspense fallback={<div style={{ height: '400px', background: 'transparent' }} />}>
            <YarnJourney />
          </Suspense>

          {/* Products Section */}
          <section id="products" className="products-section section-padding">
            <div className="container">
              <div className="section-header">
                <h4 className="text-yellow">Our Portfolio</h4>
                <h2>PREMIUM YARN SOLUTIONS</h2>
              </div>

              <div className="products-grid">
                {PRODUCTS_DATA.map((product, i) => (
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

          {/* About Section */}
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
        </main>
      )}
    </>
  );
}

export default App;
