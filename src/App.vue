<template>
  <div class="top-level-content-wrapper">
    <div class="centered-content main-bg">
      <Header />
      <div class="routes">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from "@/components/Footer.vue";

export default {
  name: 'app',
  components: {
    Footer,
    Header,
  }
}
</script>

<style>
a {
  color: #e0aa3e;
}

a.btn {
  display: block;
  text-decoration: none;
  height: 20px;
  background-color: #e0aa3e;
  padding:10px 20px;
  box-shadow: 3px 4px 0 #000;
  color: #000;
  font-weight: 600;
  line-height: 20px;
}
body {
  background-color: #222222;
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-bg {
  background-color: #393939;
  color: #fff;
}
.centered-content {
  margin: 0 auto;
  max-width: 1200px;
  padding:50px;
}
</style>
