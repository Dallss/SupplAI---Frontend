<template>
  <div class="produce-container">
    <h1 class="title">Produce</h1>
    <p class="subtitle">View and manage your produce.</p>
    <div class="grid">
      <div v-for="item in produce" :key="item.id" class="grid-item">
        <img :src="item.image" alt="Produce image" class="item-image" />
        <p class="item-name">{{ item.name }}</p>
      </div>
      <div class="grid-item add-button" @click="addItem">
        <span>+</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      produce: [
        { id: 1, name: 'Apple', image: 'https://via.placeholder.com/80' },
        { id: 2, name: 'Banana', image: 'https://via.placeholder.com/80' },
        { id: 3, name: 'Carrot', image: 'https://via.placeholder.com/80' },
        { id: 4, name: 'Tomato', image: 'https://via.placeholder.com/80' },
      ],
    }
  },
  methods: {
    addItem() {
      alert('Add new produce item')
    },
  },
}
</script>

<style scoped>
.produce-container {
  padding: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.subtitle {
  margin-bottom: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
.grid-item {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
.item-name {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
}
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  border: 2px dashed #ccc;
}
.add-button:hover {
  background: #eaeaea;
}
</style>
