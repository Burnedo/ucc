<template>
  <div class="header">
    <router-link to="/" class="home-link">
      <img class="main-logo" alt="Used Car Cup" src="./../assets/ucc-logo.png">
    </router-link>
    <div class="nav">
<!--      <router-link to="/klasyfikacja">Klasyfikacja</router-link>-->
<!--      <router-link to="/zasady">Zasady</router-link>-->
<!--      <router-link to="/tory">Pula torów</router-link>-->
<!--      <router-link to="/nagrody">Nagrody 🏆</router-link>-->
      <router-link to="/kombo">Kombo</router-link>
      <router-link to="/pogoda">Pogoda</router-link>
      <router-link to="/sezon-1">Sezon I</router-link>
    </div>
    <div class="cta">
      <div class="discord">
        <a href="https://discord.gg/a9WHznqtEf" title="Dołącz do serwera UCC">
          <img src="./../assets/discord-mark-white.png" alt="Discord UCC">
        </a>
      </div>
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
  line-height: 20px;
}

.nav a:first-child {
  border-left: 1px solid #e0aa3e;
}

.discord a {
  display: block;
  width: 50px;
}
.discord a img {
  width: 50px;
}

.cta {
  display: flex;
  gap: 20px;
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
