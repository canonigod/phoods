<template>
  <div id="new-client">
    <h3>New Client</h3>
    <div class="row">
      <form @submit.prevent="saveClient" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="client_id">
            <label>Client ID#</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name">
            <label>Name</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="state">
            <label>State</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="city">
            <label>City</label>
          </div>
        </div>

        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-client",
  data() {
    return {
      client_id: null,
      name: null,
      state: null,
      city: null
    };
  },
  methods: {
    saveClient() {
      db.collection("clients")
        .add({
          client_id: this.client_id,
          name: this.name,
          state: this.state,
          city: this.city
        })
        .then(docRef => {
          this.$router.push("/");
        })
        .catch(error => console.log(err));
    }
  }
};
</script>

