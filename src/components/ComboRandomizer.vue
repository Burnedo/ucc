<template>
<div>
  <div class="combo">
    <div class="actions">
      <button @click="toggleConfig()">{{configButtonText}}</button>
      <button class="randomize-button" @click="randomize()" :disabled="loading">Losuj kombo</button>
    </div>
    <div class="result" v-html="readableResult" v-if="!loading"></div>
    <div class="config" v-if="showConfig">
      <div class="config-info">
        <div class="min-pp">
          <p>
            PP min: <input type="range" v-model.number="minPP" min="0" max="700" @change="fixPPs()" /><input readonly type="number" v-model="minPP" />
          </p>
          <p>
            PP slow/mid: <input type="range" v-model.number="maxPPSlow" :min="minPP + 1" max="800" @change="fixPPs()" /><input readonly type="number" v-model="maxPPSlow" />
          </p>
          <p>
            PP mid/fast: <input type="range" v-model.number="maxPPMid" :min="maxPPSlow + 1" max="900" @change="fixPPs()" /><input readonly type="number" v-model="maxPPMid" />
          </p>
          <p>
            PP max: <input type="range" v-model.number="maxPP" :min="maxPPMid + 1" max="1000" @change="fixPPs()" /><input readonly type="number" v-model="maxPP" />
          </p>
          <p>
            Max Cena: <input type="range" v-model.number="maxPrice" min="50000" max="20000000" /><input readonly type="number" v-model="maxPrice" />
          </p>
          <p>
            Szansa na legendy <input type="range" v-model.number="legendChance" min="0" max="100" @change="fixChances('legend')" /><input readonly type="number" v-model="legendChance" />
          </p>
          <p>
            Szansa na używane <input type="range" v-model.number="usedChance" min="0" max="100" @change="fixChances('used')" /><input readonly type="number" v-model="usedChance" />
          </p>
          <p>
            Szansa na nowe <input readonly type="number" v-model="newChance" />
          </p>
        </div>
      </div>
    </div>
    </div>

</div>
</template>

<script>
import {groupRawData} from "@/groupRawData";

const ppRawData = [["1027",463.8],["1040",672.31],["1044",306.79],["104",473.84],["105",597.36],["1067",788.45],["1069",806.48],["135",344.61],["1365",556.56],["1370",453.18],["1373",558.07],["1378",592.18],["137",359.7],["1384",516.7],["1385",412.32],["1399",536.27],["1402",573.2],["1409",597.31],["1410",551.33],["1425",677.34],["1426",600.07],["1431",566.38],["1433",651.17],["1448",489.46],["1458",515.65],["145",338.5],["1461",451.43],["1466",720.53],["1470",658.85],["1474",651.87],["1480",608.44],["1481",548.39],["1484",568.4],["1504",612.74],["1507",585.75],["1508",505.53],["1510",720.65],["1516",716.48],["1523",161.75],["1527",321.92],["1528",596.8],["1536",700.98],["1537",413.8],["1539",539.48],["1540",640.96],["1542",494.61],["1543",501.4],["1545",604.24],["1549",567.05],["1551",647.87],["1553",618.53],["1563",602.71],["1565",622.25],["1578",553.6],["1581",597.23],["1582",579.89],["1645",503.44],["1646",819.77],["1671",193.04],["1689",541.13],["1722",619.65],["1729",484.05],["173",454.77],["1746",526.78],["1770",622.85],["1773",502.87],["1778",259.09],["1796",464.91],["1797",669.23],["187",562.69],["1893",534.5],["1895",492.51],["1896",536.57],["1898",628.64],["1900",462.35],["1902",656.06],["1904",636.2],["1905",649.58],["1907",589.61],["1916",570.92],["1925",507.66],["1926",562.08],["1927",617.34],["1931",518.79],["1932",332.17],["1933",436.65],["1935",573.87],["1956",598.28],["1965",784.92],["1973",420.08],["1975",511.11],["1984",687.17],["1985",448.16],["1986",400.11],["1987",498.65],["1990",598.72],["2010",548.97],["2011",486.02],["2017",570.49],["2018",549.73],["201",416.25],["2026",391.17],["203",475.42],["2049",653.63],["204",454.57],["2050",674.78],["2051",513.2],["2055",635.04],["2059",537.23],["205",518.18],["2074",557.79],["2076",665.33],["2077",966.69],["2078",614.09],["207",498.12],["2080",598.23],["2087",658.22],["2095",620.53],["2098",647.87],["2099",675.11],["2101",797.79],["2103",643.32],["2106",689.64],["2107",971.28],["2108",1288.68],["2109",596.7],["210",517.83],["2110",1087.13],["2111",933.96],["2112",661.64],["2113",707.32],["2116",687.49],["2117",633.75],["2118",853.48],["2119",738.69],["211",500.39],["2120",736.49],["2121",651.83],["2122",645.15],["2123",744.78],["2124",648.75],["2127",807.1],["2131",660.68],["2134",855.07],["2135",868.67],["2136",524.46],["2138",537.26],["2139",548.78],["2141",477.52],["2142",668.24],["2143",679.11],["2144",430.32],["2145",491.6],["2146",569.02],["2147",672.1],["2148",431.22],["2149",592.04],["2150",511.89],["2152",596.7],["2153",495.88],["2154",456.33],["2155",456.88],["2156",569.15],["2157",578.67],["2158",667.12],["2159",647.16],["2160",651.8],["2161",577.14],["2162",699.41],["2163",572.53],["2164",570.93],["2166",559.88],["2167",588.71],["2169",530.43],["216",739.66],["2170",518.55],["2171",625.48],["2172",474.22],["2173",416.19],["2174",629.76],["2175",552.05],["2176",443.36],["2177",676.77],["2178",551.18],["2179",821.62],["2180",812.72],["2181",823.31],["2182",653.26],["2183",660.85],["2184",659.67],["2185",664.25],["2186",661.55],["2187",653.19],["2188",659.39],["2190",681.33],["2192",645.59],["24",469.14],["293",528.14],["296",766.55],["301",490.84],["315",596.38],["3183",645.12],["3185",651.07],["3187",811.37],["3188",817.27],["3192",579.66],["31",489.72],["3209",557.8],["3210",587.68],["3214",515.61],["3215",473.67],["3216",668.96],["3217",550.54],["3218",661.73],["3219",584.48],["3220",488.11],["3221",662.16],["3222",468.28],["3223",688.21],["3224",675.93],["3225",590.88],["3227",547.82],["3228",645.25],["3229",589.52],["3230",597.84],["3231",588.92],["3232",597.65],["3234",593.83],["3235",658.13],["3237",645.86],["3238",660.69],["3239",605.93],["3241",597.47],["3242",601.39],["3245",561.33],["3246",566.93],["3247",585.58],["3248",586.45],["3249",585.21],["3251",580.29],["3252",576.14],["3253",589.25],["3254",572.69],["3256",563.12],["3257",574.08],["3258",569.6],["3259",565.53],["3260",583.58],["3261",576.87],["3262",573.32],["3263",572.03],["3264",614.68],["3265",606.47],["3266",410.31],["3267",637.13],["3268",611.72],["3295",461.65],["3296",573.8],["3297",618.19],["3298",570.49],["3299",566.36],["3300",570.54],["3301",556.09],["3303",556.62],["3304",576.37],["3305",677.21],["3306",572.82],["3309",693.82],["3310",582.39],["3311",653.85],["3312",808.6],["3313",815.25],["3314",821.4],["3315",861.08],["3316",494.28],["3332",649.57],["3333",820.3],["3334",809.38],["3335",806.45],["3336",469.03],["3337",517.88],["3338",616.16],["3339",613.6],["3340",647.29],["3341",515.83],["3342",855.18],["3343",577.28],["3344",475.33],["3345",603.33],["3346",630.69],["3348",764.41],["3349",762.73],["334",487.82],["3350",763.4],["3351",771.75],["3352",673.7],["3353",484.37],["3354",456.41],["3356",327.38],["3357",360.45],["3358",548.92],["3359",573.44],["3360",728.76],["3361",489.7],["3362",610.03],["3363",531.85],["3364",532.24],["3365",419.41],["3367",536.32],["3368",462.88],["3369",551.27],["3370",377.16],["3371",869.11],["3372",869.11],["3373",771.24],["3374",868.24],["3375",405.3],["3376",542.08],["3377",486.25],["3383",366.96],["3384",489.96],["3385",524.96],["3387",604.64],["3388",517.99],["3389",519.31],["3390",600.84],["3391",571.3],["3392",641.14],["3393",623.36],["3394",657.76],["3396",746.28],["3397",737.34],["3398",639.23],["3399",579.11],["3400",633.99],["3401",503.52],["3402",625.5],["3403",394.72],["3404",529.59],["3405",676.11],["3406",595.87],["3407",499.17],["3408",502.16],["3409",608.45],["3410",683.9],["3411",580.88],["3413",460.66],["3414",778.08],["3415",434.95],["3416",601.55],["3417",931.2],["3418",544.6],["3419",669.74],["3420",521.21],["3421",463.21],["3422",464.37],["3423",527.69],["3426",638.05],["3427",491.23],["3428",412.83],["3429",447.07],["3430",257.04],["3431",520.29],["3432",491.59],["3433",711.96],["3434",540.51],["3436",659.73],["3437",537.45],["3438",247.23],["3439",530.22],["3441",482.94],["3442",346.64],["3443",520.04],["3444",456.16],["3445",487.82],["3446",453.22],["3449",627.17],["3450",657.12],["3451",504.79],["3452",741.08],["3453",469.95],["3454",455.06],["3456",436.1],["3457",596.97],["3458",568.26],["3459",665.2],["345",510.14],["3462",501.82],["3464",477.43],["3466",474.99],["3467",523.94],["3469",664.01],["3471",483.89],["3473",696.39],["3474",671.72],["3475",823.4],["3476",579.94],["3477",588.86],["3478",737.58],["3479",738.21],["3480",595.08],["3481",489.49],["3483",543.59],["3485",635.9],["3487",497.21],["3488",570.2],["3489",514.12],["3490",530.41],["3493",635.35],["3494",427.88],["3495",618.92],["3496",557.45],["3497",544.37],["3498",601.57],["3499",790.53],["3500",505.53],["3501",589.51],["3502",652.4],["3503",669.68],["3504",541.3],["3505",537.45],["3506",489.23],["3507",731.05],["3508",648.91],["3509",498.08],["3510",865.69],["3511",780.34],["3512",434.38],["3513",472.22],["3514",366.23],["3515",789.8],["3517",868.24],["3518",585.55],["3519",557.63],["3521",434.53],["3522",640.93],["3523",744.14],["3524",508.44],["3525",565.24],["3528",867.17],["3529",867.17],["3530",381.3],["3531",682.03],["3532",798.07],["3533",620.95],["3534",280.32],["3535",513.62],["365",610.28],["374",473.11],["379",494.11],["387",458.73],["396",533.73],["41",522.44],["451",502.01],["485",658.07],["489",510.49],["48",440.49],["514",492.89],["533",497.75],["543",592.63],["604",445.5],["63",409.31],["665",500.64],["688",473.49],["709",490.72],["773",506.4],["779",339.1],["781",531.74],["78",470.56],["808",726.65],["810",409.07],["818",522.23],["821",452.86],["829",451.96],["82",511.59],["836",425.23],["837",431.81],["843",486.88],["919",413.41],["931",489.87],["942",530.34],["954",774.79],["959",481.99],["998",790.14],["3520",543.78],["3539",642.61],["1562",590.98],["3486",624.2],["575",482.89],["3540",582.67],["3538",501.9],["3543",757.5],["3545",306.53],["3536",529.8],["3526",572.41],["37",396.53],["102",446.9], ["3549", 319.85]]
const ppByCarId = new Map(ppRawData);
const groupByCarId = new Map(groupRawData);
const dailyCarsAvailabilityUrl = 'https://ddm999.github.io/gt7info/data.json'
const newCarsDataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7pQ8wqigp_8iTrCde1_xgPnqJkWnMY6Rg8Rp0c_ff68uWrTEy33Et9sZZYacjybEDWffztqOS4lWH/pub?gid=0&single=true&output=csv'
const trackDataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7pQ8wqigp_8iTrCde1_xgPnqJkWnMY6Rg8Rp0c_ff68uWrTEy33Et9sZZYacjybEDWffztqOS4lWH/pub?gid=955460338&single=true&output=csv'

const TYPE_NEW = 'new';
const TYPE_LEGEND = 'legend';
const TYPE_USED = 'used';

const mapGTInfoCarEntry = (entry) => {
  const group = groupByCarId.get(entry.carid);
  return {
    make: entry.manufacturer,
    model: entry.name,
    pp: ppByCarId.get(entry.carid),
    group: group === 'X' ? 'N' : group,
    price: entry.credits
  }
}

const stringToBoolean = (value) => {
  return value === 'TRUE'
}

export default {
  name: "ComboRandomizer",
  data: () => {
    return {
      minPP: 100,
      maxPPSlow: 426,
      maxPPMid: 545,
      maxPP: 800,
      maxPrice: 3600000,
      legendChance: 30,
      usedChance: 30,
      newChance: 40,
      groupN: {
        [TYPE_LEGEND]: [],
        [TYPE_NEW]: [],
        [TYPE_USED]: []
      },
      groupB: {
        [TYPE_LEGEND]: [],
        [TYPE_NEW]: [],
        [TYPE_USED]: []
      },
      group1: {
        [TYPE_LEGEND]: [],
        [TYPE_NEW]: [],
        [TYPE_USED]: []
      },
      group2: {
        [TYPE_LEGEND]: [],
        [TYPE_NEW]: [],
        [TYPE_USED]: []
      },
      group3: {
        [TYPE_LEGEND]: [],
        [TYPE_NEW]: [],
        [TYPE_USED]: []
      },
      group4: {
        [TYPE_LEGEND]: [],
        [TYPE_NEW]: [],
        [TYPE_USED]: []
      },
      showConfig: false,
      tracks: [],
      currentTrack: null,
      currentCar: '',
      loading: true,
    }
  },
  computed: {
    configButtonText() {
      return this.showConfig ? 'Zamknij ustawienia' : 'Otwórz ustawienia'
    },
    readableResult() {
      return `<p>${this.currentTrack === null ? '' : this.currentTrack.name}</p>
<p>${this.currentCar.make} ${this.currentCar.model}</p>`;
    },
  },
  methods: {
    randomize() {
      const trackIndex = Math.floor(Math.random()*this.tracks.length)
      this.currentTrack = this.tracks[trackIndex];
      let minPP = this.minPP;
        if(this.currentTrack.fast) {
          minPP = this.maxPPMid;
        }
        if(this.currentTrack.mid) {
          minPP = this.maxPPSlow
        }
        if(this.currentTrack.slow) {
          minPP = this.minPP
        }
      let maxPP = this.maxPP;
      if(this.currentTrack.slow) {
        maxPP = this.maxPPSlow;
      }
      if(this.currentTrack.mid) {
        maxPP = this.maxPPMid
      }
      if(this.currentTrack.fast) {
        maxPP = this.maxPP
      }
      const filtered = {};
      const randomized = {};
      [TYPE_NEW, TYPE_USED, TYPE_LEGEND].forEach(type => {
        filtered[type] = this.groupN[type].filter(car => {
          return car.pp >= minPP && car.pp <= maxPP && car.price <= this.maxPrice
        })
        if (filtered[type].length === 0) {
          randomized[type] = undefined
        } else if (filtered[type].length === 1) {
          randomized[type] = filtered[type][0]
        } else {
          const carIndex = Math.floor(Math.random()*filtered[type].length)
          randomized[type] = filtered[type][carIndex]
        }

      })

      switch (true) {
        case !randomized[TYPE_LEGEND] && !randomized[TYPE_USED]:
          this.currentCar = randomized[TYPE_NEW];
          break;
        case !randomized[TYPE_LEGEND]:
          this.currentCar = randomized[this.determineUsedAndNew()];
          break;
        case !randomized[TYPE_USED]:
          this.currentCar = randomized[this.determineLegendAndNew()];
          break;
        default:
          this.currentCar = randomized[this.determineType()];
          break;
      }
    },
    toggleConfig() {
      this.showConfig = !this.showConfig
    },
    fixChances: function (priority) {
      this.newChance = 100 - this.usedChance - this.legendChance;
      if (this.newChance < 0) {
        this.newChance = 0;
      }
      if (this.usedChance + this.legendChance <= 100) {
        return
      }
      if (priority === 'used') {
        this.legendChance = 100 - this.usedChance;
      } else {
        this.usedChance = 100 - this.legendChance;
      }
    },
    fixPPs: function () {
      if(this.maxPPSlow < this.minPP) {
        this.maxPPSlow = this.minPP + 1
      }
      if(this.maxPPMid < this.maxPPSlow) {
        this.maxPPMid = this.maxPPSlow + 1
      }
      if(this.maxPP < this.maxPPMid) {
        this.maxPP = this.maxPPMid + 1
      }
    },
    determineLegendAndNew() {
      const r = Math.floor(Math.random() * this.legendChance + this.newChance);
      if (r < this.legendChance) {
        return TYPE_LEGEND;
      }
      return TYPE_NEW;
    },
    determineUsedAndNew() {
      const r = Math.floor(Math.random() * this.usedChance + this.newChance);
      if (r < this.usedChance) {
        return TYPE_USED;
      }
      return TYPE_NEW;
    },
    determineType() {
      const r = Math.floor(Math.random() * 100);
      if (r < this.legendChance) {
        return TYPE_LEGEND;
      }
      if (r < this.legendChance + this.usedChance) {
        return TYPE_USED;
      }
      return TYPE_NEW;
    },
    addToGroups( car, type) {
      switch (car.group) {
        case 'N':
          this.groupN[type].push(car)
          break
        case '1':
          this.group1[type].push(car)
          break
        case '2':
          this.group2[type].push(car)
          break
        case '3':
          this.group3[type].push(car)
          break
        case '4':
          this.group4[type].push(car)
          break
        case 'B':
          this.groupB[type].push(car)
          break
      }
    }
  },
  async mounted() {
    const [usedCars, newCars, trackData] = await Promise.all([
        fetch(dailyCarsAvailabilityUrl),
        fetch(newCarsDataUrl).then(response => response.text()).then(text => {
          return text.split('\r\n').map(row => {
            const columns = row.split(',');
            return {
              make: columns[0],
              model: columns[1],
              pp: parseFloat(columns[3]),
              group: columns[2],
              price: parseInt(columns[4])
            }
          })
        }),
        fetch(trackDataUrl).then(response => response.text()).then(text => {
          const list =  text.split('\r\n').map(row => {
            const columns = row.split(',');
            return {
              name: columns[1],
              slow: stringToBoolean(columns[2]),
              mid: stringToBoolean(columns[3]),
              fast: stringToBoolean(columns[4]),
            }
          }).filter(track => {
            return track.slow || track.mid || track.fast;
          })
          return list
        })
      ]);
    this.tracks = trackData;

    const data = JSON.parse(await usedCars.text())
    const used = data.used.cars
        .filter(entry => entry.state === 'normal' || entry.state === 'limited')
        .map(mapGTInfoCarEntry)
    const legends = data.legend.cars
        .filter(entry => entry.state === 'normal' || entry.state === 'limited')
        .map(mapGTInfoCarEntry)
    used.forEach(car => this.addToGroups(car, TYPE_USED));
    legends.forEach(car => this.addToGroups(car, TYPE_LEGEND));
    newCars.forEach(car => this.addToGroups(car, TYPE_NEW));
    this.loading = false;
    this.randomize();
  }
}
</script>

<style scoped>
.combo {
  margin: 0;
  padding: 0;
}
.slot-checkbox-wrapper input {
  display: none;
}
.slot-checkbox-wrapper label img {
  width: 585px;
  cursor: pointer;
  border: 3px solid silver;
  border-radius: 10px;
  opacity: 0.5;
  transition: all .2s ease-in-out;
}
.slot-checkbox-wrapper label img:hover {
  opacity: 1;
}
.slot-choice-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap: 10px;
  margin-top: 30px;
}
.slot-checkbox-wrapper input:checked+label img {
  border: 3px solid #00FF00;
  opacity: 1;
}
.config-info > div {
  padding: 10px 0;
}
.config-info p {
  padding: 0;
  margin: 0;
  font-size: 20px;
}
.config-info .help {
  padding: 3px 0 0;
  font-size: 13px;
}

.config-info .highlight {
  font-weight: 500;
  color: #e0aa3e;
  font-size: 1.2em;
}
.result {
  margin: 0;
  width: 100%;
  line-height: 100px;
  background-color: black;
  color: white;
  text-align: center;
  font-size: 40px;
}
.actions {
  margin: 10px 0 0;
  padding: 0;
}
.actions button {
  background-color: #e0aa3e;
  line-height: 20px;
  padding: 10px;
  border: 0;
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
  transition: all .2s ease-in-out;
  opacity: 0.7;
}
.actions button.randomize-button {
  background-color: #00FF00;
}
.actions button:hover {
  opacity: 1;
}

.config-info input {
  font-size: 20px;
  height: 20px;
  border: 0;
  outline: none;
}
</style>
