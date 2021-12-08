<template>
  <div id="current-weather">
    <div class="location">{{ location }}</div>
    <div class="weather">{{ weather }}</div>
    <div class="temperature">{{ temperature }}℃</div>
  </div>
</template>

<script>
export default {
  name: "current-weather",
  data() {
    return {
      location: "",
      weather: "",
      temperature: 0,
      lat: 37.566535,
      lng: 126.977969,
    };
  },
  created() {
    this.$bus.$on("sendCoordnate", this.setCoordinate);
  },
  methods: {
    setCoordinate(coordinate) {
      this.lat = coordinate.lat();
      this.lng = coordinate.lng();
      this.axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=5af9544382acfc3653db0761c5db8afd`
        )
        .then((response) => {
          let data = response.data;
          this.location = data.name;
          this.weather = data.weather.main;
          this.temperature = (data.main.temp - 273.15).toFixed(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.location {
  text-align: center;
  font-size: 40pt;
  color: rgb(92, 8, 8);
}
.weather {
  text-align: center;
  font-size: 20pt;
  font-weight: 100;
  color: rgb(0, 0, 0);
}
.temperature {
  text-align: center;
  font-size: 50pt;
  font-weight: 100;
  color: rgb(124, 20, 20);
}
</style>
