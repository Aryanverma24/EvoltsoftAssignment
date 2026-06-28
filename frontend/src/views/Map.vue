<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import api from "../api/axios";
import Sidebar from "../components/dashboard/Sidebar.vue"
import TopNavbar from "../components/dashboard/Topbar.vue"

const stations = ref([]);

let map;

const fetchStations = async () => {
  try {
    const res = await api.get("/chargers?limit=100");

    stations.value = res.data.data;

    initMap();
  } catch (error) {
    console.log(error);
  }
};

const initMap = () => {
  map = L.map("map", {
    zoomControl: false,
  }).setView([20.5937, 78.9629], 5);

  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(map);

  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

    {
      attribution: "&copy; OpenStreetMap",
    }
  ).addTo(map);

  // Custom EV Marker

  const evIcon = L.divIcon({
    html: `

        <div class="ev-marker">

            ⚡

        </div>

        `,

    className: "",

    iconSize: [40, 40],
  });

  stations.value.forEach((station) => {
    const marker = L.marker(
      [station.location.lat, station.location.long],

      {
        icon: evIcon,
      }
    ).addTo(map);

    marker.bindPopup(`

        <div class="popup-card">


            <h2>
            ${station.name}
            </h2>


            <div>
            ⚡ Power:
            ${station.powerOutput} KW
            </div>


            <div>
            🔌 Connector:
            ${station.connectorType}
            </div>


            <div>
            Status:
            <b>
            ${station.status}
            </b>
            </div>


        </div>

        `);
  });
};

onMounted(() => {
  fetchStations();
});
</script>




<template>
    <div class="min-h-screen bg-blue-50 flex flex-col md:flex-row">
        <!-- sidebar -->
        <div class="fixed left-0 top-0 h-screen w-64 z-50 hidden md:block">
            <Sidebar/>
        </div>

        <div class="block md:hidden">
            <TopNavbar />
        </div>
        <!-- content -->
        <div class="md:ml-64 md:h-screen overflow-y-auto w-full">
               <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800">
        EV Charging Network Map ⚡
      </h1>

      <p class="text-gray-500">Monitor all charging stations in real time</p>
    </div>

    <div class="flex justify-center">
        
    <div
      id="map"
      class="h-[600px] md:h-[400px] w-[1080px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 z-40"
    ></div>
    </div>
  </div>
        </div>
    </div>
  
</template>



<style>
.ev-marker {
  background: #16a34a;

  width: 40px;

  height: 40px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);

  border: 3px solid white;
}

.popup-card {
  font-family: Arial;

  min-width: 180px;
}

.popup-card h2 {
  font-size: 16px;

  font-weight: 700;

  margin-bottom: 10px;
}
</style>