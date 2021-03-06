import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignInForm from "../views/Login.vue";
import SignUpForm from "../views/Join.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: SignInForm,
  },
  {
    path: "/join",
    name: "Join",
    component: SignUpForm,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
