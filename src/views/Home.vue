<template>
  <div class="home">
    <NameForm v-if="username === ''"/>

    <div v-if="username !== ''">
      <h1>Firechat</h1>

      <div class="container">
        <Channels/>
        <Chat/>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
}
</style>

<script>
import NameForm from "@/components/NameForm.vue";
import Chat from "@/components/Chat.vue";
import Channels from "@/components/Channels.vue";
import { mapState } from "vuex";

export default {
  computed: mapState(["username"]),
  components: {
    NameForm,
    Chat,
    Channels
  }
};
</script>
