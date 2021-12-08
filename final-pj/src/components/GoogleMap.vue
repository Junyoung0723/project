<template>
  <div>
    <div id="map-canvas" />
  </div>
</template>

<script>
export default {
  name: "map-canvas",
  mounted() {
    /*global google*/
    var center = new google.maps.LatLng(37.566535, 126.977969);
    var map = new google.maps.Map(document.getElementById("map-canvas"), {
      center: center,
      zoom: 12,
    });
    this.$bus.$emit("sendCoordnate", map.getCenter());
    var marker = new google.maps.Marker({
      position: center,
      map: map,
    });
    map.addListener("center_changed", () => {
      marker.setPosition(map.getCenter());
    });
    map.addListener("center_changed", () => {
      this.$bus.$emit("sendCoordnate", map.getCenter());
    });
  },
};
</script>

<style scoped>
#map-canvas {
  width: 400px;
  height: 600px;
}
</style>
