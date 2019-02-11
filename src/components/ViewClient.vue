<template>
  <div id="view-client">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Client ID#:{{client_id}}</li>
      <li class="collection-item">State: {{state}}</li>
      <li class="collection-item">City: {{city}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteClient" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name: 'edit-client', params: {client_id: client_id}}"
        class="btn-floating btn-large"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-client",
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
    deleteClient() {
      if (confirm("Are you sure you want to delete " + this.name + "?")) {
        db.collection("clients")
          .where("client_id", "==", this.$route.params.client_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>
