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
