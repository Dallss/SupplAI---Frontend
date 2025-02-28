<template>
  <div class="inventory-container">
    <h1>Inventory</h1>
    <p class="subtitle">View and manage your latest batches of produce.</p>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Batch Manager</th>
            <th>Added to Inventory On</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="batch in batches" :key="batch.batch_id">
            <td>{{ batch.batch_id }}</td>
            <td>{{ batch.batch_manager }}</td>
            <td>{{ batch.added_to_inventory_on }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Batch {
  batch_id: string;
  batch_manager: string;
  added_to_inventory_on: string;
}

const batches = ref<Batch[]>([]) // Empty array to be filled from API

const fetchBatches = async () => {
  try {
    console.log('Fetching batches...') // Debug log before request
    const response = await fetch('http://127.0.0.1:8000/api/inventory/get_batches/')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data:', data) // Debug log for response data

    batches.value = data
  } catch (error) {
    console.error('Error fetching batches:', error)
  }
}

// Fetch data when the component mounts
onMounted(fetchBatches)
</script>

<style scoped>
.inventory-container {
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
}

h1 {
  color: #3c4a3e;
  font-size: 1.75rem;
  margin-bottom: 0.3125rem;
}

.subtitle {
  color: #555;
  margin-top: 0;
  margin-bottom: 1.25rem;
}

.table-container {
  background-color: white;
  border-radius: 0.3125rem;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #354833;
  color: white;
}

th {
  padding: 0.75rem 0.9375rem;
  text-align: left;
  font-weight: 500;
}

td {
  padding: 0.75rem 0.9375rem;
  border-bottom: 0.0625rem solid #eee;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>