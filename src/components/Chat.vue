<template>
  <div style="flex-grow: 1;">
    <ul ref="messages">
      <li v-if="loading">Loading messages...</li>
      <li v-if="!loading && messages.length === 0">No messages in this channel yet.</li>
      <li v-for="message in messages" :key="message.id">
        <strong>{{message.timestamp | parseFirebaseTimestamp }} {{message.username}}:</strong>
        {{message.text}}
      </li>
    </ul>
    <form ref="messageForm">
      <div class="form-group">
        <label for="message">Message</label>
        <input v-model="message" type="text" id="message">
      </div>
      <button :disabled="message.trim() === ''" @click.prevent="sendMessage">Send</button>
    </form>
  </div>
</template>

<style scoped>
ul {
  overflow: scroll;
  background: #ccc;
  padding: 1rem;
  border-radius: 5px;
  height: 70vh;
}
</style>


<script>
import { mapState, mapActions } from "vuex";
import { firestore } from "../firebase";

export default {
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState(["username", "currentChannel", "messages", "loading"])
  },
  mounted() {
    this.fetchMessages();
  },
  updated() {
    this.scrollMessages();
  },
  filters: {
    parseFirebaseTimestamp(timestamp) {
      return timestamp
        .toDate()
        .toLocaleString()
        .split(", ")[1];
    }
  },
  methods: {
    ...mapActions(["fetchMessages", "sendMessage"]),
    scrollMessages() {
      const messagesRef = this.$refs.messages;
      messagesRef.scroll(0, messagesRef.offsetHeight);
    },
    sendMessage() {
      const text = this.message;
      this.message = "";
      firestore.collection(`channels/${this.currentChannel}/messages`).add({
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        username: this.username,
        text
      });
    }
  }
};
</script>
