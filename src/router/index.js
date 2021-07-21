import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Mypage from '../views/Mypage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: `/mypage`,
    name: 'Mypage',
    component: Mypage,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // もし認証されていない場合、ログインページにリダイレクトする。
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          path: `/`,
          name: 'Login',
        });
      }
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;
