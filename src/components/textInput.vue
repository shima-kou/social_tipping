<template>
  <div class="input-form-wrap">
    <p class="input-title">{{ title }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'textInput',
  props: {
    title: String,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input-form-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .input-title,
  .text-input {
    display: inline-block;
    padding: 5px 10px;
    margin: 0;
    border-radius: 0;
  }
  .input-title {
    margin-right: 8px;
    min-width: 110px;
    text-align: left;
  }

  input {
    border: 1px solid #777;
    display: inline-block;
  }
}
</style>
