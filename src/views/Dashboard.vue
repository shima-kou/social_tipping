<template>
  <div class="login">
    <div class="mydata-wrap">
      <p class="userName">{{ user.name }}さんようこそ！</p>
      <p class="wallet">残高: {{ user.wallet }}円</p>
    </div>
    <div class="buton-wrap">
      <button @click="logout">ログアウトする</button>
    </div>

    <div class="users-wrap">
      <table>
        <thead>
          <th colspan="3">ユーザー名</th>
        </thead>
        <tbody>
          <tr v-for="(userData, index) in users" :key="index">
            <td>
              {{ userData.name }}
            </td>
            <td>
              <button @click="walletToggle(index)">wallteを見る</button>
            </td>
            <td>
              <button @click="sendToggle(index)">送る</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="walletShow">
      <walletModal @walletClose="walletToggle()" :users="users" :clickIndex="clickIndex" />
    </div>
    <div v-if="sendShow">
      <sendModal @sendClose="sendToggle()" :user="user" />
    </div>
  </div>
</template>

<script>
import store from '../store';
import walletModal from '@/components/walletModal.vue';
import sendModal from '@/components/sendModal.vue';

export default {
  name: 'Login',
  data() {
    return {
      walletShow: false,
      sendShow: false,
      clickIndex: '',
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
    walletToggle(index) {
      this.walletShow = !this.walletShow;
      if (index !== undefined) {
        this.clickIndex = index;
      }
    },
    sendToggle(index) {
      console.log(this.sendShow);
      this.sendShow = !this.sendShow;
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

.users-wrap {
  table {
    th,
    td {
      text-align: left;
    }
  }
}
</style>
