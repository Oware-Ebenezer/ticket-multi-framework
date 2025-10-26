<template>
  <main class="landing-main">
    <Navbar />
    <section class="hero-section">
      <div class="hero-circle hero-circle-right"></div>
      <div class="hero-circle hero-circle-left"></div>
      <div class="hero-content">
        <h1 class="hero-title">OKICKET</h1>
        <h2 class="hero-subtitle">
          Simplify Your <span class="hero-highlight">Ticket Management</span>
        </h2>
        <p class="hero-description">
          Manage, track, and resolve tickets differently with a sleek and
          secure web app.
        </p>

        <section class="hero-buttons">
          <a href="/auth/signup" class="btn btn-primary">Get Started</a>
          <a href="/auth/login" class="btn btn-secondary">Login</a>
        </section>
      </div>
      <img
        :src="heroWave"
        alt="Wavy background"
        class="hero-wave"
      />
    </section>

    <section class="features-section">
      <section
        v-for="(item, index) in weOffer"
        :key="index"
        class="feature-card"
      >
        <h3 class="feature-title">{{ item.title }}</h3>
        <p class="feature-description">{{ item.description }}</p>
      </section>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import Footer from "../components/AppFooter.vue";
import Navbar from "../components/Nav-bar.vue";
// import heroWave from "/assets/wavy.svg";

const weOffer = [
  {
    title: "Create Tickets",
    description:
      "Easily create and submit tickets for any issues or requests.",
  },
  {
    title: "Track Progress",
    description:
      "Monitor open, in-progress, and resolved tickets in real-time.",
  },
  {
    title: "Stay notified",
    description: "Receive updates on ticket status changes.",
  },
];
</script>

<style scoped>
.landing-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
}

.hero-section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 7.5rem 1.5rem;
  background-color: white;
  overflow: hidden;
}

.hero-circle {
  position: absolute;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  opacity: 0.2;
}

.hero-circle-right {
  top: 2.5rem;
  right: 5rem;
  background-color: #b45309;
}

.hero-circle-left {
  top: 12.5rem;
  left: 12.5rem;
  background-color: #1d4ed8;
}

.hero-content {
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 900;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.hero-highlight {
  color: #b45309;
}

.hero-description {
  color: #1f2937;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #1e40af;
  color: white;
}

.btn-primary:hover {
  background-color: #1e3a8a;
}

.btn-secondary {
  background-color: #d97706;
  color: white;
}

.btn-secondary:hover {
  background-color: #b45309;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.features-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: grid;
  gap: 1rem;
}

.feature-card {
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: box-shadow 0.3s;
}

.feature-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f59e0b;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: #4b5563;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem;
  }

  .hero-subtitle {
    font-size: 2.25rem;
  }

  .features-section {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>