import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import firebase from '../firebase';

const db = firebase.firestore();

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: '',
      wallet: '',
      uid: '',
    },
    users: {},
    errorMessage: '',
  },
  mutations: {
    getUser(state, user) {
      state.user = user;
    },
    getErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    getUsers(state, users) {
      state.users = users;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
  },
  actions: {
    checkLogin({ commit }) {
      // userプロパティを使用
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userData = db.collection('users').doc(user.uid);
          userData.get().then((doc) => {
            commit('getUser', doc.data());
          });
        }
      });
    },
    checkErrorMessage({ commit }, error) {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'このメールアドレスは使用されています';
          break;
        case 'auth/user-not-found':
          errorMessage = 'メールアドレスが違います';
          break;
        case 'auth/wrong-password':
          errorMessage = 'パスワードが違います';
          break;
        case 'auth/user-disabled':
          errorMessage = 'サービスの利用が停止されています';
          break;
        case 'auth/user-mismatch':
          errorMessage = '認証されているユーザーと異なるアカウントが選択されました';
          break;
        default:
          errorMessage = '認証に失敗しました。しばらく時間をおいて再度お試しください';
          break;
      }
      commit('getErrorMessage', errorMessage);
    },
    login({ dispatch }, values) {
      if (!values.invalid) {
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            // 成功時の処理
            const persistence = firebase.auth.Auth.Persistence.SESSION;
            firebase.auth().setPersistence(persistence);
            dispatch('clearError');
            dispatch('checkLogin');
            router.push('/dashboard');
          })
          .catch((error) => {
            dispatch('checkErrorMessage', error);
          });
      }
    },
    logout({ dispatch }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch('stateInit');
        })
        .catch((error) => {
          dispatch('checkErrorMessage', error);
        });
    },
    signUp({ dispatch }, values) {
      if (!values.invalid) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(() => {
            // ユーザーアカウント作成成功時の処理
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                const userData = db.collection('users').doc(user.uid);
                userData.set({
                  uid: user.uid,
                  name: values.userName,
                  wallet: 0,
                });
              }
            });
          })
          .then(() => {
            router.push('/dashboard');
          })
          .catch((error) => {
            dispatch('checkErrorMessage', error);
          });
      }
    },
    usersData({ commit, dispatch }) {
      const userArray = [];
      firebase.auth().onAuthStateChanged((user) => {
        db.collection('users')
          .get()
          .then((users) => {
            users.forEach((doc) => {
              if (user.uid !== doc.data().uid) {
                userArray.push(doc.data());
              }
            });
          })
          .then(() => {
            commit('getUsers', userArray);
          })
          .catch((error) => {
            dispatch('checkErrorMessage', error);
          });
      });
    },
    clearError({ commit }) {
      commit('clearErrorMessage');
    },
    stateInit({ commit }) {
      const user = {
        uid: '',
        email: '',
        name: '',
      };
      commit('getUser', user);
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    users: (state) => {
      return state.users;
    },
    errorMessage: (state) => {
      return state.errorMessage;
    },
  },
});

export default store;
