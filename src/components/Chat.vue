<template>
  <div>
    <h1>Firechat</h1>
    <p v-if="loading">Loading messages...</p>
    <ul id="messages">
      <li v-for="message in messages" :key="message.id">
        <strong>{{message.timestamp | parseFirebaseTimestamp }} {{message.username}}:</strong>
        {{message.text}}
      </li>
    </ul>
    <form>
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
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 1rem;
  height: 70vh;
  overflow: scroll;
  background: #ccc;
  padding: 1rem;
  border-radius: 5px;
}
</style>


<script>
import { mapState } from "vuex";
import { firestore } from "../firebase";

const getSnapshot = snapshot => ({ id: snapshot.id, ...snapshot.data() });

export default {
  data() {
    return {
      messages: [],
      message: "",
      loading: true
    };
  },
  computed: mapState(["username"]),
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
    scrollMessages() {
      const messagesRef = document.querySelector("#messages");
      messagesRef.scroll(0, messagesRef.offsetHeight);
    },
    fetchMessages() {
      firestore
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          this.messages = snapshot.docs.map(getSnapshot);
          this.loading = false;
          this.scrollMessages();
        });
    },
    sendMessage() {
      const text = this.message;
      this.message = "";
      firestore.collection("messages").add({
        username: this.username,
        text,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
      });
    }
  },
  computed: mapState(["username"])
};
</script>
