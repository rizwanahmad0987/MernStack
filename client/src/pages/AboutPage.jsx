import React from 'react'

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About MERN Webstore</h1>
          <p className="about-subtitle">
            Your trusted destination for quality products and exceptional service
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-description">
                At MERN Webstore, we're committed to providing our customers with the highest quality products 
                at competitive prices. We believe that shopping should be convenient, enjoyable, and accessible 
                to everyone, which is why we've built a platform that combines cutting-edge technology with 
                exceptional customer service.
              </p>
              <p className="mission-description">
                Our mission is to revolutionize the online shopping experience by offering a seamless, 
                user-friendly platform that connects customers with the products they love, while maintaining 
                the highest standards of quality and reliability.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-card">
                <div className="mission-icon">🎯</div>
                <h3>Quality First</h3>
                <p>Every product is carefully selected and tested</p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">🚀</div>
                <h3>Innovation</h3>
                <p>Cutting-edge technology for better shopping</p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">❤️</div>
                <h3>Customer Care</h3>
                <p>Dedicated support for every customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Our Story</h2>
              <div className="story-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2020</div>
                  <div className="timeline-content">
                    <h3>Founded</h3>
                    <p>Started as a small team with a big vision to revolutionize online shopping</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2021</div>
                  <div className="timeline-content">
                    <h3>First 1000 Customers</h3>
                    <p>Reached our first milestone with amazing customer feedback</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2022</div>
                  <div className="timeline-content">
                    <h3>Platform Expansion</h3>
                    <p>Launched our full-stack MERN application with advanced features</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2023</div>
                  <div className="timeline-content">
                    <h3>Global Reach</h3>
                    <p>Expanded to serve customers worldwide with fast shipping</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">2024</div>
                  <div className="timeline-content">
                    <h3>Innovation Continues</h3>
                    <p>Constantly improving and adding new features for better user experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title text-center">Meet Our Team</h2>
          <p className="section-subtitle text-center">
            The passionate people behind MERN Webstore
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">JS</div>
              </div>
              <h3 className="member-name">John Smith</h3>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">
                Visionary leader with 10+ years in e-commerce and technology
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">MJ</div>
              </div>
              <h3 className="member-name">Maria Johnson</h3>
              <p className="member-role">CTO</p>
              <p className="member-bio">
                Full-stack developer passionate about creating amazing user experiences
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">DW</div>
              </div>
              <h3 className="member-name">David Wilson</h3>
              <p className="member-role">Head of Design</p>
              <p className="member-bio">
                Creative designer focused on intuitive and beautiful interfaces
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">SB</div>
              </div>
              <h3 className="member-name">Sarah Brown</h3>
              <p className="member-role">Customer Success</p>
              <p className="member-bio">
                Dedicated to ensuring every customer has an exceptional experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title text-center">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Trust & Security</h3>
              <p>Your data and transactions are protected with industry-leading security measures</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed & Efficiency</h3>
              <p>Fast loading times and quick delivery to get your products to you faster</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>Committed to eco-friendly practices and sustainable business operations</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Transparency</h3>
              <p>Open communication and honest business practices in everything we do</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Products Sold</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}








