<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Welcome back, boss!</p>
    </div>

    <!-- Stat Cards -->
    <div class="stats-container">
      <div class="stat-card">
        <h3>Produce Near Expiry</h3>
        <p class="stat-label">Total</p>
        <p class="stat-total" :style="{ color: getColor(near_exp) }">
          {{ near_exp }}
        </p>
        <button class="details-button" @click="openModal('near_exp')">View Details</button>
      </div>

      <div class="stat-card">
        <h3>Stock Wasted</h3>
        <p class="stat-label">Total</p>
        <p class="stat-total" :style="{ color: getColor(wasted_stock) }">
          {{ wasted_stock }}
        </p>
        <button class="details-button" @click="openModal('wasted_stock')">View Details</button>
      </div>

      <div class="stat-card">
        <h3>Items Low on Supply</h3>
        <p class="stat-label">Total</p>
        <p class="stat-total" :style="{ color: getColor(low_supply) }">
          {{ low_supply }}
        </p>
        <button class="details-button" @click="openModal('low_supply')">View Details</button>
      </div>
    </div>

    <!-- AI Recommendation Banner -->
    <div class="ai-recommendation">
      <span class="ai-icon">📦</span>
      <p>SUPPL.AI recommends you purchase the next batch of produce in <strong>10 days</strong>.</p>
    </div>

    <!-- Details Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <button @click="closeModal" class="close-button">✖</button>
        <h2>Details for {{ modalTitle }}</h2>
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
import { ref, onMounted } from 'vue';

const near_exp = ref(0);
const low_supply = ref(0);
const wasted_stock = ref(0);
const isModalOpen = ref(false);
const modalTitle = ref('');
const modalData = ref([]);

const getColor = (value) => {
  return value > 10 ? '#b71c1c' : '#2e7d32';
};

const fetchData = async (url, targetRef, key) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    targetRef.value = data[key] || 0;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
  }
};

const openModal = async (category) => {
  isModalOpen.value = true;
  modalTitle.value =
    category === 'near_exp'
      ? 'Produce Near Expiry'
      : category === 'wasted_stock'
      ? 'Stock Wasted'
      : 'Items Low on Supply';

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/details/${category}/`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    modalData.value = await response.json();
  } catch (error) {
    console.error(`Error fetching details:`, error);
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  modalData.value = [];
};

onMounted(() => {
  fetchData('http://127.0.0.1:8000/api/dashboard/near_exp/', near_exp, 'avg');
  fetchData('http://127.0.0.1:8000/api/dashboard/low_stock/', low_supply, 'low');
  fetchData('http://127.0.0.1:8000/api/dashboard/wasted_stock/', wasted_stock, 'wasted');
});
</script>

<style>
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
  background-color: #388E3C;
}

.ai-recommendation {
  background: linear-gradient(to right, #5a7f5a, #4a6b4a);
  color: white;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
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
  min-width: 400px;
  max-width: 600px;
  text-align: center;
  position: relative;
}

.modal-content h2 {
  margin-bottom: 15px;
  color: black;
}

/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: black;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  background: white;
}

th {
  background: #f4f4f4;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  color: black;
}
</style>
