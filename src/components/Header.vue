<template>
  <div class="header">
    <router-link to="/" class="home-link">
      <img class="main-logo" alt="Used Car Cup" src="./../assets/ucc-logo.png">
    </router-link>
    <div class="nav">
      <router-link to="/zasady">Zasady</router-link>
      <router-link to="/tory">Pula torów</router-link>
    </div>
    <div class="cta">
      <a href="https://forms.gle/8SPyQeJX2J9ZgGjL8" class="register btn" title="Zapisy poprzez Google Forms">Zapisz się</a>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header {
  justify-content: center;
  padding-bottom: 20px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
}
.home-link {
  display: block;
}

.main-logo {
  height: 50px;
}

.nav {
  display: flex;
}

.nav a {
  color: #e0aa3e;
  text-decoration: none;
  height: 20px;
  margin: 10px 0;
  padding: 0 20px;
  display: block;
  border-right: 1px solid #e0aa3e;
}

.nav a:first-child {
  border-left: 1px solid #e0aa3e;
}

@media (min-width: 750px) {
  .header {
    padding-bottom: 50px;
    justify-content: space-between;
    gap: 0;
  }
  .main-logo {
    height: 75px;
  }
}

</style>
