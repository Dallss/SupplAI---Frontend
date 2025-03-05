<template>
  <div class="container">
    <aside class="nav" v-if="$route.path !== '/app/camera'">
      <div class="logo">
        <img src="@/assets/logo-white.svg" alt="suppl.ai logo">
      </div>
      <nav>
        <router-link to="/app/dashboard" class="nav-link">
          <Feather type="home" /> DASHBOARD
        </router-link>
        <router-link to="/app/inventory" class="nav-link">
          <Feather type="package" /> INVENTORY
        </router-link>
        <router-link to="/app/produce" class="nav-link">
          <Feather type="archive" /> PRODUCE
        </router-link>
        <router-link to="/app/employees" class="nav-link">
          <Feather type="users" /> EMPLOYEES
        </router-link>

      </nav>
    </aside>

    <main class="content" >
      <router-view />
    </main>
  </div>
</template>

<script>
import Feather from 'vue-feather';

export default {
  components: {
    Feather,
  },
};
</script>


<style scoped>

.logo{
  width: 200px;
  height: 150px;
  margin-top: -50px;
  overflow: hidden;
  position: relative;
}

.logo img {
  width: 200px;
  padding: 0;
  margin: 0 auto;
}

.icon {
  color: white;
  width: 24px;
  height: 24px;
}

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
  gap: 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 20px;
  padding-left: 30px;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 200px;
  /* width: fit-content; */
}

.nav-link:hover,
.router-link-active {
  background-color: #2f3e2f;
  border-radius: 30px;
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
