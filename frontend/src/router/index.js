import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import StationDetails from "../views/StationDetails.vue";
import Stations from "../views/Stations.vue";
import Map from "../views/Map.vue";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },

    {
        path: "/login",
        component: Login,
        meta: {
            guest: true
        }
    },

    {
        path: "/register",
        component: Register,
        meta: {
            guest: true
        }
    },

    {
        path: "/dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/stations",
        component: Stations,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/chargers/:id",
        component: StationDetails,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/map",
        component: Map,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
// Route Protection
router.beforeEach((to) => {
    const token =
        localStorage.getItem("token");
    // protected pages
    if (
        to.meta.requiresAuth &&
        !token
    ) {

        return "/login";
    }
    if (
        to.meta.guest &&
         token
    ) {
        return "/dashboard";
    }
    return true;
})

export default router;