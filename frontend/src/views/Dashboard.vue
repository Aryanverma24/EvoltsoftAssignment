<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios.js";

import Sidebar from "../components/dashboard/Sidebar.vue";
import TopNavbar from "../components/dashboard/Topbar.vue";

import StatusChart from "../components/dashboard/StatusChart.vue";
import PowerChart from "../components/dashboard/PowerChart.vue";
import ConnectorsChart from "../components/dashboard/ConnectorsChart.vue";

import AddStationModal from "../components/stations/AddStationModal.vue";

const stations = ref([]);
const loading = ref(false);

const showAddModal = ref(false);

const fetchStats = async () => {
  try {
    loading.value = true;
    const res = await api.get("/chargers?limit=100");
    stations.value = res.data.data;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const activeCount = () => {
  return stations.value.filter((s) => s.status === "Active").length;
};

const inactiveCount = () => {
  return stations.value.filter((s) => s.status === "Inactive").length;
};

const totalPower = () => {
  return stations.value.reduce((total, item) => total + item.powerOutput, 0);
};

onMounted(() => {
  fetchStats();
});
</script>

<template>
  <div class="min-h-screen bg-blue-50 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <div class="block fixed left-0 top-0 h-screen w-64">
      <Sidebar />
    </div>

    <!-- Content -->
    <div class="block md:hidden">
      <TopNavbar />
    </div>
    <div class="flex-1 p-4 md:ml-64">
      <h1 class="text-2xl sm:text-3xl font-bold mt-6 text-gray-800">
        EV Charging Dashboard
      </h1>

      <p class="text-gray-500">Monitor your charging network performance</p>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        <div class="bg-white rounded-2xl p-5 shadow">
          <p class="text-gray-500">Total Stations</p>

          <h2 class="text-3xl font-bold">{{ stations.length }}</h2>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow">
          <p class="text-gray-500">Active</p>

          <h2 class="text-3xl font-bold text-green-600">
            {{ activeCount() }}
          </h2>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow">
          <p class="text-gray-500">Inactive</p>
          <h2 class="text-3xl font-bold text-red-500">
            {{ inactiveCount() }}
          </h2>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow">
          <p class="text-gray-500">Power Capacity</p>

          <h2 class="text-3xl font-bold text-blue-600">
            {{ totalPower() }} KW
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <StatusChart :active="activeCount()" :inactive="inactiveCount()" />

        <PowerChart :stations="stations" />
      </div>

      <!-- Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <!-- Connector -->
        <ConnectorsChart :stations="stations" />
        <!-- Recent -->
        <div class="bg-white rounded-2xl p-6 shadow">
          <h2 class="font-bold text-xl">Recent Stations</h2>

          <div
            v-for="station in stations.slice(0, 5)"
            :key="station._id"
            class="flex justify-between border-b py-3"
          >
            <span>
              {{ station.name }}
            </span>
            <span
              :class="
                station.status === 'Active' ? 'text-green-600' : 'text-red-500'
              "
            >
              {{ station.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- quick Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <button
          @click="showAddModal = true"
          class="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Station
        </button>
        <button class="bg-white shadow p-5 rounded-2xl">
            📍 View Map
        </button>
        <button class="bg-white shadow p-5 rounded-2xl">
            🔋 Sessions
        </button>
      </div>
    </div>

    <AddStationModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @refresh="fetchStations"
    />
  </div>
</template>