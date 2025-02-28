<template>
  <div class="container">
    <aside class="nav">
      <div class="logo">suppl.ai</div>
      <nav>
        <router-link to="/app/dashboard" class="nav-link">
          <span class="icon">🏠</span> DASHBOARD
        </router-link>
        <router-link to="/app/inventory" class="nav-link">
          <span class="icon">📦</span> INVENTORY
        </router-link>
        <router-link to="/app/produce" class="nav-link">
          <span class="icon">📦</span> PRODUCE
        </router-link>
        <router-link to="/app/employees" class="nav-link">
          <span class="icon">👤</span> EMPLOYEES
        </router-link>
      </nav>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
.container {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background-color: #354833;
}

/* Sidebar */
.nav {
  width: 220px;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #4a5a4a;
}

nav {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  font-size: 14px;
}

.nav-link:hover,
.router-link-active {
  background-color: #2f3e2f;
}

/* Main Content */
.content {
  flex: 1;
  padding: 20px;
  background: #f5f8f6;
  border-radius: 10px;
  margin: 20px;
}
</style>
