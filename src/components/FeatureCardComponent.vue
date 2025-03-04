<template>
  <div class="feature-card">
    <div class="feature-header">
      <span class="feature-label">{{ label }}</span>
    </div>
    <p class="feature-text">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  text: string
}>()
</script>
<style scoped>
.feature-card {
  background-color: #81907f;
  border-radius: 1rem;
  padding: 2rem;
  width: 20%;
  position: relative;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.feature-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.feature-label {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-align: center;
}

.feature-text {
  font-size: 0.9rem;
  text-align: center;
  align-items: center;
  color: white;
}
</style>
