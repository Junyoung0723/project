<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    <input-duplicate-check
      ref="id"
      v-model="form.userID"
      label="아이디"
      prepend-icon="mdi-account"
      :rules="rules.id()"
      :cbCheck="cbCheckId"
    />
    <input-password
      label="비밀번호"
      v-model="form.userPwd"
      prepend-icon="mdi-lock"
      :rules="rules.password()"
    />
    <input-password
      label="비밀번호 확인"
      v-model="confirmPw"
      prepend-icon="mdi-lock"
      :rules="[rules.matchValue(form.userPwd)]"
    />
    <v-text-field
      label="이름"
      v-model="form.userName"
      prepend-icon="mdi-card-account-details-outline"
      :rules="rules.name()"
    />

    <input-duplicate-check
      ref="email"
      v-model="form.userEmail"
      label="이메일"
      prepend-icon="mdi-email"
      :rules="rules.email()"
      :cbCheck="cbCheckEmail"
    />
    <v-btn
      type="submit"
      block
      color="primary"
      :loading="isLoading"
      @click="join"
      >회원가입</v-btn
    >
  </v-form>
</template>
<script>
import validateRules from "../util/validateRules";
import InputDuplicateCheck from "./InputDuplicateCheck.vue";
import InputPassword from "./InputPassword.vue";
import axios from "axios";
import router from "../router/index";
export default {
  components: { InputDuplicateCheck, InputPassword },
  name: "SignUpForm",
  props: {
    cbCheckId: {
      type: Function,
      default: null,
    },
    cbCheckEmail: {
      type: Function,
      default: null,
    },
    isLoading: Boolean,
  },
  data() {
    return {
      valid: true,
      form: {
        userID: "",
        userEmail: "",
        userPwd: "",
        userName: "",
      },
      confirmPw: "",
    };
  },
  computed: {
    rules: () => validateRules,
  },
  methods: {
    async save() {
      this.$refs.form.validate();
      await await this.$nextTick();
      if (!this.valid) return;
      if (!this.$refs.id.validate()) return;
      if (!this.$refs.email.validate()) return;

      this.$emit("onSave", this.form);
    },

    join() {
      if (this.form.userEmail == "") {
        // 아이디 입력칸이 공백이면
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
        // 입력한 아이디와 비밀번호를 데이터바인딩하여 저장한 값을 this로 가져와서 서버로 보내 로그인 처리
        axios
          .post(`${baseURI}/user/join`, {
            userEmail: this.form.userEmail,
            userPwd: this.form.userPwd,
            userID: this.form.userID,
            userName: this.form.userName,
          })
          .then(function (res) {
            if (res.data == "로그인에 실패했습니다.") {
              // 로그인 실패
              console.log(res.data);
              return;
            } else {
              // 로그인 성공
              console.log(res.data);
              router.push("/admin"); /*eslint-disable-line no-unused-vars*/
            }
          });
      }
    },
  },
};
</script>
