import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { firestore } from "./firebase";

const getSnapshot = snapshot => ({ id: snapshot.id, ...snapshot.data() });
export default new Vuex.Store({
  state: {
    username: localStorage.getItem("username") || "",
    currentChannel: localStorage.getItem("currentChannel") || "default",
    channels: [],
    messages: [],
    users: [],
    loading: false
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
      localStorage.setItem("username", username);
    },
    setUsers(state, users) {
      state.users = users;
    },
    setChannel(state, channel) {
      state.currentChannel = channel;
      localStorage.setItem("currentChannel", channel);
    },
    setChannels(state, channels) {
      state.channels = channels;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    fetchChannels(context) {
      firestore
        .collection("channels")
        .get()
        .then(snapshot => {
          const channels = snapshot.docs.map(getSnapshot);
          context.commit("setChannels", channels);
        });
    },
    fetchUsers(context) {
      firestore.collection("users").onSnapshot(snapshot => {
        const users = snapshot.docs.map(getSnapshot);
        context.commit("setUsers", users);
      });
    },
    fetchMessages(context) {
      context.commit("setMessages", []);
      context.commit("setLoading", true);
      firestore
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          const messages = snapshot.docs.map(getSnapshot);
          context.commit("setMessages", messages);
          context.commit("setLoading", false);
        });
    },
    startPing(context) {
      firestore
        .collection("users")
        .doc(context.state.username)
        .set({
          lastActive: firebase.firestore.Timestamp.fromDate(new Date())
        });
    }
  }
});
