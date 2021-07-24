<template>
  <div class="login">
    <div class="mydata-wrap">
      <p class="userName">{{ user.name }}さんようこそ！</p>
      <p class="wallet">残高: {{ user.wallet }}円</p>
    </div>
    <div class="buton-wrap">
      <button @click="logout">ログアウトする</button>
    </div>
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

<style scoped lang="scss">
.mydata-wrap {
  display: flex;
  > p {
    width: 50%;
  }
}
</style>
