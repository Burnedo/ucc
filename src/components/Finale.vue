<template>
  <div class="finale">
    <div class="table-wrapper">
      <table class="standings" cellpadding="0" cellspacing="3"  v-if="standings.length > 0">
        <thead>
        <tr>
          <th>miejsce</th><th>zawodnik</th><th>wyścig 1</th><th>wyścig 1</th><th>wyścig 2</th><th>suma</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) in standings" v-bind:key="index">
          <td>{{row.place}}</td>
          <td class="name">{{row.name}}</td>
          <td class="round-pt">{{row.r1}}</td>
          <td class="round-pt">{{row.r2}}</td>
          <td class="round-pt">{{row.r3}}</td>
          <td class="total-pt">{{row.total}}</td>
        </tr>
        </tbody>
      </table>
      <div class="loader-wrapper" v-if="standings.length===0">
        <div class="custom-loader" ></div>
      </div>
    </div>
    <div class="ucc-logo"></div>
  </div>
</template>

<script>
const finaleStandingsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSe6u5YuAOpt5mqodIGhd6cubkZa_hUmUA09Uttj2R8lzBq_K3fwkvkXwtPq2hQiMdccAwbAP2n5Hgc/pub?gid=964342982&single=true&output=csv'

export default {
  data: () => {
    return {
      standings: [],
    }
  },
  methods: {

  },
  async mounted() {
    const res = await fetch(finaleStandingsUrl)
    const data = await res.text()
    this.standings = data.split('\r\n').map(row => {
      const [place, name, r1, r2, r3, total] = row.split(',')
      return {
        place,
        name,
        r1,
        r2,
        r3,
        total
      }
    })
    console.log(this.standings)
  }
}
</script>

<style scoped>
.finale {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  background-image: url('~@/assets/finale-bg-beta.jpg');
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
  font-weight: 300;
  text-align: center;
  padding: 10px;
  background: none;
  color: black;
  font-size: 1.2em;
}

.standings td {
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  color: white;
  text-shadow: #000 3px 2px 2px;
  font-size: 1.3em;
  padding: 5px 10px;
  background-color: rgba(0,0,0, 0.4);
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

.standings tr:nth-child(even) td {
  background-color: rgba(0,0,0, 0.5);
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
