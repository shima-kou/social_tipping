<template>
  <div class="login">
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
      <button type="submit" @keyup.enter="login" @click="login">ログインする</button>
    </submitBtn>

    <p class="error" v-if="errorMessage !== ''">{{ errorMessage }}</p>

    <router-link to="/signup">新規登録はこちらから</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import textInput from '@/components/textInput.vue';
import submitBtn from '@/components/submitBtn.vue';
import { required, minLength, email } from 'vuelidate/lib/validators';
import store from '../store';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  created() {
    store.dispatch('clearError');
    store.dispatch('logout');
  },
  computed: {
    errorMessage: {
      get() {
        return store.getters.errorMessage;
      },
    },
    user: {
      get() {
        return store.getters.user;
      },
    },
  },
  methods: {
    login() {
      this.$v.$touch();
      store.dispatch('login', {
        invalid: this.$v.$invalid,
        email: this.email,
        password: this.password,
      });
    },
  },

  validations: {
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
