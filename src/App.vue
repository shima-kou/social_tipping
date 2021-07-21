<template>
  <div id="app">
    <p><img src="./assets/logo.png" alt="" /></p>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 500px;
  margin: 30px auto;

  .error {
    font-size: 13px;
    color: red;
    text-align: left;
    margin: 6px 0 15px;
  }
}
</style>
