<template>
  <div id="edit-client">
    <h3>New Client</h3>
    <div class="row">
      <form @submit.prevent="updateClient" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disab type="text" v-model="client_id">
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name">
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="state">
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="city">
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
  name: "edit-client",
  data() {
    return {
      client_id: null,
      name: null,
      state: null,
      city: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("clients")
      .where("client_id", "==", to.params.client_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.client_id = doc.data().client_id;
            vm.name = doc.data().name;
            vm.state = doc.data().state;
            vm.city = doc.data().city;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("clients")
        .where("client_id", "==", this.$route.params.client_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.client_id = doc.data().client_id;
            this.name = doc.data().name;
            this.state = doc.data().state;
            this.city = doc.data().city;
          });
        });
    },
    updateClient() {
      db.collection("clients")
        .where("client_id", "==", this.$route.params.client_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                client_id: this.client_id,
                name: this.name,
                state: this.state,
                city: this.city
              })
              .then(() => {
                this.$router.push({
                  name: "view-client",
                  params: { client_id: this.client_id }
                });
              });
          });
        });
    }
  }
};
</script>
