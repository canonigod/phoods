<template>
  <nav>
    <div class="nav-wrapper blue">
      <div class="container">
        <router-link to="/" class="brand-logo">Phoods Client Manager</router-link>
        <ul class="right">
          <li v-if="isLoggedIn">
            <span class="email white-text">{{currentUser}}</span>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/">Dashboarsds</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/register">Sign Up</router-link>
          </li>
          <li v-if="isLoggedIn">
            <button v-on:click="logout" class="btn grey">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase, { functions } from "firebase";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 10px;
}

.container button {
  margin-left: 10px;
}
</style>


