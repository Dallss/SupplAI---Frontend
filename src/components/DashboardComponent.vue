<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Welcome back, boss!</p>
    </div>

    <!-- Stat Cards -->
    <h2 class="title">This Months</h2>
    <div class="stats-container">
      <div class="stat-card">
        <h3>Near Expiry</h3>
        <p class="stat-label">Total</p>
        <p class="stat-total" :style="{ color: getColor(near_exp) }">
          {{ near_exp }}
        </p>
        <button class="details-button" @click="openModal('near_exp')">View Details</button>
      </div>

      <div class="stat-card">
        <h3>Wasted</h3>
        <p class="stat-label">Total</p>
        <p class="stat-total" :style="{ color: getColor(wasted_stock) }">
          {{ wasted_stock }}
        </p>
        <button class="details-button" @click="openModal('wasted_stock')">View Details</button>
      </div>

      <div class="stat-card">
        <h3>Low on Supply</h3>
        <p class="stat-label">Total</p>
        <p class="stat-total" :style="{ color: getColor(low_supply) }">
          {{ low_supply }}
        </p>
        <button class="details-button" @click="openModal('low_supply')">View Details</button>
      </div>
    </div>

    <!-- AI Recommendation Banner -->
    <div class="long-boxes ai-recommendation">
      <span class="ai-icon">📦</span>
      <p>You are low on: <strong>apple, banna</strong></p>
    </div>

    <h2 class="title">Item Predictions</h2>
    <div class="food-container">
      <div
        v-for="(item, index) in foodItems"
        :key="index"
        class="food-item"
        @click="openFoodModal(item)"
      >
        <img :src="item.image" alt="Food Image" />
        <span class="food-name">{{ item.name }}</span>
        <span class="food-name"> Next week demand: 59 </span>
      </div>
    </div>

    <!-- Food Details Modal -->
    <div v-if="isFoodModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedFood?.name }} Use Chart</h2>
          <button @click="closeFoodModal" class="close-button">✖</button>
        </div>
        <LineChart v-if="selectedFood?.usageData" :chart-data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Details for {{ modalTitle }}</h2>
          <button @click="closeModal" class="close-button">✖</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in modalData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { computed } from 'vue'

// querrreis

// item usage graph

import produceService from '@/api/produceService' // Default import
const foodItems = ref([{ image: 'https://via.placeholder.com/100?text=Apple', name: 'fetching' }])
async function fetchAllProduce() {
  try {
    const response = await produceService.getAll()
    foodItems.value = response
    console.log(response.data) // Process the fetched data
  } catch (error) {
    console.error('Error fetching all produce:', error)
  }
}

fetchAllProduce()

const near_exp = ref(0)
const low_supply = ref(0)
const wasted_stock = ref(0)
const isModalOpen = ref(false)
const modalTitle = ref('')
const modalData = ref([])

const selectedFood = ref(null)
const isFoodModalOpen = ref(false)

const openFoodModal = (item) => {
  console.info(item)
  selectedFood.value = {
    ...item,
    usageData: item.usageData || [
      { time: '2024-01-01', usage: 10 },
      { time: '2024-02-01', usage: 15 },
      { time: '2024-03-01', usage: 20 },
    ], // Provide default data if missing
    predictions: {
      '2024-01-01': 10,
      '2024-02-01': 11,
      '2024-03-01': 13,
      '2024-04-01': 17,
      '2024-05-01': 17,
      '2024-06-01': 16,
    },
  }
  isFoodModalOpen.value = true
}

const closeFoodModal = () => {
  isFoodModalOpen.value = false
  selectedFood.value = null
}

// for chart
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const chartData = computed(() => {
  // Assuming `selectedFood.predictions?.use` is an object with date as key and use as value
  const dates = Object.keys(selectedFood.value.predictions || [])
  const usageData = dates.map((date) => selectedFood.value.predictions[date])

  return {
    labels: dates,
    datasets: [
      {
        label: 'Item Use Over Time',
        data: usageData,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { title: { display: true, text: 'Time' } },
    y: { title: { display: true, text: 'Usage' } },
  },
  plugins: {
    annotation: {
      annotations: {
        highlightRange: {
          type: 'box',
          xMin: new Date('2024-02-01'), // Start of highlight (date or value)
          xMax: new Date('2024-03-01'), // End of highlight
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Transparent red
          borderWidth: 0,
        },
      },
    },
  },
}))
// chart-closing
const getColor = (value) => {
  return value > 10 ? '#b71c1c' : '#2e7d32'
}

const fetchData = async (url, targetRef, key) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

    const data = await response.json()
    targetRef.value = data[key] || 0
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
  }
}

const openModal = async (category) => {
  isModalOpen.value = true
  modalTitle.value =
    category === 'near_exp'
      ? 'Produce Near Expiry'
      : category === 'wasted_stock'
        ? 'Stock Wasted'
        : 'Items Low on Supply'

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/details/${category}/`)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

    modalData.value = await response.json()
  } catch (error) {
    console.error(`Error fetching details:`, error)
  }
}

const closeModal = () => {
  isModalOpen.value = false
  modalData.value = []
}

onMounted(() => {
  fetchData('http://127.0.0.1:8000/api/dashboard/near_exp/', near_exp, 'avg')
  fetchData('http://127.0.0.1:8000/api/dashboard/low_stock/', low_supply, 'low')
  fetchData('http://127.0.0.1:8000/api/dashboard/wasted_stock/', wasted_stock, 'wasted')
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f5f8f6;
  border-radius: 10px;
}

.dashboard-header h1 {
  font-size: 28px;
  color: #2f3e2f;
  font-weight: bold;
}

.dashboard-header p {
  font-size: 16px;
  color: #666;
}

.stats-container {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.stat-card {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.stat-card h3 {
  font-size: 18px;
  color: #2f3e2f;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-total {
  font-size: 48px;
  font-weight: bold;
  margin: 5px 0;
}

.details-button {
  background-color: #5a7f5a;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.details-button:hover {
  background-color: #388e3c;
}

.long-boxes {
  background: white;
  color: black;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ai-recommendation {
  background: linear-gradient(to right, #68200b, #a11717ae);
  color: white;
  font-size: x-large;
}

.ai-icon {
  font-size: 24px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 600px; /* Increase width */
  max-width: 800px; /* Increase max width */
  text-align: left; /* Align text to the left */
  position: relative;
}

.modal-content h2 {
  margin-bottom: 10px;
  color: black;
  text-align: left; /* Align header to the left */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd; /* Add separator */
  padding-bottom: 10px;
  margin-bottom: 15px;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: black;
}
/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: black;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  background: white;
}

.food-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Space between items */
  justify-content: flex-start; /* Align items from the top-left */
  padding: 10px;
}

.food-item {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2); /* Shadow effect */
  background: #fff;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.food-item:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 4px 6px 15px rgba(0, 0, 0, 0.3);
}

.food-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  color: rgba(12, 11, 11, 0.676);
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
}

.food-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.food-name {
  font-size: 12px;
  color: #050505;
  margin-top: 5px;
}
</style>
