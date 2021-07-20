<template>
  <div class="login">
    <textInput title="ユーザー名">
      <input type="text" class="text-input" placeholder="ユーザー名" v-model.trim="userName" @blur="$v.userName.$touch()" />
    </textInput>
    <div class="error" v-if="!$v.userName.required && $v.userName.$anyDirty">ユーザ名は必須入力です。</div>

    <textInput title="メールアドレス">
      <input type="text" class="text-input" placeholder="E-mail" v-model.trim="email" @blur="$v.email.$touch()" />
    </textInput>
    <div class="error" v-if="!$v.email.required && $v.email.$anyDirty">メールアドレスは必須入力です。</div>
    <div class="error" v-if="!$v.email.email && $v.email.$anyDirty">メールアドレスが正しい形式ではありません。</div>

    <textInput title="パスワード">
      <input type="text" class="text-input" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()" />
    </textInput>
    <div class="error" v-if="!$v.password.required && $v.password.$anyDirty">パスワードは必須入力です。</div>
    <div class="error" v-if="!$v.password.minLength && $v.password.$anyDirty">パスワードは6文字以上で入力してください。</div>

    <submitBtn>
      <button @keyup.enter="signUp" @click="signUp">新規登録する</button>
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

import store from '../store';

export default {
  name: 'Signup',
  data() {
    return {
      userName: '',
      email: '',
      password: '',
    };
  },
  created() {
    store.dispatch('clearError');
  },
  computed: {
    errorMessage: {
      get() {
        return store.getters.errorMessage;
      },
    },
  },
  methods: {
    signUp() {
      this.$v.$touch();
      store.dispatch('signUp', {
        invalid: this.$v.$invalid,
        userName: this.userName,
        email: this.email,
        password: this.password,
      });
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
  components: {
    textInput,
    submitBtn,
  },
};
</script>
