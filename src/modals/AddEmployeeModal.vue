<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close', 'add-employee'])

const newEmployee = ref({
  firstName: '',
  middleInitial: '',
  lastName: '',
  branch: 'Cebu',
  username: '',
  position: 'Manager'
})

const branches = ['Cebu', 'Manila', 'Davao']
const positions = ['Manager', 'Employee']

const addEmployee = () => {
  emit('add-employee', { ...newEmployee.value })
  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h3>Add Employee</h3>
      </div>
      <form @submit.prevent="addEmployee">
        <label>
          First Name:
          <input v-model="newEmployee.firstName" type="text" required />
        </label>
        <label>
          Middle Initial:
          <input v-model="newEmployee.middleInitial" type="text" maxlength="1" />
        </label>
        <label>
          Last Name:
          <input v-model="newEmployee.lastName" type="text" required />
        </label>
        <label>
          Branch:
          <select v-model="newEmployee.branch">
            <option v-for="branch in branches" :key="branch" :value="branch">{{ branch }}</option>
          </select>
        </label>
        <label>
          Username:
          <input v-model="newEmployee.username" type="text" required />
        </label>
        <label>
          Position:
          <select v-model="newEmployee.position">
            <option v-for="position in positions" :key="position" :value="position">{{ position }}</option>
          </select>
        </label>
        <div class="modal-buttons">
          <button type="submit">Add</button>
          <button type="button" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.modal {
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  overflow: hidden;
}

.modal-header {
  background-color: #354833;
  color: white;
  padding: 1rem 2rem;
  margin: 0;
}

.modal-header h2 {
  margin: 0;
}

.modal form {
  padding: 2rem;
}

.modal label {
  display: block;
  margin-bottom: 1rem;
}

.modal input, .modal select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.modal-buttons button[type="submit"] {
  background-color: #354833;
  color: white;
}

.modal-buttons button[type="button"] {
  background-color: #ccc;
}
</style>