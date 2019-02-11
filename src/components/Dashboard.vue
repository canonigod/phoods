<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Clients</h4>
      </li>
      <li v-for="client in clients" v-bind:key="client.id" class="collection-item">
        <div class="chip">{{client.state}}</div>
        {{client.client_id}}:{{client.name}}
        <router-link
          class="secondary-content"
          v-bind:to="{name: 'view-client', params: {client_id: client.client_id}}"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      clients: []
    };
  },

  created() {
    db.collection("clients")
      .orderBy("state")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            client_id: doc.data().client_id,
            name: doc.data().name,
            state: doc.data().state,
            city: doc.data().city
          };
          this.clients.push(data);
        });
      });
  }
};
</script>
