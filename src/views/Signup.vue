<template>
  <div class="login">
    <textInput title="ユーザー名">
      <input type="text" class="text-input" placeholder="ユーザー名" v-model.trim="$v.userName.$model" @input="$v.userName.$touch()" />
    </textInput>
    <div class="error" v-if="!$v.userName.required && $v.userName.$anyDirty">ユーザ名は必須入力です。</div>
    <textInput title="メールアドレス">
      <input type="text" class="text-input" placeholder="E-mail" v-model.trim="$v.email.$model" @blur="$v.email.$touch()" />
    </textInput>
    <div class="error" v-if="!$v.email.required && $v.email.$anyDirty">メールアドレスは必須入力です。</div>
    <div class="error" v-if="!$v.email.email">メールアドレスが正しい形式ではありません。</div>
    <textInput title="パスワード">
      <input type="text" class="text-input" placeholder="Password" v-model.trim="$v.password.$model" @input="$v.password.$touch()" />
    </textInput>
    <div class="error" v-if="!$v.password.required && $v.password.$anyDirty">パスワードは必須入力です。</div>
    <div class="error" v-if="!$v.password.minLength">パスワードは6文字以上で入力してください。</div>

    <submitBtn>
      <button @click="signUp()">新規登録する</button>
    </submitBtn>
    <p class="note_text" v-if="errorMessage !== ''">{{ errorMessage }}</p>

    <router-link to="/">ログインはこちらから</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import textInput from '@/components/textInput.vue';
import submitBtn from '@/components/submitBtn.vue';
import { required, minLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';

export default {
  name: 'Signup',
  data() {
    return {
      userName: '',
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
    signUp() {
      if (this.$v.$invalid) {
        console.log('バリデーションエラー');
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((success) => {
            // 成功時の処理
            console.log('success: ' + success);
            alert('新規登録が完了しました。');
          })
          .catch((error) => {
            // エラーメッセージの日本語対応
            switch (error) {
              case 'auth/email-already-in-use':
                this.errorMessage = 'このメールアドレスは使用されています';
                break;
              case 'auth/user-disabled':
                this.errorMessage = 'サービスの利用が停止されています';
                break;
              default:
                this.errorMessage = '認証に失敗しました。しばらく時間をおいて再度お試しください';
                break;
            }
          });
      }
    },
  },
  validations: {
    userName: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
};
</script>
