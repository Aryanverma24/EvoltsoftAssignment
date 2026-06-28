<script setup>

import { useRouter,useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const logout = ()=>{
    localStorage.removeItem("token");
    router.push("/login");
}

const menuItems = [
    {
        name:"Dashboard",
        path:"/dashboard",
        icon:"🏠"
    },
    {
        name:"Charging Stations",
        path:"/stations",
        icon:"⚡"
    },
    {
        name:"Map",
        path:"/map",
        icon:"🗺️"
    },
]

</script>


<template>
    <aside class="relative w-64 min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 hidden md:block">
        
        <div class="flex items-center gap-3 mb-10">
            <div class="bg-white text-blue-600 w-11 h-11 rounded-xl flex items-center justify-center text-xl">
                ⚡
            </div>

            <h1 class="text-2xl font-bold">
                VoltCharge
            </h1>
        </div>
        
        <nav class="space-y-4">
            <router-link
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transaction"
                :class="route.path===item.path ? 'bg-white text-blue-700 shadow-md font-semibold' 
                : 'text-white bg-white/20 hover:bg-white/60' "
                >
                <span class="text-lg">{{item.icon}}</span>
                <span>{{item.name}}</span>

            </router-link>
        </nav>

        <button
            @click="logout"
            class="absolute bottom-5 w-50 bg-white text-blue-700 py-3 rounded-xl font-semibold">
                Logout
        </button>

    </aside>
</template>