<template>
  <div class="container">
    <div class="section home" id="home">
      <div class="nav">
        <div class="nav-item">Logo</div>
        <div class="nav-item"><a href="#our-cause">Our Cause</a></div>
        <div class="nav-item"><a href="#about-us">About Us</a></div>
        <div class="nav-item login">Login</div>
      </div>
      <main>
        <div class="title"></div>
        <div class="subheading">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia aliquid vel laudantium
          reiciendis perferendis nobis qui architecto. Impedit natus praesentium commodi! Itaque ab
          molestiae nostrum saepe, maiores soluta fuga libero.
        </div>
        <div class="hook">
          <h2>Help us help you optimize your supply now - <a>Contact Us!</a></h2>
        </div>
      </main>
    </div>
    <div class="section our-cause" id="our-cause"></div>
    <div class="section about-us" id="about-us"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: rgb(106, 206, 106);
}
.section {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
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

.nav-item {
  display: flex;
  margin-left: 10px;

  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  font-weight: bold;
  cursor: pointer;
}

.login {
  margin-left: auto;
  margin-right: 10px;
}

main {
  flex-grow: 1;
  border: 1px solid red;
  width: 100%;
  justify-items: left;
}

main > div {
  margin-left: 6vw;
}
.title {
  height: 40vh;
  width: 50vw;
  border: 1px solid blue;
  margin-top: 5vh;
}

.subheading {
  width: 60vw;
  border: 1px solid yellow;
  margin-top: 5vh;
  text-align: center;
}

.hook {
  width: 40vw;
  border: 1px solid purple;
  margin-top: 5vh;
  text-align: center;
}
</style>
