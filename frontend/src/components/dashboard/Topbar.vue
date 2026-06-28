<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "Charging Stations", path: "/stations", icon: "⚡" },
  { name: "Map", path: "/map", icon: "🗺️" },
];

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<template>
    <div>
  <!--  Hamburger Button -->
  <div class="md:hidden flex items-center justify-between bg-blue-700 text-white p-4">
    <div class="font-bold">⚡ VoltCharge</div>

    <button @click="toggleMenu" class="text-2xl">
      ☰
    </button>
  </div>

  <!--  Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-40"
    @click="toggleMenu"
  ></div>

  <!--  Drawer -->
  <aside
    class="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white z-50 transform transition-transform duration-300"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >

    <!-- Header -->
    <div class="p-5 font-bold text-xl border-b border-white/20">
      ⚡ VoltCharge
    </div>

    <!-- Menu -->
    <nav class="p-4 space-y-4">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/40"
        @click="toggleMenu"
      >
        <span>{{ item.icon }}</span>
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="absolute bottom-5 w-full px-4">
      <button
        @click="logout"
        class="w-full bg-white text-blue-700 py-3 rounded-xl font-semibold"
      >
        Logout
      </button>
    </div>

  </aside>
   </div>
</template>