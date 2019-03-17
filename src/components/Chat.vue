<template>
  <div style="flex-grow: 1;">
    <ul ref="messages">
      <li v-if="loading">Loading messages...</li>
      <li v-if="!loading && channelMessages.length === 0">No messages in this channel yet.</li>
      <li v-for="message in channelMessages" :key="message.id">
        <strong>{{message.timestamp | parseFirebaseTimestamp }} {{message.username}}:</strong>
        {{message.text}}
      </li>
    </ul>
    <form ref="messageForm">
      <div class="form-group">
        <label for="message">Message</label>
        <input @focus="scrollMessages" v-model="message" type="text" id="message">
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
    ...mapState(["username", "currentChannel", "messages", "loading"]),
    channelMessages() {
      return this.messages.filter(
        message => message.channel === this.currentChannel
      );
    }
  },
  mounted() {
    this.fetchMessages();
    this.startPing();
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
    ...mapActions(["fetchMessages", "startPing"]),
    scrollMessages() {
      const messagesRef = this.$refs.messages;
      messagesRef.scroll(0, messagesRef.scrollHeight);
    },
    sendMessage() {
      const text = this.message;
      this.message = "";
      firestore.collection("messages").add({
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        channel: this.currentChannel,
        username: this.username,
        text
      });
    }
  }
};
</script>
