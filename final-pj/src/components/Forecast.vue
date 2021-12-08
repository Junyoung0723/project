<template>
  <div>
    <ul class="forecasts">
      <li v-for="forecast in forecasts" :key="forecast.dt" class="item">
        <div class="weekday">
          {{ convertToDate(forecast.dt) | weekday }}
        </div>
        <div class="icon">
          <img
            src="`http://openweathermap.org/img/w/${forecast/weather[0].icon}.png`"
          />
        </div>
        <div class="temperature">
          {{ (forecast.temp.day - 273.15).toFixed(0) }}℃
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "forecast",
  data() {
    return {
      forecasts: [],
      lat: 37.566535,
      lng: 126.977969,
    };
  },
  filters: {
    weekday(date) {
      let weekdayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return weekdayName[date.getDay()];
    },
  },
  mounted() {
    this.axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${this.lat}&lon=${this.lng}&cnt=10&appid=5af9544382acfc3653db0761c5db8afd`
      )
      .then((response) => {
        let data = response.data;
        this.forecasts = data.list;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    convertToDate(timestamp) {
      return new Date(timestamp * 1000);
    },
  },
};
</script>

<style scoped>
.forecasts {
  display: flex;
  width: 80%;
  padding: 0;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}
.forecasts > li.item {
  position: relative;
  flex: 1;
  color: white;
  text-align: center;
  list-style-type: none;
}
.forecasts > li.item:first-child:before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  display: block;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background-color: #fa4444;
}
.forecasts > li.item > .temperature {
  margin-top: -8px;
}
</style>
