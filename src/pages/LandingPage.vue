<template>
  <div class="container">
    <img src="@/assets/landing_bg.png" alt="" class="bg" />
    <div class="section home" id="home">
      <div class="nav">
        <img src="@/assets/logo.png" alt="" class="nav-item logo" />
        <div class="nav-item"><a href="#our-cause">Our Cause</a></div>
        <div class="nav-item"><a href="#about-us">About Us</a></div>
        <div class="nav-item login" @click="showModal = true">Login</div>
      </div>
      <main>
        <div class="title">Sustainable <span class="future">Future</span></div>
        <div class="subheading">
          SuplAI helps you optimize your food supply, reduce waste, and save costs with smart
          tracking and real-time insights. Make every ingredient count—start managing smarter today
        </div>
        <h2 class="hook">
          Help us help you optimize your supply now - <a href="#" class="hook">Contact Us!</a>
        </h2>
      </main>
    </div>
    <div class="section key-features" id="key-features">
      <div class="features-container">
        <h2 class="section-title">Key Features</h2>
        <div class="feature-cards">
          <FeatureCard
            label="Run"
            text="SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today."
          />

          <FeatureCard
            label="Run"
            text="SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today."
          />

          <FeatureCard
            label="Run"
            text="SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today."
          />
        </div>
      </div>
    </div>
    <div class="section our-cause" id="our-cause">
      <div class="features-container">
        <h2 class="section-title">Our Cause</h2>
        <div class="our-cause">
          <p>OUR CAUSE TEXT HERE</p>
        </div>
      </div>
    </div>
    <div class="section about-us" id="about-us">
      <div class="features-container">
        <h2 class="section-title">About Us</h2>
        <div class="feature-cards">
          <p class="feature-text">
            SuplAI helps you optimize your food supply, reduce waste, and save costs with smart
            tracking and real-time insights. Make every ingredient count—start managing smarter
            today
          </p>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <LogInModal @closeModal="showModal = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LogInModal from '@/modals/LogInModal.vue'
import FeatureCard from '@/components/FeatureCardComponent.vue'

const showModal = ref(false)
</script>

<style scoped>
html {
  max-width: 100%;
  scrollbar-gutter: stable both-edges;
}

body {
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: #126d2a;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  background-color: #354833;
  background-size: cover;
  scroll-snap-type: y mandatory; /* Enable scroll snapping */
  overflow-y: scroll; /* Enable vertical scrolling */
  scrollbar-width: none;
  position: relative;
  left: calc((100vw - 100%) / 2);
}

.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.nav {
  display: flex;
  width: 100%;
  height: 10vh;
  min-height: 50px;
  align-items: center;
  margin: 0; /* Ensure no margin on the nav */
  padding: 0; /* Ensure no padding on the nav */
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.nav-item {
  display: flex;
  margin-left: 10px;
  color: black;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  font-weight: bold;
  cursor: pointer;
}

.logo {
  width: auto;
  height: 80px;
  margin: 2px;
}

.login {
  margin-left: auto;
  /* margin-right: 10px; */
  color: white;
  font-weight: bold;
  background-color: #126d2a;
  border: none;
  border-radius: 20px;
  padding: 10px 40px;
  cursor: pointer;
}

main {
  /* flex-grow: 1; */
  /* width: 100%; */
  justify-items: center;
  /* margin: 0; Ensure no margin on the main */
  /* padding: 0; Ensure no padding on the main */
}

.title {
  font-family: 'Poppins', sans-serif;
  font-size: 80px;
  margin-top: 15vh;
  color: #0f5519;
  font-weight: 1000;
}
.future {
  color: black;
  font-weight: 1000;
}

.subheading {
  font-size: large;
  width: 60%;
  margin-top: 2vh;
  text-align: center;
  color: black;
}

.hook {
  width: 30%;
  height: auto;
  margin-top: 5vh;
  text-align: center;
  color: #0f5519;
  font-weight: 800;
}

a.hook {
  color: #0f5519;
  font-weight: 800;
  text-decoration: underline;
}

.key-features {
  background-color: #354833;
  color: white;
  flex-direction: column;
  top: -10vh;
}

.features-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 4rem;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 3rem;
  text-align: center;
  color: white;
}

.feature-cards {
  width: 90%;
  display: flex;
  justify-content: space-around;
  gap: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
