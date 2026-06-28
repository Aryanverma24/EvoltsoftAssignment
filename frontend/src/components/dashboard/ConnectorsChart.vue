<script setup>
import { computed } from "vue";

import { Doughnut } from "vue-chartjs";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(
  ArcElement,

  Tooltip,

  Legend
);

const props = defineProps({
  stations: {
    type: Array,
    default: [],
  },
});

const chartData = computed(() => {
  const ccs = props.stations.filter((s) => s.connectorType === "CCS").length;

  const type2 = props.stations.filter(
    (s) => s.connectorType === "Type2"
  ).length;

  return {
    labels: ["CCS", "Type2"],

    datasets: [
      {
        data: [ccs, type2],

        backgroundColor: ["#2563eb", "#22c55e"],

        borderWidth: 2,
      },
    ],
  };
});

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
</script>



<template>
  <div class="bg-white rounded-2xl p-6 shadow h-[320px]">
    <h2 class="font-bold text-xl mb-4">Connector Distribution</h2>

    <div class="h-[200px] flex justify-center">
      <Doughnut :data="chartData" :options="options" />
    </div>
  </div>
</template>