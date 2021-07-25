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
              <button @click="modalToggle('walletShow', index)">wallteを見る</button>
            </td>
            <td>
              <button @click="modalToggle('sendShow', index)">送る</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
    <div v-if="walletShow">
      <walletModal @walletClose="modalToggle('walletShow', clickIndex)" :users="users" :clickIndex="clickIndex" />
    </div>
    <div v-if="sendShow">
      <sendModal @sendClose="modalToggle('sendShow', clickIndex)" :user="user" />
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
    errorMessage: {
      get() {
        return store.getters.errorMessage;
      },
    },
  },
  methods: {
    logout() {
      store.dispatch('logout');
    },
    modalToggle(dataName, index) {
      this.clickIndex = index;
      this[dataName] = !this[dataName];
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
