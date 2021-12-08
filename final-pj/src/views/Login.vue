<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>
        <v-toolbar-title>로그인</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <sign-in-form @save="loginLocal" :isLoading="isLoading" />
      </v-card-text>
      <v-card-text class="mt-n4">
        <v-btn to="/join" width="100%">회원가입</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import SignInForm from "../components/SignInForm.vue";
export default {
  components: { SignInForm },
  name: "Login",
  data() {
    return {
      tabs: 0,
      items: ["로그인"],
      isLoading: false,
    };
  },
  methods: {
    async loginLocal(form) {
      console.log(form);
    },
  },
};
</script>
<style></style>
