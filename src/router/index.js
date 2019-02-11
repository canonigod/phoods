import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import NewClient from "@/components/NewClient";
import ViewClient from "@/components/ViewClient";
import EditClient from "@/components/EditClient";
import Login from "@/components/Login";
import Register from "@/components/Register";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requireGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requireGuest: true
      }
    },
    {
      path: "/new",
      name: "new-client",
      component: NewClient,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: "/edit/:client_id",
      name: "edit-client",
      component: EditClient,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: "/:client_id",
      name: "view-client",
      component: ViewClient,
      meta: {
        requiredAuth: true
      }
    }
  ]
});

// Nav Guards

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiredAuth)) {
    // CHeck if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requireGuest)) {
    // CHeck if logged in
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
