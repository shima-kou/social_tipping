<template>
  <div class="submit-area">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'submitBtn',
  props: {
    clickEvent: Function,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.submit-area {
  margin: 20px 0 10px;
}
</style>
