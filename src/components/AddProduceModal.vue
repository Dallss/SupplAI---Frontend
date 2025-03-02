<template>
    <div class="modal-backdrop" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Add Produce</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="produce">Select Produce:</label>
            <select v-model="selectedProduce" id="produce">
              <option v-for="produce in produceOptions" :key="produce.id" :value="produce.name">
                {{ produce.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="stock">Stock Quantity:</label>
            <input type="number" v-model="stockQuantity" id="stock" min="1" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="confirm-button" @click="addProduce">Add</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface ProduceOption {
    id: number;
    name: string;
  }
  
  const props = defineProps<{
    show: boolean;
    produceOptions: ProduceOption[];
  }>();
  
  const emit = defineEmits(['close', 'add-produce']);
  
  const selectedProduce = ref('');
  const stockQuantity = ref(1);
  
  const closeModal = () => {
    emit('close');
  };
  
  const addProduce = () => {
    if (selectedProduce.value && stockQuantity.value > 0) {
      emit('add-produce', { name: selectedProduce.value, stock: stockQuantity.value });
      closeModal();
    }
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
    max-width: 400px;
    padding: 1rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
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
    padding: 1rem 0;
  }
  
  .form-group {
    color:black;
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  select,
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
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