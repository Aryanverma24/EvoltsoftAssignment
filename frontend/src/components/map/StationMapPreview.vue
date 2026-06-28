<script setup>
import { onMounted } from "vue";
import L from "leaflet";

const props = defineProps({
  lat: Number,

  long: Number,

  name: String,
});

onMounted(() => {
  const map = L.map("station-preview", {
    zoomControl: false,

    dragging: false,

    scrollWheelZoom: false,
  }).setView([props.lat, props.long], 14);

  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

    {
      attribution: "&copy; OpenStreetMap",
    }
  ).addTo(map);

  const marker = L.marker([props.lat, props.long]).addTo(map);

  marker.bindPopup(props.name);
});
</script>

<template>
  <div
    id="station-preview"
    class="h-[280px] w-full rounded-2xl overflow-hidden"
  ></div>
</template>