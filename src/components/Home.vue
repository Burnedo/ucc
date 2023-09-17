<template>
  <div class="home">
    <div class="desc">
      <p>
        Used Car Cup to zawody samochodów używanych otwarte dla wszystkich graczy Gran Turismo 7.
      </p>
      <p>Rozegrane zostanie 7 rund. W każdej rundzie zostanie wylosowany inny samochód używany, jeden tor z puli oraz pogoda.</p>
      <p>Start zawodów 03.10.2023</p>
      <ul>
        <li>
          <a href="https://discord.gg/a9WHznqtEf">dołącz do discord UCC</a>
        </li>
      </ul>
    </div>
    <div class="video">
      <iframe class="trailer" src="https://www.youtube.com/embed/5_0S4yr9EyU?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
