<template>
  <form>
    <div class="form-group">
      <label for="username">Enter your name</label>
      <input id="username" v-model="username" type="text">
    </div>
    <button @click.prevent="setUsername(username)">Submit</button>
  </form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      username: ""
    };
  },
  methods: mapMutations(["setUsername"])
};
</script>
