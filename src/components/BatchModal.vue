<template>
  <div class="modal-backdrop" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Batch #{{ batchNumber }}</h2>
        <button class="close-button" @click="emit('close')">&times;</button>
      </div>

      <div class="modal-body">
        <div class="batch-manager-section">
          <label for="batch-manager">Batch Manager:</label>
          <select id="batch-manager" v-model="selectedBatchManager" class="select-style">
            <option value="" disabled selected>Select Batch Manager</option>
            <option v-for="(manager, index) in batchManagers" :key="index" :value="manager">
              {{ manager }}
            </option>
          </select>
        </div>

        <div class="produces-container">
          <div 
            v-for="(produce, index) in produces" 
            :key="index" 
            class="produce-item"
          >
            <div class="produce-card">
              <div class="produce-name">{{ produce.name }}</div>
              
              <div class="input-row">
                <div class="input-group">
                  <div class="label">Stock:</div>
                  <input 
                    type="number" 
                    v-model="produce.stock" 
                    class="stock-input"
                    min="0"
                  />
                </div>
                
                <div class="input-group">
                  <div class="label">Health:</div>
                  <select 
                    v-model="produce.health" 
                    class="health-select"
                  >
                    <option value="Fresh">Fresh</option>
                    <option value="Ripe">Ripe</option>
                    <option value="Overripe">Overripe</option>
                    <option value="Spoiled">Spoiled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="add-produce-card" @click="openSelectProduceModal">
            <div class="add-produce-content">
              <div>Add Produce</div>
              <div class="plus-icon">+</div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="confirm-button" @click="submitBatch">Confirm</button>
      </div>
    </div>
  </div>

  <SelectProduceModal 
    v-if="showSelectProduceModal"
    :show="showSelectProduceModal" 
    :produceOptions="produceOptions" 
    @close="closeSelectProduceModal" 
    @select-produce="handleSelectProduce" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectProduceModal from "@/components/SelectProduceModal.vue"

interface Produce {
  name: string;
  stock: number;
  health: string;
}

interface ProduceOption {
  id: number;
  name: string;
}

const props = defineProps<{
  show: boolean;
  batchNumber: number;
  produceOptions: ProduceOption[];
  batchManagers: string[];
}>();

const emit = defineEmits(['close', 'add-batch']);

const produces = ref<Produce[]>([]);
const showSelectProduceModal = ref(false);
const selectedBatchManager = ref<string>('');

const addProduce = (produceName: string) => {
  produces.value.push({ 
    name: produceName, 
    stock: 1,
    health: 'Fresh'
  });
};

const submitBatch = () => {
  const validProduces = produces.value.filter(p => p.name.trim() !== '');

  if (validProduces.length === 0) {
    alert('Please add at least one produce item');
    return;
  }

  if (!selectedBatchManager.value) {
    alert('Please select a batch manager');
    return;
  }

  emit('add-batch', {
    produces: validProduces,
    batchManager: selectedBatchManager.value
  });
};

const openSelectProduceModal = () => {
  showSelectProduceModal.value = true;
};

const closeSelectProduceModal = () => {
  showSelectProduceModal.value = false;
};

const handleSelectProduce = (produceName: string) => {
  addProduce(produceName);
  closeSelectProduceModal();
};
</script>

<style scoped>
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
}

.batch-manager-section {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: black;
}

.select-style {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  min-width: 200px;
}

.produces-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.produce-item, .add-produce-card {
  width: calc(50% - 0.5rem);
  min-width: 200px;
}

.produce-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.produce-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #3c4a3e;
}

.input-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.label {
  color: black;
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

.add-produce-card {
  border: 1px dashed #aaa;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.add-produce-card:hover {
  background-color: #f9f9f9;
}

.add-produce-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
}

.plus-icon {
  font-size: 2rem;
  margin-top: 0.5rem;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
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
</style>