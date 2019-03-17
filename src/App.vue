<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  components: {
    Home
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
h1 {
  margin: 0;
}
body {
  margin: 1rem;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 640px;
  width: 100%;
  margin: auto;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;

  input {
    max-width: 50%;
  }
}
</style>
