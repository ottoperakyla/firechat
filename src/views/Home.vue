<template>
  <div class="home">
    <NameForm v-if="username === ''"/>
    <Chat v-if="username !== ''"/>
  </div>
</template>

<script>
import NameForm from "@/components/NameForm.vue";
import Chat from "@/components/Chat.vue";
import { mapState } from "vuex";

export default {
  computed: mapState(["username"]),
  components: {
    NameForm,
    Chat
  }
};
</script>
