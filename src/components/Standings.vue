<template>
  <div>
    <table class="standings" cellpadding="0" cellspacing="0"  v-if="standings.length > 0">
      <thead>
        <tr>
          <th>Miejsce</th><th>Zawodnik</th><th>Suma punktów</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in standings" v-bind:key="index" :class="{'final-cut': finalCutAfter === index}">
          <td>{{index+1}}</td>
          <td>{{row.name}}</td>
          <td>{{row.points}}</td>
        </tr>
      </tbody>
    </table>
    <div class="loader-wrapper" v-if="standings.length===0">
      <div class="custom-loader" ></div>
    </div>

  </div>
</template>

<script>
const standingsDataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRHzb0leAmf9tV52tTmn4HbpaEK5PdL7ST_SpzPzX-qf-kX2ViNAb-oQP9sdgBsFFxGeIAgz49pZS1/pub?gid=964342982&single=true&output=csv'

export default {
  name: "Standings",
  data: () => {
    return {
      standings: [],
      finalCutAfter: 9,
    }
  },
  methods: {
    calcCut(current) {
      if (this.standings[current].points === 0 || current === 15 || this.standings[current+1].points < this.standings[current].points) {
        this.finalCutAfter = current
        return;
      }
      if (this.standings[current+1].points === this.standings[current].points) {
        this.calcCut(current+1)
      }
    },
  },
  async mounted() {
    const res = await fetch(standingsDataUrl)
    const data = await res.text()
    this.standings = data.split('\r\n').map(row => {
      const [name, points] = row.split(',')
      return {
        name,
        points: parseInt(points)
      }
    })
    this.calcCut(9)
  }
}
</script>

<style scoped>
.standings {
  width: 100%;
}
.standings th {
  text-align: left;
  padding: 10px;
  background-color: rgba(255,255,255, 0.1);
  font-weight: normal;
  color: #e0aa3e;
}

.standings td {
  padding: 5px 10px;
  background-color: rgba(255,255,255, 0.2);
  transition: all .3s ease-in-out;
}

.standings tr:nth-child(even) td {
  background-color: rgba(255,255,255, 0.3);
}

.standings tr:first-child td {
  font-size: 1.4em;
  background-color: gold;
  color: black;
}

.standings tr:nth-child(2) td {
  font-size: 1.3em;
  background-color: silver;
  color: black;
}

.standings tr:nth-child(3) td {
  font-size: 1.2em;
  background-color: #CD7F32;
  color: black;
}

.standings tr:hover td {
  background-color: rgba(224, 170, 62, 1);
  color: black;
}

.loader-wrapper {
  height: 100px;
}

.custom-loader {
  margin: 0 auto;
  --c:linear-gradient(#e0aa3e 0 0);
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

.final-cut {
  position: relative;
}

.final-cut td {
  position: relative;
  padding-bottom: 13px;
}
.final-cut:after {
  content: 'Cut';
  position: absolute;
  font-size: 8px;
  bottom: -1px;
  left: 10px;
}
.final-cut td::after {
  content: '';
  display: block;
  position: absolute;
  background-color: #aa0000;
  color: white;
  height: 8px;
  bottom: 0;
  left: 0;
  width: 100%;
}

@keyframes sh2-1 {
  0%,100% {width:45px;height: 45px}
  35%,65% {width:65px;height: 65px}
}

@keyframes sh2-2 {
  0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
  60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
}

</style>
