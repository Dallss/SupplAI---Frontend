<template>
  <div class="produce-container">
    <h2>Produce</h2>
    <p>View and manage your produce.</p>
    <div class="produce-list">
      <div v-for="item in produceItems" :key="item.id" class="produce-item">
        <img :src="item.image" :alt="item.name" />
        <p>{{ item.name }}</p>
      </div>
      <button class="add-item">+</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import land from '@/assets/landing_bg.png'
import produceService from '@/api/produceService'

const produceItems = ref([{ id: 1, name: 'fetching', image: land }])

async function fetchProduce() {
  try {
    const data = await produceService.getAll()
    console.log(data.data)
    produceItems.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchProduce)
</script>

<style scoped>
.produce-container {
  padding: 20px;
  color: #333;
}

.produce-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.produce-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 120px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
}

.produce-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.add-item {
  width: 100px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 1px dashed #aaa;
  border-radius: 8px;
  background: #f8f8f8;
  cursor: pointer;
}
</style>
