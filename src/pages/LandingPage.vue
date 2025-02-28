<template>
  <div class="container">
    <img src="@/assets/landing_bg.png" alt="" class="bg" />
    <div class="section home" id="home">
      <div class="nav">
        <img src="@/assets/logo.png" alt="" class="nav-item logo" />
        <div class="nav-item"><a href="#our-cause">Our Cause</a></div>
        <div class="nav-item"><a href="#about-us">About Us</a></div>
        <div class="nav-item login" @click="showModal = true">Login</div>
      </div>
      <main>
        <div class="title">Sustainable <span class="future">Future</span></div>
        <div class="subheading">
          SuplAI helps you optimize your food supply, reduce waste, and save costs with smart
          tracking and real-time insights. Make every ingredient count—start managing smarter today
        </div>
        <h2 class="hook">
          Help us help you optimize your supply now - <a href="#" class="hook">Contact Us!</a>
        </h2>
      </main>
    </div>
    <div class="section our-cause" id="our-cause"></div>
    <div class="section about-us" id="about-us"></div>

    <!-- modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h2 class="modal-title">Login</h2>
        <input type="text" v-model="username" class="modal-input" placeholder="Username" />
        <input type="password" v-model="password" class="modal-input" placeholder="Password" />
        <div class="modal-actions">
          <button @click="login" class="modal-button modal-login">Login</button>
          <button @click="showModal = false" class="modal-button modal-cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      alert(`Logging in as ${this.username}`)
      this.showModal = false
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #354833;
}
.section {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.nav {
  display: flex;
  width: 100%;
  height: 10vh;
  min-height: 50px;
  align-items: center;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: auto;
  background: url('@/assets/bg-image.jpg') no-repeat center / cover;
}

.nav-item {
  display: flex;
  margin-left: 10px;
  color: black;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  font-weight: bold;
  cursor: pointer;
}

.logo {
  width: auto;
  height: 80px;
  margin: 2px;
}

.login {
  margin-left: auto;
  margin-right: 10px;
  color: black;
  padding-right: 3rem;
}

main {
  flex-grow: 1;
  width: 100%;
  justify-items: center;
}

.title {
  font-family: 'Poppins', sans-serif;
  font-size: 80px;
  margin-top: 15vh;
  color: #0f5519;
  font-weight: 1000;
}
.future {
  color: black;
  font-weight: 1000;
}

.subheading {
  font-size: large;
  width: 60vw;
  margin-top: 2vh;
  text-align: center;
  color: black;
}

.hook {
  width: 30vw;
  height: auto;
  margin-top: 5vh;
  text-align: center;
  color: #0f5519;
  font-weight: 800;
}

a.hook {
  color: #0f5519;
  font-weight: 800;
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;

}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.modal-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.modal-button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
}

.modal-login {
  background: #007bff;
  color: white;
}

.modal-login:hover {
  background: #0056b3;
}

.modal-cancel {
  background: #ccc;
  color: black;
}

.modal-cancel:hover {
  background: #999;
}
</style>
