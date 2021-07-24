<template>
  <div class="login">
    <div class="mydata-wrap">
      <p class="userName">{{ user.name }}さんようこそ！</p>
      <p class="wallet">残高: {{ user.wallet }}円</p>
    </div>

    <div class="usersdata-wrap">
      <table>
        <thead>
          <th colspan="3">ユーザー名</th>
        </thead>
        <tbody>
          <tr v-for="(usersData, index) in users" :key="index">
            <td>{{ usersData.name }}</td>
            <td><button @click="walletModalToggle(index)">walletを見る</button></td>
            <td><button @click="sendModalToggle(index)">送る</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showWalletModal">
      <walletModal @walletClose="walletModalToggle()" :users="users" :clickIndex="clickIndex" />
    </div>
    <div v-if="showSendModal">
      <sendModal @sendClose="sendModalToggle()" :user="user" />
    </div>
  </div>
</template>

<script>
import store from '../store';
import sendModal from '@/components/sendModal.vue';
import walletModal from '@/components/walletModal.vue';

export default {
  name: 'Login',
  data() {
    return {
      clickIndex: '',
      showWalletModal: false,
      showSendModal: false,
    };
  },
  created() {
    store.dispatch('checkLogin');
    store.dispatch('usersData');
  },
  computed: {
    user: {
      get() {
        return store.getters.user;
      },
    },
    users: {
      get() {
        return store.getters.users;
      },
    },
  },
  methods: {
    logout() {
      store.dispatch('logout');
    },
    walletModalToggle(index) {
      this.showWalletModal = !this.showWalletModal;
      if (index !== undefined) {
        this.clickIndex = index;
      }
    },
    sendModalToggle(index) {
      this.showSendModal = !this.showSendModal;
      if (index !== undefined) {
        this.clickIndex = index;
      }
    },
  },
  components: {
    walletModal,
    sendModal,
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
