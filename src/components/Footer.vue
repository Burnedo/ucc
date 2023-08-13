<template>
<div class="footer centered-content">
  <p>Organizator: </p>
  <img src="../assets/rra-logo.png" class="rra-logo" alt="Rally&Racing Army">
</div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer {
  color: #e0aa3e;
  background-color: #222;
  display: flex;
  justify-content: center;
  gap: 30px;
  line-height: 150px;
}
.footer p {
  margin: 0;
  padding: 0;
}
.rra-logo{
  height: 150px;
  width: 150px;
}
</style>
