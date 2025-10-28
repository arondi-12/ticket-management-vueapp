
<template>
  <div class="landing-page">
    <!-- Header/Navigation -->
    <header class="header">
      <div class="container">
        <div class="nav-content">
          <div class="logo">
            <span class="logo-icon">🎫</span>
            <span class="logo-text">TicketFlow</span>
          </div>
          <nav class="nav-menu">
            <RouterLink to="/login" class="btn btn-secondary">Login</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section with Wavy Background -->
    <section class="hero-section">
      <div class="wave-background">
        <svg class="wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#667eea"
            fill-opacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,144C672,139,768,149,864,154.7C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
        <svg class="wave wave-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#764ba2"
            fill-opacity="0.05"
            d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <!-- Decorative Circles -->
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Streamline Your Ticket Management</h1>
            <p class="hero-description">
              The all-in-one solution for tracking, managing, and resolving support tickets efficiently.
              Boost your team's productivity with powerful features and intuitive design.
            </p>
            <div class="hero-buttons">
              <RouterLink to="/register" class="btn btn-primary">Get Started</RouterLink>
              <RouterLink to="/login" class="btn btn-secondary">Login</RouterLink>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Active Users</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50K+</span>
                <span class="stat-label">Tickets Resolved</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">99.9%</span>
                <span class="stat-label">Uptime</span>
              </div>
            </div>
          </div>

          <div class="hero-image">
            <div class="hero-illustration">
              <div class="illustration-card card-1">
                <div class="card-header">
                  <div class="card-dot"></div>
                  <div class="card-dot"></div>
                  <div class="card-dot"></div>
                </div>
                <div class="card-content">
                  <div class="card-line"></div>
                  <div class="card-line short"></div>
                </div>
              </div>

              <div class="illustration-card card-2">
                <div class="card-icon">✓</div>
                <div class="card-text">Ticket Resolved</div>
              </div>

              <div class="illustration-card card-3">
                <div class="card-badge">New</div>
                <div class="card-mini-line"></div>
                <div class="card-mini-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Box Shapes -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Powerful Features for Modern Teams</h2>
          <p class="section-description">
            Everything you need to manage tickets effectively, all in one place
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-box" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">How It Works</h2>
          <p class="section-description">Get started in three simple steps</p>
        </div>

        <div class="steps-container">
          <div class="step-box" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ step.number }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Transform Your Workflow?</h2>
            <p class="cta-description">
              Join thousands of teams already using TicketFlow to manage their support tickets.
            </p>
            <RouterLink to="/register" class="btn btn-primary btn-large">Get Started Free</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <span class="logo-icon">🎫</span>
              <span class="logo-text">TicketFlow</span>
            </div>
            <p class="footer-description">
              The modern way to manage support tickets and streamline your team's workflow.
            </p>
          </div>

          <div class="footer-section" v-for="(section, idx) in footerSections" :key="idx">
            <h4 class="footer-heading">{{ section.heading }}</h4>
            <ul class="footer-links">
              <li v-for="(link, i) in section.links" :key="i">
                <a :href="link.href">{{ link.text }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">
            © 2025 TicketFlow. All rights reserved.
          </p>
          <div class="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span class="separator">•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const features = ref([
  { icon: '⚡', title: 'Lightning Fast', description: 'Create and update tickets instantly with our optimized interface. No lag, no waiting.' },
  { icon: '🔒', title: 'Secure & Reliable', description: 'Enterprise-grade security with end-to-end encryption. Your data is always protected.' },
  { icon: '📊', title: 'Analytics Dashboard', description: 'Get insights into your team\'s performance with comprehensive analytics and reporting.' },
  { icon: '🎯', title: 'Priority Management', description: 'Organize tickets by priority levels and ensure critical issues are handled first.' },
  { icon: '👥', title: 'Team Collaboration', description: 'Work together seamlessly with real-time updates and assignment features.' },
  { icon: '📱', title: 'Responsive Design', description: 'Access your tickets anywhere, anytime. Fully optimized for all devices.' },
])

const steps = ref([
  { number: '1', title: 'Create Account', description: 'Sign up in seconds and set up your workspace with customizable settings.' },
  { number: '2', title: 'Add Tickets', description: 'Create tickets with detailed descriptions, priorities, and assignments.' },
  { number: '3', title: 'Track & Resolve', description: 'Monitor progress, collaborate with your team, and resolve issues efficiently.' },
])

const footerSections = ref([
  { heading: 'Product', links: [{ text: 'Features', href: '#features' }, { text: 'Pricing', href: '#pricing' }, { text: 'Demo', href: '#demo' }] },
  { heading: 'Company', links: [{ text: 'About Us', href: '#about' }, { text: 'Careers', href: '#careers' }, { text: 'Contact', href: '#contact' }] },
  { heading: 'Resources', links: [{ text: 'Documentation', href: '#docs' }, { text: 'Support', href: '#support' }, { text: 'Blog', href: '#blog' }] },
])
</script>
