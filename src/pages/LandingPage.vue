<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false);
const username = ref('');
const password = ref('');

function login() {
  alert(`Logging in as ${username.value}`);
  showModal.value = false;
}
</script>

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
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-label">Run</span>
            </div>
            <p class="feature-text">
              SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-label">Run</span>
            </div>
            <p class="feature-text">
              SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-label">Run</span>
            </div>
            <p class="feature-text">
              SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="section our-cause" id="our-cause">
      <div class="features-container">
        <h2 class="section-title">Our Cause</h2>
        <div class="feature-cards">
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-label">Run</span>
            </div>
            <p class="feature-text">
              SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-label">Run</span>
            </div>
            <p class="feature-text">
              SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="section about-us" id="about-us">
      <div class="features-container">
        <h2 class="section-title">About Us</h2>
        <div class="feature-cards">
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-label">Run</span>
            </div>
            <p class="feature-text">
              SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-label">Run</span>
            </div>
            <p class="feature-text">
              SuplAI helps you optimize your food supply, reduce waste, and save costs with smart tracking and real-time insights. Make every ingredient count—start managing smarter today
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h2 class="modal-title">Login</h2>
        <input type="text" v-model="username" class="modal-input" placeholder="Username" />
        <input type="password" v-model="password" class="modal-input" placeholder="Password" />
        <div class="modal-actions">
          <button @click="login" class="modal-button modal-login">Login</button>
          <button @click="showModal = false" class="modal-button modal-cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #354833;
  scroll-snap-type: y mandatory; /* Enable scroll snapping */
  overflow-y: scroll; /* Enable vertical scrolling */
  margin: 0; /* Ensure no margin on the container */
  padding: 0; /* Ensure no padding on the container */
}

.section {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  scroll-snap-align: start; /* Snap to the start of each section */
  margin: 0; /* Ensure no margin on the sections */
  padding: 0; /* Ensure no padding on the sections */
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0; /* Ensure no margin on the home section */
  padding: 0; /* Ensure no padding on the home section */
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
  margin-right: 10px;
  color: black;
  padding-right: 3rem;
}

main {
  flex-grow: 1;
  width: 100%;
  justify-items: center;
  margin: 0; /* Ensure no margin on the main */
  padding: 0; /* Ensure no padding on the main */
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
  width: 60vw;
  margin-top: 2vh;
  text-align: center;
  color: black;
}

.hook {
  width: 30vw;
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
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  color: white;
}

.feature-cards {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 2rem;
}

.feature-card {
  background-color: #354833;
  border-radius: 1rem;
  padding: 2rem;
  width: 300px;
  position: relative;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 30%;
}

.feature-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.feature-label {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-left: 7.85rem;
}

/* .feature-bracket {
  position: relative;
  width: 100px;
  height: 50px;
}

.feature-bracket::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-top: 10px solid white;
  border-right: 10px solid white;
  border-radius: 0 10px 0 0;
  margin-left: 12rem;
} */

.feature-text {
  font-size: 0.9rem;
  text-align: center;
  align-items: center;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.modal-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.modal-button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
}

.modal-login {
  background: #007bff;
  color: white;
}

.modal-login:hover {
  background: #0056b3;
}

.modal-cancel {
  background: #ccc;
  color: black;
}

.modal-cancel:hover {
  background: #999;
}
</style>