<template>
  <div class="home">
    <NameForm v-if="username === ''"/>

    <div v-if="username !== ''">
      <h1>Firechat</h1>

      <div class="columns">
        <div class="rows">
          <Channels/>
          <Users/>
        </div>

        <Chat/>
      </div>
    </div>
  </div>
</template>

<style>
.columns {
  display: flex;
}
.rows {
  display: flex;
  flex-direction: column;
}
</style>

<script>
import NameForm from "@/components/NameForm.vue";
import Chat from "@/components/Chat.vue";
import Channels from "@/components/Channels.vue";
import Users from "@/components/Users.vue";

import { mapState, mapActions } from "vuex";

export default {
  computed: mapState(["username"]),
  methods: mapActions(["fetchUsers"]),
  mounted() {
    this.fetchUsers();
  },
  components: {
    NameForm,
    Chat,
    Channels,
    Users
  }
};
</script>
