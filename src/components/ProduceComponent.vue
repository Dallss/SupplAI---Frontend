<template>
  <div class="produce-container">
    <h1 class="produce-title">Produce</h1>
    <p class="produce-subtitle">View and manage your produce.</p>

    <div class="produce-list">
      <div v-for="item in produceItems" :key="item.id" class="produce-item">
        <img :src="item.image" :alt="item.name" />
        <p>{{ item.name }}</p>
      </div>
      <button class="add-item" @click="openModal">+</button>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Add new produce</h3>
      </div>

      <form @submit.prevent="addProduce" class="modal-body">
        <!-- Image Upload -->
        <div class="image-upload" @click="triggerFileInput">
          <p v-if="!newProduce.image">Upload Image</p>
          <img v-if="newProduce.imagePreview" :src="newProduce.imagePreview" alt="Preview" />
        </div>
        <input type="file" ref="fileInput" accept="image/*" @change="handleFileUpload" style="display: none" />

        <!-- Name Input -->
        <input type="text" v-model="newProduce.name" placeholder="Enter name" required />

        <!-- Produce Type Dropdown -->
        <select v-model="newProduce.type" required>
          <option disabled value="">Select Produce Type</option>
          <option v-for="type in produceTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>

        <!-- Buttons -->
        <div class="button-group">
          <button type="button" @click="closeModal">Cancel</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import land from '@/assets/landing_bg.png'
import produceService from '@/api/produceService'

const produceItems = ref([{ id: 1, name: 'fetching', image: land }])
const showModal = ref(false)
const newProduce = ref({ name: '', type: '', image: null, imagePreview: null })
const produceTypes = ref(['Fruit', 'Vegetable', 'Grain', 'Dairy', 'Meat'])
const fileInput = ref(null)

async function fetchProduce() {
  try {
    const data = await produceService.getAll()
    produceItems.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  newProduce.value = { name: '', type: '', image: null, imagePreview: null }
}

async function addProduce() {
  if (newProduce.value.name.trim() !== '' && newProduce.value.type) {
    try {
      const formData = new FormData()
      formData.append('name', newProduce.value.name)
      formData.append('type', newProduce.value.type.toLowerCase())

      if (newProduce.value.image instanceof File) {
        formData.append('image', newProduce.value.image)
      }

      const response = await produceService.addCustomProduce(formData)
      console.log('Response:', response)
      
      if (response.data) {
        produceItems.value.push(response.data)
      }
      
      closeModal()
    } catch (error) {
      console.error('Error adding produce:', error)
    }
  }
}

function triggerFileInput() {
  fileInput.value.click()
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    newProduce.value.image = file
    const reader = new FileReader()
    reader.onload = () => {
      newProduce.value.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }
}

onMounted(fetchProduce)
</script>

<style scoped>
/* No major changes in styles */
.produce-container {
  padding: 20px;
  color: #333;
}

.produce-title {
  font-size: 28px;
  font-weight: bold;
}

.produce-subtitle {
  margin-bottom: 20px;
  font-size: 16px;
}

.produce-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.produce-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 140px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
}

.produce-item img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 5px;
}

.add-item {
  width: 120px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  border: 1px dashed #aaa;
  border-radius: 8px;
  background: #f8f8f8;
  cursor: pointer;
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

.modal-header {
  background: #354833;
  color: white;
  padding: 12px 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-content {
  background: white;
  padding: 0;
  border-radius: 10px;
  text-align: left;
  width: 320px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Image Upload */
.image-upload {
  width: 100%;
  height: 150px; /* Adjust height */
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;
  background: #f9f9f9;
  overflow: hidden; /* Prevents overflow */
}

.image-upload img {
  max-width: 100%;  /* Ensures image fits within container */
  max-height: 100%; /* Ensures it does not exceed container */
  object-fit: contain; /* Keeps aspect ratio */
  border-radius: 5px; /* Optional: Adds rounded corners */
}

.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Input and Dropdown */
.modal-content input,
.modal-content select {
  padding: 10px;
  margin: 5px 0;
}

/* Button Group */
.button-group {
  display: flex;
  gap: 10px;
  width: 100%;
}

.button-group button {
  flex: 1;
  padding: 12px;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

/* Add Button */
.button-group button:last-child {
  background: #4b6747;
}

/* Cancel Button */
.button-group button:first-child {
  background: #3b3737;
}
</style>
