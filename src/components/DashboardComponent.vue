<template>
  <div>
    <h2>NEAR EXP</h2>
    {{ near_exp }}
  </div>
  <div>
    <h2>LOW SUPPLY</h2>
    {{ low_supply }}
  </div>
  <div>
    <h2>STOCK WASTED</h2>
    {{ wasted_stock }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const near_exp = ref([])
const low_supply = ref([])
const wasted_stock = ref([])

const fetchNearExp = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/dashboard/near_exp/')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data:', data) // Debug log for response data

    near_exp.value = data
  } catch (error) {
    console.error('Error fetching batches:', error)
  }
}

const fetchLowStock = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/dashboard/low_stock/')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data:', data) // Debug log for response data

    low_stock.value = data
  } catch (error) {
    console.error('Error fetching batches:', error)
  }
}

const fetchWastedStock = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/dashboard/wasted_stock/')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data:', data) // Debug log for response data

    wasted_stock.value = data
  } catch (error) {
    console.error('Error fetching batches:', error)
  }
}

// Fetch data when the component mounts
onMounted(fetchNearExp)
onMounted(fetchLowStock)
onMounted(fetchWastedStock)
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
