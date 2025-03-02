<script setup lang="ts">
import { ref } from 'vue'
import AddEmployeeModal from "@/components/AddEmployeeModal.vue"

const employees = ref([
  { name: 'John Doe', branch: 'New York', position: 'Manager', username: 'johndoe', dateAdded: '2025-03-02' },
  { name: 'Jane Smith', branch: 'Los Angeles', position: 'Developer', username: 'janesmith', dateAdded: '2025-03-02' }
])

const showModal = ref(false)
const showDetailsModal = ref(false)
const showUpdateModal = ref(false)
const selectedEmployee = ref(null)
const employeeToUpdate = ref({
  name: '',
  branch: '',
  position: ''
})

const addEmployee = (newEmployee) => {
  employees.value.push({
    name: `${newEmployee.firstName} ${newEmployee.middleInitial} ${newEmployee.lastName}`,
    branch: newEmployee.branch,
    position: newEmployee.position,
    username: newEmployee.username,
    dateAdded: new Date().toISOString().split('T')[0]
  })
  showModal.value = false
}

const viewDetails = (employee) => {
  selectedEmployee.value = employee
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
}

const deleteEmployee = () => {
  employees.value = employees.value.filter(emp => emp !== selectedEmployee.value)
  showDetailsModal.value = false
}

const openUpdateModal = () => {
  employeeToUpdate.value = { ...selectedEmployee.value }
  showUpdateModal.value = true
}

const closeUpdateModal = () => {
  showUpdateModal.value = false
}

const updateEmployee = () => {
  const index = employees.value.findIndex(emp => emp.username === selectedEmployee.value.username)
  if (index !== -1) {
    employees.value[index] = { ...employeeToUpdate.value }
  }
  showUpdateModal.value = false
  showDetailsModal.value = false
}
</script>

<template>
  <div class="employees-container">
    <div class="employees-content">
      <h1>Employees</h1>
      <div class="header-container">
        <p class="subtitle">View the list of your employees.</p>
        <button class="add-employee-button" @click="showModal = true">Add Employee</button>
      </div>
      
      <div class="employees-table">
        <div class="table-header">
          <div class="header-name">Name</div>
          <div class="header-branch">Branch</div>
          <div class="header-position">Position</div>
          <div class="header-actions">Actions</div>
        </div>
        
        <div class="table-body">
          <div v-if="employees.length === 0" class="empty-state">
            No employee data available
          </div>
          <div v-else v-for="(employee, index) in employees" :key="index" class="table-row">
            <div class="employee-name">{{ employee.name }}</div>
            <div class="employee-branch">{{ employee.branch }}</div>
            <div class="employee-position">{{ employee.position }}</div>
            <div class="employee-actions">
              <button @click="viewDetails(employee)">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AddEmployeeModal v-if="showModal" @close="showModal = false" @add-employee="addEmployee" />

  <div v-if="showDetailsModal" class="modal-overlay" @click.self="closeDetailsModal">
    <div class="modal">
      <button class="close-button" @click="closeDetailsModal">&times;</button>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {{ selectedEmployee.name }}</p>
      <p><strong>Branch:</strong> {{ selectedEmployee.branch }}</p>
      <p><strong>Position:</strong> {{ selectedEmployee.position }}</p>
      <p><strong>Username:</strong> {{ selectedEmployee.username }}</p>
      <p><strong>Date Added:</strong> {{ selectedEmployee.dateAdded }}</p>
      <div class="modal-buttons">
        <button class="delete-button" @click="deleteEmployee">Delete</button>
        <button @click="openUpdateModal">Update</button>
      </div>
    </div>
  </div>

  <div v-if="showUpdateModal" class="modal-overlay" @click.self="closeUpdateModal">
    <div class="modal">
      <button class="close-button" @click="closeUpdateModal">&times;</button>
      <h2>Update Employee</h2>
      <form @submit.prevent="updateEmployee">
        <label>
          Name:
          <input v-model="employeeToUpdate.name" type="text" required />
        </label>
        <label>
          Branch:
          <select v-model="employeeToUpdate.branch">
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Cebu">Cebu</option>
            <option value="Manila">Manila</option>
            <option value="Davao">Davao</option>
          </select>
        </label>
        <label>
          Position:
          <select v-model="employeeToUpdate.position">
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Employee">Employee</option>
          </select>
        </label>
        <div class="modal-buttons">
          <button type="submit">Save</button>
          <button type="button" @click="closeUpdateModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.employees-container {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  padding: 1.25rem;
  box-sizing: border-box;
}

.employees-content {
  width: 100%;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  font-size: 1.75rem; 
  margin-bottom: 0.3125rem; 
  font-weight: 600;
  text-align: left;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.subtitle {
  color: #666;
  margin: 0;
  text-align: left;
  font-size: 0.875rem; 
}

.add-employee-button {
  padding: 0.5rem 1rem;
  background-color: #354833;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.add-employee-button:hover {
  background-color: #2c3e50;
}

.employees-table {
  width: 100%;
  background-color: white;
  border-radius: 0.5rem; 
  overflow: hidden;
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.05);
}

.table-header {
  display: flex;
  background-color: #354833;
  color: white;
  padding: 0.9375rem 1.25rem; 
  font-weight: 500;
}

.header-name, .header-branch, .header-position, .header-actions {
  flex: 1;
  text-align: center;
  font-weight: 600;
}

.table-body {
  max-height: 25rem; 
  overflow-y: auto;
}

.empty-state {
  padding: 1.875rem;
  text-align: center;
  color: #000;
}

.table-row {
  display: flex;
  padding: 0.9375rem 1.25rem; 
  border-bottom: 0.0625rem solid #eee; 
}

.table-row:last-child {
  border-bottom: none;
}

.employee-name, .employee-branch, .employee-position, .employee-actions {
  flex: 1;
  text-align: center;
  color: #000;
}

.employee-actions button {
  padding: 0.5rem 1rem;
  background-color: #354833;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.employee-actions button:hover {
  background-color: #2c3e50;
}

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
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  color:#000;
  position: relative;
}

.modal h2 {
  margin-top: 0;
}

.modal p {
  margin: 0.5rem 0;
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
  background-color: #354833;
  color: white;
}

.modal-buttons button:hover {
  background-color: #2c3e50;
}

.modal-buttons .delete-button {
  background-color: #e74c3c;
}

.modal-buttons .delete-button:hover {
  background-color: #c0392b;
}

.modal form label {
  display: block;
  margin-bottom: 1rem;
}

.modal form input,
.modal form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.modal form input:focus,
.modal form select:focus {
  border-color: #354833;
  outline: none;
}

.modal form .modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal form .modal-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #354833;
  color: white;
}

.modal form .modal-buttons button:hover {
  background-color: #2d4951;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000;
}
</style>