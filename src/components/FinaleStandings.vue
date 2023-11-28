<template>
  <div class="finale">
    <div class="table-wrapper">
      <table class="standings" cellpadding="0" cellspacing="3">
        <thead>
        <tr>
          <th>miejsce</th><th>zawodnik</th><th>dzień</th><th>wyścigi</th><th>kwalifikacje</th><th>generalna</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td class="name">76 - St4ch4L2R2</td>
          <td class="round-pt d-s">sobota</td>
          <td class="round-pt">150</td>
          <td class="round-pt">122</td>
          <td class="total-pt">272</td>
        </tr>
        <tr>
          <td>2</td>
          <td class="name">7 - PetrolheadGTS</td>
          <td class="round-pt d-t">wtorek</td>
          <td class="round-pt">140</td>
          <td class="round-pt">111</td>
          <td class="total-pt">251</td>
        </tr>
        <tr>
          <td>3</td>
          <td class="name">187 - SRC_KamcioGT</td>
          <td class="round-pt d-t">wtorek</td>
          <td class="round-pt">116</td>
          <td class="round-pt">114</td>
          <td class="total-pt">230</td>
        </tr>
        <tr>
          <td>4</td>
          <td class="name">88 - ATR_R440FORCE</td>
          <td class="round-pt d-t">wtorek</td>
          <td class="round-pt">110</td>
          <td class="round-pt">96</td>
          <td class="total-pt">206</td>
        </tr>
        <tr>
          <td>5</td>
          <td class="name">9 - bati-123a</td>
          <td class="round-pt d-s">sobota</td>
          <td class="round-pt">80</td>
          <td class="round-pt">94</td>
          <td class="total-pt">174</td>
        </tr>
        <tr>
          <td>6</td>
          <td class="name">77 - kotinek123</td>
          <td class="round-pt d-s">sobota</td>
          <td class="round-pt">70</td>
          <td class="round-pt">65</td>
          <td class="total-pt">135</td>
        </tr>
        <tr>
          <td>7</td>
          <td class="name">74 - Oskar.74</td>
          <td class="round-pt d-s">sobota</td>
          <td class="round-pt">71</td>
          <td class="round-pt">57</td>
          <td class="total-pt">128</td>
        </tr>
        <tr>
          <td>8</td>
          <td class="name">8 - Kaperczynsky_</td>
          <td class="round-pt d-t">wtorek</td>
          <td class="round-pt">57</td>
          <td class="round-pt">62</td>
          <td class="total-pt">119</td>
        </tr>
        <tr>
          <td>9</td>
          <td class="name">69 - RallyChair20</td>
          <td class="round-pt d-s">sobota</td>
          <td class="round-pt">60</td>
          <td class="round-pt">49</td>
          <td class="total-pt">109</td>
        </tr>
        <tr>
          <td>10</td>
          <td class="name">5 - muniestafiesta</td>
          <td class="round-pt d-s">sobota</td>
          <td class="round-pt">61</td>
          <td class="round-pt">43</td>
          <td class="total-pt">104</td>
        </tr>
        <tr>
          <td>11</td>
          <td class="name">16 - ATR_klawymichal</td>
          <td class="round-pt d-t">wtorek</td>
          <td class="round-pt">55</td>
          <td class="round-pt">49</td>
          <td class="total-pt">104</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ucc-logo"></div>
  </div>
</template>

<style scoped>
.finale {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  background-image: url('~@/assets/finale-standings.jpg');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
}

.table-wrapper {
  margin: 5vh auto;
  width: 50vw;
}

.standings {
  width: 100%;
}
.standings th {
  font-family: 'Titillium Web', sans-serif;
  font-style: italic;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  background: none;
  color: black;
  font-size: 1.3em;
}

.standings td {
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  color: white;
  text-shadow: #000 3px 2px 2px;
  font-size: 1.3em;
  padding: 5px 10px;
  background-color: rgba(0,0,0, 0.6);
  transition: all .3s ease-in-out;
}

.standings td.round-pt {
  font-size: 1em;
}

.standings td.name,
.standings td.total-pt {
  font-weight: 600;
  color: #ffd685;
}

.standings td.d-s {
  color: #bb32ac;
}
.standings td.d-t {
  color: #00bacc;
}

.standings tr:nth-child(even) td {
  background-color: rgba(0,0,0, 0.7);
}

.loader-wrapper {
  height: 300px;
}

.custom-loader {
  margin: 15vh auto 0;
  --c:linear-gradient(black 0 0);
  background:
      var(--c),
      var(--c),
      var(--c),
      var(--c),
      var(--c),
      var(--c),
      var(--c),
      var(--c),
      var(--c);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  animation:
      sh2-1 1s infinite,
      sh2-2 1s infinite;
}

@keyframes sh2-1 {
  0%,100% {width:45px;height: 45px}
  35%,65% {width:65px;height: 65px}
}

@keyframes sh2-2 {
  0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
  60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
}

.ucc-logo {
  display:block;
  position: absolute;
  background-image:url('~@/assets/ucc-logo.png');
  width: 250px;
  height: 135px;
  background-size: contain;
  background-repeat:no-repeat;
  bottom: 5%;
  right: 5%;
}
</style>
