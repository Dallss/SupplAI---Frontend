<script setup lang="ts">
import { ref } from 'vue'
const employees = ref([])
</script>

<template>
  <div class="employees-container">
    <div class="employees-content">
      <h1>Employees</h1>
      <p class="subtitle">View the list of your employees.</p>
      
      <div class="employees-table">
        <div class="table-header">
          <div class="header-name">Name</div>
          <div class="header-branch">Branch</div>
        </div>
        
        <div class="table-body">
          <div v-if="employees.length === 0" class="empty-state">
            No employee data available
          </div>
          <div v-else v-for="(employee, index) in employees" :key="index" class="table-row">
            <div class="employee-name">{{ employee.name }}</div>
            <div class="employee-branch">{{ employee.branch }}</div>
          </div>
        </div>
      </div>
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

.subtitle {
  color: #666;
  margin-top: 0;
  margin-bottom: 1.25rem; 
  text-align: left;
  font-size: 0.875rem; 
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

.header-name {
  flex: 1;
  text-align: left;
  font-weight: 600;
  padding-left: 10rem;
}

.header-branch {
  flex: 1;
  text-align: left;
  font-weight: 600;
  padding-left: 10rem;
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

.employee-name {
  flex: 1;
  text-align: left;
  color: #000;
}

.employee-branch {
  flex: 1;
  text-align: left;
  color: #000;
}
</style>