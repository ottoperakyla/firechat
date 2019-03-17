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
body {
  margin: 0;
}
h1,
h2,
h3 {
  margin: 0;
}
h3 {
  text-decoration: underline;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 640px;
  width: 100%;
  margin: auto;
  padding: 0 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;

  input {
    max-width: 50%;
  }
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
