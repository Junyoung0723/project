<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      label="이메일"
      v-model="form.userEmail"
      :rules="rules.email()"
    />
    <input-password
      label="비밀번호"
      v-model="form.userPwd"
      :rules="rules.password()"
    />
    <v-btn
      block
      color="primary"
      type="submit"
      :loading="isLoading"
      @click="login"
    >
      로그인
    </v-btn>
  </v-form>
</template>

<script>
import validateRules from "../util/validateRules";
import InputPassword from "./InputPassword.vue";
import axios from "axios";
import router from "../router/index";

export default {
  components: { InputPassword },
  name: "SignInForm",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      form: {
        userEmail: "",
        userPwd: "",
      },
    };
  },
  computed: {
    rules: () => validateRules,
  },
  methods: {
    async save() {
      this.$refs.form.validate();
      await this.$nextTick();
      if (!this.valid) return;
      this.$emit("save", this.form);
    },
    login() {
      if (this.form.userEmail == "") {
        // 이메일 입력칸이 공백이면
        alert("이메일를 입력해주세요.");
        return;
      } else if (this.form.userPwd == "") {
        // 비밀번호 입력칸이 공백이면
        alert("비밀번호를 입력해주세요.");
        return;
      } else {
        // 위의 조건들이 모두 아니면
        var baseURI = "http://localhost:3000"; // 노드js로 연 서버주소

        // 서버에 post 입력
        // 입력한 이메일과 비밀번호를 데이터바인딩하여 저장한 값을 this로 가져와서 서버로 보내 로그인 처리
        axios
          .post(`${baseURI}/user/login`, {
            userEmail: this.form.userEmail,
            userPwd: this.form.userPwd,
          })
          .then(function (res) {
            if (res.data == "로그인에 실패했습니다.") {
              // 로그인 실패
              console.log(res.data);
              alert(res.data); // 서버에서 JSON객체로 받은 데이터로 alert창 보여주기
              return;
            } else {
              // 로그인 성공
              console.log(res.data);
              alert(res.data); // 서버에서 JSON객체로 받은 데이터로 alert창 보여주기
              router.push("/admin"); /*eslint-disable-line no-unused-vars*/
            }
          });
      }
    },
  },
};
</script>
