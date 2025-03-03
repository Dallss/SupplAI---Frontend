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
            <button class="add-produce-button" @click="openAddProduceModal">Add Produce</button>
            <div class="delete-dropdown">
              <button class="delete-button" @click="toggleBatchDeleteOptions">Delete Batch</button>
              <div v-if="showBatchDeleteOptions" class="delete-options">
                <button @click="markBatchAsSpoiled">Mark as Spoiled</button>
                <button @click="deleteBatch(selectedBatch?.batch_id)">Delete from Database</button>
              </div>
            </div>
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
                  <div class="delete-dropdown">
                    <button class="delete-button" @click="toggleDeleteOptions(index)">Delete</button>
                    <div v-if="showDeleteOptions[index]" class="delete-options">
                      <button @click="markAsSpoiled(index)">Mark as Spoiled</button>
                      <button @click="deleteProduce(index)">Delete from Database</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddProduceModal 
    v-if="showAddProduceModal"
    :show="showAddProduceModal" 
    :produceOptions="produceOptions" 
    @close="closeAddProduceModal" 
    @add-produce="handleAddProduce" 
    />

    <SelectProduceModal 
      v-if="showSelectProduceModal"
      :show="showSelectProduceModal" 
      :produceOptions="produceOptions" 
      @close="closeSelectProduceModal" 
      @select-produce="handleSelectProduce" 
    />

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
              <div v-if="scanAlert" class="scan-alert">{{ scanAlert }}</div>
              <div class="details-row">
                <div class="detail-label">Current Health:</div>
                <div class="detail-value">{{ selectedProduce?.health }}</div>
              </div>
              <div class="details-row">
                <div class="detail-label">Update Health:</div>
                <div class="detail-value">{{ selectedProduce?.health }}</div>
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
import AddProduceModal from "@/components/AddProduceModal.vue";

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

const showDeleteOptions = ref<boolean[]>([]);
const showBatchDeleteOptions = ref(false);

const toggleDeleteOptions = (index: number) => {
  showDeleteOptions.value = showDeleteOptions.value.map((show, i) => i === index ? !show : false);
};

const toggleBatchDeleteOptions = () => {
  showBatchDeleteOptions.value = !showBatchDeleteOptions.value;
};

const markAsSpoiled = (index: number) => {
  if (selectedBatch.value) {
    selectedBatch.value.produces?.forEach(produce => {
      produce.health = 'Spoiled';
    });
  }
  showDeleteOptions.value[index] = false;
};

const markBatchAsSpoiled = () => {
  if (selectedBatch.value) {
    selectedBatch.value.produces?.forEach(produce => {
      produce.health = 'Spoiled';
    });
  }
  showBatchDeleteOptions.value = false;
};

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

const showBatchDetails = ref(false)
const selectedBatch = ref<Batch | null>(null)
const batchProduces = ref<ProduceItem[]>([])

const showUpdateModal = ref(false)
const selectedProduce = ref<ProduceItem | null>(null)
const stockSpent = ref(0)
const stockWasted = ref(0)
const scanAlert = ref('')

const showSelectProduceModal = ref(false);

const remainingStock = computed(() => {
  if (selectedProduce.value) {
    return Math.max(selectedProduce.value.stock - stockSpent.value - stockWasted.value, 0);
  }
  return 0;
});

const updateHealth = () => {
  if (selectedProduce.value) {
    selectedProduce.value.stock = remainingStock.value;
    scanAlert.value = 'Scanned Successfully';
  }
  showUpdateModal.value = false;
};

const updateHealthFromQR = (health: string) => {
  if (selectedProduce.value) {
    selectedProduce.value.health = health;
    scanAlert.value = 'Scanned Successfully';
  }
};

watch([stockSpent, stockWasted], () => {
  if (selectedProduce) {
    selectedProduce.stock = remainingStock.value
  }
})

const showAddProduceModal = ref(false);

const openAddProduceModal = () => {
  showAddProduceModal.value = true;
};

const closeAddProduceModal = () => {
  showAddProduceModal.value = false;
};

const handleAddProduce = (produce: { name: string; stock: number }) => {
  if (selectedBatch.value) {
    selectedBatch.value.produces?.push({ 
      name: produce.name, 
      stock: produce.stock,
      health: 'Fresh'
    });
  }
  closeAddProduceModal();
};

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
  showDeleteOptions.value = new Array(batchProduces.value.length).fill(false);
  showBatchDeleteOptions.value = false;
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

const openSelectProduceModal = () => {
  showSelectProduceModal.value = true;
};

const closeSelectProduceModal = () => {
  showSelectProduceModal.value = false;
};

const handleSelectProduce = (produceName: string) => {
  if (selectedBatch.value) {
    selectedBatch.value.produces?.push({ 
      name: produceName, 
      stock: 1,
      health: 'Fresh'
    });
  }
  closeSelectProduceModal();
};

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
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  margin-top: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
}

thead {
  background-color: #354833;
  color: white;
}

th {
  background-color: #354833;
  text-align: center;
  font-weight: 500;
  padding: 0.75rem 0.9375rem;
  color: white;
}

td {
  padding: 0.75rem 0.9375rem;
  color: black;
  text-align: center;
  border: none;
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
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.delete-button:hover {
  background-color: #b71c1c;
  padding: 0.5rem 1.5rem;
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
  overflow-y: scroll;
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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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

.delete-dropdown {
  position: relative;
  display: inline-block;
}

.delete-options {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 160px;
  right: 0;
  z-index: 10;
  margin-top: 0.5rem;
}

.delete-options button {
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.delete-options button:hover {
  background-color: #b52c2c;
  color: white;
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

.scan-alert {
  margin-top: 0.5rem;
  color: green;
  font-weight: 600;
}

.modal-details {
  flex: 1;
}

.add-produce-button {
  background-color: #354833;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin-right: 1rem;
}

.add-produce-button:hover {
  background-color: #445D41;
}
</style>