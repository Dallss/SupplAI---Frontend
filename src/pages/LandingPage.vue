<template>
  <form class="modal" @submit.prevent="login">
    <h2 class="modal-title">Login</h2>
    <input type="text" v-model="username" class="modal-input" placeholder="Username" />
    <input type="password" v-model="password" class="modal-input" placeholder="Password" />
    <div class="modal-actions">
      <button type="submit" class="modal-button modal-login">Login</button>
      <button type="button" @click="closeModal" class="modal-button modal-cancel">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const router = useRouter()
const emit = defineEmits(['closeModal']) // ✅ Correctly define emits

async function login() {
  try {
    const response = await axios.post('http://localhost:8000/api/user/login/', {
      username: username.value,
      password: password.value,
    })

    console.log('Login successful:', response.data)
    localStorage.setItem('token', response.data.token)

    emit('closeModal') // ✅ Close modal after login

    router.push('/app/dashboard') // ✅ Redirect after login
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message)
    alert('Login failed. Please check your credentials.')
  }
}

// ✅ Close modal when cancel button is clicked
const closeModal = () => {
  emit('closeModal')
}
</script>

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
</style>
