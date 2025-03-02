<template>
  <div class="inventory-container">
    <h1>Inventory</h1>
    <div class="header">
      <p class="subtitle">View and manage your latest batches of produce.</p>
      <button class="add-batch-button" @click="showModal = true">Add Batch</button>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Batch Manager</th>
            <th>Added to Inventory On</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="batch in batches" :key="batch.batch_id">
            <td>{{ batch.batch_id }}</td>
            <td>{{ batch.batch_manager }}</td>
            <td>{{ batch.added_to_inventory_on }}</td>
            <td>
              <button class="view-button" @click="viewBatchDetails(batch)">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BatchModal 
      v-if="showModal"
      :show="showModal" 
      @close="showModal = false" 
      @add-batch="addBatch" 
      :batchNumber="nextBatchNumber" 
      :produceOptions="produceOptions"
      :batchManagers="batchManagers" 
    />

    <div v-if="showBatchDetails" class="modal-backdrop" @click="showBatchDetails = false">
      <div class="modal-content batch-details" @click.stop>
        <div class="modal-header">
          <h2>Batch Details: {{ selectedBatch?.batch_id }}</h2>
          <button class="close-button" @click="showBatchDetails = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="details-row">
            <div class="detail-label">Batch Manager:</div>
            <div class="detail-value">{{ selectedBatch?.batch_manager }}</div>
            <button class="delete-button" @click="deleteBatch(selectedBatch?.batch_id)">Delete Batch</button>
          </div>
          <div class="details-row">
            <div class="detail-label">Added to Inventory On:</div>
            <div class="detail-value">{{ selectedBatch?.added_to_inventory_on }}</div>
          </div>
          
          <h3>Produce Items</h3>
          <div class="produce-details-container">
            <div v-for="(produce, index) in batchProduces" :key="index" class="produce-detail-card">
              <div class="produce-detail-name">{{ produce.name }}</div>
              <div class="produce-detail-info">
                <div class="detail-row">
                  <span>Stock:</span>
                  <span>{{ produce.stock }}</span>
                </div>
                <div class="detail-row">
                  <span>Health:</span>
                  <span :class="getHealthClass(produce.health)">{{ produce.health }}</span>
                </div>
                <div class="detail-row">
                  <button class="update-button" @click="openUpdateModal(index)">Update</button>
                  <button class="delete-button" @click="deleteProduce(index)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showUpdateModal" class="modal-backdrop" @click="showUpdateModal = false">
      <div class="modal-content update-modal" @click.stop>
        <div class="modal-header">
          <h2>Update Produce</h2>
          <button class="close-button" @click="showUpdateModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-body-content">
            <div class="qr-section">
              <div class="qr-title">Update Produce Health</div>
              <div class="qr-placeholder">QR</div>
              <div class="details-row">
                <div class="detail-label">Current Health:</div>
                <div class="detail-value">{{ selectedProduce?.health }}</div>
              </div>
              <div class="details-row">
                <div class="detail-label">Update Health:</div>
                <select v-model="selectedProduce.health" class="health-select">
                  <option value="Fresh">Fresh</option>
                  <option value="Spoiled">Spoiled</option>
                </select>
              </div>
            </div>
            <div class="modal-details">
              <div class="details-row">
                <div class="detail-label">Produce Name:</div>
                <div class="detail-value">{{ selectedProduce?.name }}</div>
              </div>
              <div class="details-row">
                <div class="detail-label">Total Stock:</div>
                <div class="detail-value">{{ selectedProduce?.stock }}</div>
              </div>
              <div class="details-row">
                <div class="detail-label">Stock Spent:</div>
                <input type="number" v-model="stockSpent" class="stock-input" min="0" />
              </div>
              <div class="details-row">
                <div class="detail-label">Stock Wasted:</div>
                <input type="number" v-model="stockWasted" class="stock-input" min="0" />
              </div>
              <div class="details-row">
                <div class="detail-label">Stock Remaining:</div>
                <div class="detail-value">{{ remainingStock }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="confirm-button" @click="updateHealth">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import BatchModal from "@/components/BatchModal.vue"

interface Batch {
  batch_id: string;
  batch_manager: string;
  added_to_inventory_on: string;
  produces?: ProduceItem[];
}

interface ProduceItem {
  name: string;
  stock: number;
  health: string;
}

interface ProduceOption {
  id: number;
  name: string;
}

const batches = ref<Batch[]>([]) 
const showModal = ref(false)
const nextBatchNumber = ref(1)
const produceOptions = ref<ProduceOption[]>([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Mango' },
  { id: 3, name: 'Banana' }
])
const batchManagers = ref<string[]>([
  'John Doe',
  'Martin Lucas',
  'Claire Santina'
])

// Batch details modal
const showBatchDetails = ref(false)
const selectedBatch = ref<Batch | null>(null)
const batchProduces = ref<ProduceItem[]>([])

// Update modal
const showUpdateModal = ref(false)
const selectedProduce = ref<ProduceItem | null>(null)
const stockSpent = ref(0)
const stockWasted = ref(0)

const remainingStock = computed(() => {
  if (selectedProduce.value) {
    return Math.max(selectedProduce.value.stock - stockSpent.value - stockWasted.value, 0);
  }
  return 0;
});

const updateHealth = () => {
  if (selectedProduce.value) {
    selectedProduce.value.stock = remainingStock.value;
  }
  showUpdateModal.value = false;
};


watch([stockSpent, stockWasted], () => {
  if (selectedProduce) {
    selectedProduce.stock = remainingStock.value
  }
})

const fetchBatches = async () => {
  try {
    console.log('Fetching batches...') 
    // Using sample data instead of API call
    batches.value = [
      {
        batch_id: "Batch #1",
        batch_manager: "John Doe",
        added_to_inventory_on: "2025-01-15",
        produces: [
          { name: "Apple", stock: 10, health: "Fresh" },
          { name: "Banana", stock: 5, health: "Ripe" }
        ]
      },
      {
        batch_id: "Batch #2",
        batch_manager: "Jane Smith",
        added_to_inventory_on: "2025-03-02",
        produces: [
          { name: "Mango", stock: 8, health: "Fresh" },
          { name: "Apple", stock: 3, health: "Overripe" }
        ]
      },
      {
        batch_id: "Batch #3",
        batch_manager: "Alex Johnson",
        added_to_inventory_on: "2025-03-02",
        produces: [
          { name: "Banana", stock: 12, health: "Ripe" },
          { name: "Mango", stock: 2, health: "Spoiled" }
        ]
      }
    ]
    nextBatchNumber.value = batches.value.length + 1
    
    // Commented out API call for now
    /*
    const response = await fetch('http://127.0.0.1:8000/api/inventory/get_batches/')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data:', data) 

    batches.value = data
    nextBatchNumber.value = data.length + 1
    */
  } catch (error) {
    console.error('Error fetching batches:', error)
  }
}

const fetchProduceOptions = async () => {
  try {
    console.log('Fetching produce options...')
    // Sample data is already set, so we don't need to fetch from API
    
    // Commented out API call for now
    /*
    const response = await fetch('http://127.0.0.1:8000/api/inventory/get_produce_options/')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received produce options:', data)

    produceOptions.value = data
    */
  } catch (error) {
    console.error('Error fetching produce options:', error)
  }
}

const addBatch = (newBatch: any) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const formattedBatch: Batch = {
    batch_id: `Batch #${nextBatchNumber.value}`,
    batch_manager: newBatch.batchManager || "Current User",
    added_to_inventory_on: currentDate,
    produces: newBatch.produces
  };
  
  batches.value.push(formattedBatch);
  nextBatchNumber.value++;
  showModal.value = false;
}

const viewBatchDetails = (batch: Batch) => {
  selectedBatch.value = batch;
  batchProduces.value = batch.produces || [];
  showBatchDetails.value = true;
}

const deleteBatch = (batchId: string | undefined) => {
  if (batchId) {
    batches.value = batches.value.filter(batch => batch.batch_id !== batchId);
    showBatchDetails.value = false;
  }
}

const openUpdateModal = (index: number) => {
  selectedProduce.value = batchProduces.value[index];
  stockSpent.value = 0;
  stockWasted.value = 0;
  showUpdateModal.value = true;
}


const deleteProduce = (index: number) => {
  batchProduces.value.splice(index, 1);
}

const getHealthClass = (health: string): string => {
  switch (health) {
    case 'Fresh':
      return 'health-fresh';
    case 'Spoiled':
      return 'health-spoiled';
    default:
      return '';
  }
}

onMounted(() => {
  fetchBatches()
  fetchProduceOptions()
})
</script>

<style scoped>
.inventory-container {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  padding: 1.25rem;
  box-sizing: border-box;
}

h1 {
  color: #3c4a3e;
  font-size: 1.75rem;
  margin-bottom: 0.3125rem;
  font-weight: 600;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.subtitle {
  color: #555;
  margin: 0;
}

.add-batch-button {
  background-color: #354833;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.3125rem;
  cursor: pointer;
}

.add-batch-button:hover {
  background-color: #445D41;
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
  text-align: center;
  font-weight: 500;
  padding: 0.75rem 0.9375rem;
}

td {
  padding: 0.75rem 0.9375rem;
  border-bottom: 0.0625rem solid #eee;
  color: black;
  text-align: center;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

tbody tr:last-child td {
  border-bottom: none;
}

.view-button {
  background-color: #354833;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.view-button:hover {
  background-color: #445D41;
}

.delete-button {
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.delete-button:hover {
  background-color: #b71c1c;
}

.update-button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.update-button:hover {
  background-color: #1565c0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.modal-header h2 {
  margin: 0;
  color: #3c4a3e;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1rem;
  color: black;
}

.details-row {
  display: flex;
  margin-bottom: 0.75rem;
  align-items: center;
}

.detail-label {
  font-weight: 600;
  width: 180px;
}

.detail-value {
  flex: 1;
}

h3 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #3c4a3e;
}

.produce-details-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.produce-detail-card {
  width: calc(50% - 0.5rem);
  min-width: 200px;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: white;
}

.produce-detail-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #3c4a3e;
}

.produce-detail-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

.health-fresh {
  color: #2e7d32;
  font-weight: 500;
}

.health-spoiled {
  color: #d32f2f;
  font-weight: 500;
}

.stock-input {
  width: 60px;
  padding: 0.3rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  text-align: center;
}

.health-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  width: 120px;
  text-align: center;
}

.confirm-button {
  background-color: #354833;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}

.confirm-button:hover {
  background-color: #445D41;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.modal-body-content {
  display: flex;
  gap: 1rem;
}

.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-title {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.qr-placeholder {
  width: 12rem;
  height: 12rem;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: #666;
  flex-direction: column;
}

.modal-details {
  flex: 1;
}
</style>