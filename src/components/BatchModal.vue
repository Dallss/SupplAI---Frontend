<script setup lang="ts">
import { ref } from 'vue'
import SelectProduceModal from "@/components/SelectProduceModal.vue"

interface Produce {
  name: string;
  stock: number;
}

interface ProduceOption {
  id: number;
  name: string;
}

const props = defineProps<{
  batchNumber: number;
  produceOptions: ProduceOption[];
}>();

const emit = defineEmits(['close', 'add-batch']);

const produces = ref<Produce[]>([]);
const showSelectProduceModal = ref(false);

const addProduce = (produceName: string) => {
  produces.value.push({ name: produceName, stock: 0 });
};

const submitBatch = () => {
  const validProduces = produces.value.filter(p => p.name.trim() !== '');

  if (validProduces.length === 0) {
    alert('Please add at least one produce item');
    return;
  }

  emit('add-batch', validProduces);
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

<template>
  <div class="modal-backdrop" @click="emit('close')">
    <div class="modal-content" @click.stop>
        <div class="modal-header">
            <h2>Batch #{{ batchNumber }}</h2>
            <button class="close-button" @click.stop="emit('close')">&times;</button>
        </div>

      <div class="modal-body">
        <div class="produces-container">
          <div 
            v-for="(produce, index) in produces" 
            :key="index" 
            class="produce-item"
          >
            <div class="produce-card">
              <input 
                type="text" 
                v-model="produce.name" 
                placeholder="Produce name"
                readonly
              />
              <div class="stock-label">Stock:</div>
              <input 
                type="number" 
                v-model="produce.stock" 
                min="0"
              />
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
    :show="showSelectProduceModal" 
    :produceOptions="produceOptions" 
    @close="closeSelectProduceModal" 
    @select-produce="handleSelectProduce" 
  />
</template>

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
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stock-label {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: black;
}

.add-produce-card {
  border: 1px dashed #aaa;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  height: 150px;
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

input[type="number"] {
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  text-align: center;
}
</style>