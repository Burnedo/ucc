<template>
  <div class="weather">
    <div class="config-info">
      <div class="slot-count-info">
        <p>
          Liczba slotów: <input type="number" id="slot-count" v-model="slotCount" min="1" max="9" />
        </p>
        <p class="help">Wpisz liczbę. Min 1, Max 9</p>
      </div>
      <div class="similar-slot-info">
        <p>
          Powiązanie slotów (%): <input type="number" id="slot-count" v-model="similarSlotChance" min="0" max="90" />
        </p>
        <p class="help">
          Z jak dużym prawdopodobieństwem wylosowany slot będzie tego samego typu (S/C/R), co slot poprzedzający. Im wyższa wartość, tym mniej prawdopodobna jest zmienna pogoda
        </p>
      </div>
      <div class="avail-slot-info">
        <p>
          Dostępne sloty: <span class="highlight">{{sortedEnabledSlots}}</span>
        </p>
        <p class="help">Kliknij "Otwórz ustawienia" aby zmienić dostepne sloty</p>

      </div>
    </div>
    <div class="actions">
      <button @click="toggleConfig()">{{configButtonText}}</button>
      <button class="randomize-button" @click="randomize()">Losuj pogodę</button>
    </div>
    <div class="result">
      {{readableResult}}
    </div>
    <div class="config" v-if="showConfig">
      <div class="slot-choice-container">
        <div v-for="slot in availableSunnySlots" v-bind:key="slot" class="slot-checkbox-wrapper">
          <input type="checkbox" :value="slot" v-model="enabledSunnySlots" :id="'slot-'+slot" />
          <label :for="'slot-'+slot">
            <img :src="getSlotImage(slot)" :alt="slot">
          </label>
        </div>
        <div v-for="slot in availableCloudySlots" v-bind:key="slot"  class="slot-checkbox-wrapper">
          <input type="checkbox" :value="slot" v-model="enabledCloudySlots" :id="'slot-'+slot" />
          <label :for="'slot-'+slot">
            <img :src="getSlotImage(slot)" :alt="slot">
          </label>

        </div>
        <div v-for="slot in availableRainySlots" v-bind:key="slot"  class="slot-checkbox-wrapper">
          <input type="checkbox" :value="slot" v-model="enabledRainySlots" :id="'slot-'+slot" />
          <label :for="'slot-'+slot">
            <img :src="getSlotImage(slot)" :alt="slot">
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  created() {
    this.$nextTick(() => {
      this.availableSunnySlots = Array(18).fill('').map((value, index) => { return 'S' + this.zeroFill(index+1)})
      this.availableCloudySlots = Array(6).fill('').map((value, index) => { return 'C' + this.zeroFill(index+1)})
      this.availableRainySlots = Array(8).fill('').map((value, index) => { return 'R' + this.zeroFill(index+1)})
      this.randomize()
    })

  },
  data: () => {
    return {
      enabledSunnySlots: ['S01', 'S03', 'S06'],
      enabledCloudySlots: ['C01'],
      enabledRainySlots: ['R04', 'R05', 'R06', 'R07'],
      availableSunnySlots: [],
      availableCloudySlots: [],
      availableRainySlots: [],
      slotCount: 6,
      showConfig: false,
      result: [],
      similarSlotChance: 10
    }
  },
  computed: {
    readableResult() {
      return this.result.join(' - ')
    },
    enabledSlots() {
      return [
        ...this.enabledSunnySlots,
        ...this.enabledCloudySlots,
        ...this.enabledRainySlots
      ]
    },
    configButtonText() {
      return this.showConfig ? 'Zamknij ustawienia' : 'Otwórz ustawienia'
    },
    sortedEnabledSlots() {
      const sorted = this.enabledSlots
      sorted.sort((a, b) => {
        const aType = a.substring(0, 1);
        const bType = b.substring(0, 1);
        const aNum = parseInt(a.substring(1))
        const bNum = parseInt(b.substring(1))
        if (aType === bType) {
          return aNum - bNum
        }
        switch (aType) {
          case 'S':
            return -1;
          case 'C':
            return bType === 'S' ? 1 : -1
          case 'R':
            return 1
        }
      })
      return sorted.join(' / ')
    }
  },
  methods: {
    randomize () {
      const result = []
      for(let i = 0; i < this.slotCount; i++) {
        const [a,b] = [Math.random(), (this.similarSlotChance / 100)]
        console.log(a,b)
        if (i === 0 || this.similarSlotChance === 0 || a >= b) {
          result.push(this.enabledSlots[Math.floor(Math.random()*this.enabledSlots.length)]);
          continue
        }
        const prevSlotType = result[i-1].substring(0,1)
        const prevSlotRelatedSlots = []
        switch(prevSlotType) {
          case 'S':
            prevSlotRelatedSlots.push(...this.enabledSunnySlots)
            break;
          case 'C':
            prevSlotRelatedSlots.push(...this.enabledCloudySlots)
            break;
          case 'R':
            prevSlotRelatedSlots.push(...this.enabledRainySlots)
            break;
        }
        result.push(prevSlotRelatedSlots[Math.floor(Math.random()*prevSlotRelatedSlots.length)]);
      }
      this.result = result
    },
    zeroFill(num) {
      let str = num.toString();
      if (str.length > 1) {
        return str
      }
      return '0' + str
    },
    toggleConfig() {
      this.showConfig = !this.showConfig
    },
    getSlotImage(slot) {
      var images = require.context('../assets/', false, /\.png$/)
      return images('./' + slot + ".png")
    }
  },
}
</script>

<style scoped>
.weather {
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
