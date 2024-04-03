<template>
  <div class="home">
    <div class="desc">
      <h2>Sezon II</h2>
      <p>
        Used Car Cup to zawody samochodów używanych otwarte dla wszystkich graczy Gran Turismo 7.
      </p>
      <p>Już wiosną 2024 rozpocznie się drugi sezon UCC. <a href="https://discord.gg/a9WHznqtEf">Dołącz do discord UCC</a>, po więcej informacji</p>
    </div>

    <div class="video">
      <iframe class="trailer" src="https://www.youtube.com/embed/IhJpXW8GX-I?si=TaurJ-8k64Hu5217&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div class="desc">
      <h2>Sezon I</h2>
      <p>Tak było...</p>
    </div>
    <div class="video">
      <iframe class="trailer" src="https://www.youtube.com/embed/5_0S4yr9EyU?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div class="video">
      <iframe class="trailer" src="https://www.youtube.com/embed/fptAno3pdY0?si=AlFLVDhkHwQlRRUy&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
.desc {
  text-align: left;
  padding: 0 0 40px;
}
.video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.trailer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
li {
  line-height:30px;
}
</style>
