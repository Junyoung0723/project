<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="bDrawer = !bDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>관리자 페이지</v-toolbar-title>
      <v-spacer></v-spacer>
      <site-user />
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="bDrawer">
      <v-toolbar flat height="100px">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-avatar>
                <img src="http://randomuser.me/api/portraits/men/44.jpg" />
              </v-list-item-avatar>
              <v-list-item-title class="title">관리자 페이지</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-3">
        <v-list-item v-for="item in items" :key="item.text" :href="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
      <br />
      <v-row>
        <v-col><current-weather /></v-col>
        <v-col><google-map /></v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import CurrentWeather from "./components/CurrentWeather.vue";

import GoogleMap from "./components/GoogleMap.vue";
import SiteUser from "./components/SiteUser.vue";
export default {
  name: "app",
  components: {
    SiteUser,
    CurrentWeather,
    GoogleMap,
  },
  data() {
    return {
      bDrawer: false,
      items: [
        { text: "Home", icon: "mdi-home", to: "/" },
        { text: "고객관리", icon: "mdi-account-multiple" },
        { text: "Starred", icon: "mdi-star" },
        { text: "Recent", icon: "mdi-history" },
        { text: "Offline", icon: "mdi-check-circle" },
        { text: "Uploads", icon: "mdi-upload" },
        { text: "Backups", icon: "mdi-cloud-upload" },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.bDrawer = !this.bDrawer;
    },
  },
};
</script>
<style scoped>
h2 {
  margin-top: 20px;
  margin-left: 10px;
  color: blue;
}
</style>
