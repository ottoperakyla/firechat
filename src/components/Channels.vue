<template>
  <ul>
    <h3>Channels</h3>
    <li v-for="channel in channels" :key="channel.id">
      <a
        :class="{active: currentChannel === channel.id}"
        @click.prevent="setChannel(channel.id)"
        href="#"
      >#{{channel.id}}</a>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: mapState(["channels", "currentChannel"]),
  methods: {
    ...mapActions(["fetchChannels"]),
    ...mapMutations(["setChannel"])
  },
  mounted() {
    this.fetchChannels();
  }
};
</script>

<style scoped lang="scss">
ul {
  padding: 0 1rem 1rem 0;
  li {
    a {
      text-decoration: none;

      &.active {
        color: green;
      }
    }
  }
}
</style>
