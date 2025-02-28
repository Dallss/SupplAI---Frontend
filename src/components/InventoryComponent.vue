<template>
  <div>
    <h2>Batch List</h2>
    <table border="1">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

const batches = ref([]) // Reactive state

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

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
}
</style>
