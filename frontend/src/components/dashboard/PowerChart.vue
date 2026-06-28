<script setup>
import { computed } from "vue";

import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const props = defineProps({
  stations: Array,
});

const chartData = computed(() => ({
  labels: props.stations.map((item) => item.name.slice(0, 10)),

  datasets: [
    {
        label: "Power KW",
        data: props.stations.map((item) => item.powerOutput),
        backgroundColor:"#2563eb",
        borderColor:"#1d4ed8",
        borderWidth:2,
        borderRadius:8
    },
  ],
}));
</script>



<template>
  <div class="bg-white rounded-2xl p-6 shadow md:h-[300px]">
    <h2 class="font-bold text-xl mb-4">Power Output</h2>
    <Bar :data="chartData" />
  </div>
</template>