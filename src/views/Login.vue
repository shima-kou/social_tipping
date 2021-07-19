<template>
  <div class="login">
    <textInput title="メールアドレス">
      <input type="text" name="email" class="text-input" placeholder="E-mail" v-model="email" />
    </textInput>
    <textInput title="パスワード">
      <input type="text" name="password" class="text-input" placeholder="Password" v-model="password" />
    </textInput>

    <submitBtn>
      <button @click="login()">ログインする</button>
    </submitBtn>

    <router-link to="/signup">新規登録はこちらから</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import textInput from '@/components/textInput.vue';
import submitBtn from '@/components/submitBtn.vue';
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  components: {
    textInput,
    submitBtn,
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((success) => {
          // 成功時の処理
          console.log('success: ' + success);
          alert('ログインが成功しました。');
        })
        .catch((error) => {
          // エラー時の処理
          console.log('error: ' + error);
          alert('ログインに失敗しました。');
        });
    },
  },
};
</script>
