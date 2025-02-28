<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface ProduceOption {
  id: number;
  name: string;
}

const props = defineProps<{
  show: boolean;
  produceOptions: ProduceOption[];
}>();

const emit = defineEmits(['close', 'select-produce']);

const selectedProduce = ref<string | null>(null);

const confirmSelection = () => {
  if (selectedProduce.value) {
    emit('select-produce', selectedProduce.value);
    emit('close');
  } else {
    alert('Please select a produce');
  }
};
</script>

<template>
  <div v-if="show" class="modal-backdrop" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Select Produce</h2>
        <button class="close-button" @click="emit('close')">&times;</button>
      </div>

      <div class="modal-body">
        <div>
          <label for="produce-select">Produce:</label>
          <select class="select_style" id="produce-select" v-model="selectedProduce">
            <option value="" disabled selected>Select Produce</option>
            <option v-for="produce in produceOptions" :key="produce.id" :value="produce.name">
                {{ produce.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="modal-footer">
        <button class="confirm-button" @click="confirmSelection">Confirm</button>
      </div>
    </div>
  </div>
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
  max-width: 400px;
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

.select_style {
  padding-left: 2rem;
}

.modal-body {
  padding: 1rem;
  color: black;
  gap: 1rem;
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