<script setup>
import { computed } from "vue";

import { Pie } from "vue-chartjs";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },

  inactive: {
    type: Number,
    default: 0,
  },
});

const chartData = computed(() => ({
  labels: ["Active", "Inactive"],

  datasets: [
    {
      data: [props.active, props.inactive],
      backgroundColor: ["#22c55e", "#ef4444"],
    },
  ],
}));

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
  <div class="bg-white rounded-2xl p-6 shadow h-[300px]">
    <h2 class="font-bold text-xl mb-4">Station Status</h2>
    <div class="flex justify-center h-[200px]">
    <Pie  :data="chartData" :options="options" />
    </div>
  </div>
</template>