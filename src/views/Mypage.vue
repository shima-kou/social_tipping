<template>
  <div class="login">
    <p v-show="user">{{ user.name }}様は現在ログインしています。</p>
    <router-link to="/">
      <button @click="logout">ログアウト</button>
    </router-link>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'Login',
  data() {
    return {};
  },
  created() {
    store.dispatch('checkLogin');
  },
  computed: {
    user: {
      get() {
        return store.getters.user;
      },
    },
  },
  methods: {
    logout() {
      store.dispatch('logout');
    },
  },
};
</script>
