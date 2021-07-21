import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import firebase from 'firebase/app';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      uid: '',
      email: '',
      name: '',
    },
    errorMessage: '',
  },
  mutations: {
    getUser(state, user) {
      state.user = user;
    },
    getErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
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
          commit('getUser', { uid: user.uid, email: user.email, name: user.displayName });
        }
      });
    },
    checkErrorMessage({ commit }, { error, method }) {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          if (method.indexOf('signup') !== -1) {
            errorMessage = 'このメールアドレスは使用されています';
          } else {
            errorMessage = 'メールアドレスまたはパスワードが違います';
          }
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
          if (method === 'signin/popup') {
            errorMessage = '認証されているユーザーと異なるアカウントが選択されました';
          } else {
            errorMessage = 'メールアドレスまたはパスワードが違います';
          }
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
            router.push('/mypage');
          })
          .catch((error, method) => {
            dispatch('checkErrorMessage', { error, method });
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
        .catch((error, method) => {
          dispatch('checkErrorMessage', { error, method });
        });
    },
    signUp({ dispatch }, values) {
      if (!values.invalid) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(() => {
            // ユーザーアカウント作成成功時の処理
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: values.userName,
              })
              .then(() => {
                dispatch('checkLogin');
                router.push('/mypage');
              });
          })
          .catch((error) => {
            dispatch('checkErrorMessage', error.code);
            return false;
          });
      }
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
    errorMessage: (state) => {
      return state.errorMessage;
    },
  },
});

export default store;
