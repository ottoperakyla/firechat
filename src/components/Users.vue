<template>
  <div>
    <h3>Users</h3>
    <ul>
      <li v-for="user in users" :key="user.id">{{user.id}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["users"])
};
</script>
