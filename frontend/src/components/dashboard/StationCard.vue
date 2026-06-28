<script setup>

import { useRouter } from "vue-router"

const props = defineProps({

    station:{
        type:Object,
        required:true
    }

})

const router = useRouter();

const viewStation = () => {
    // console.log(props.station)
    router.push(`/chargers/${props?.station._id}`)
}

</script>



<template>

<div class="bg-white rounded-2xl shadow border border-blue-100 p-5">
    <div class="flex justify-between">
        <div>
            <h3 class="font-bold text-lg text-gray-900">
                {{station.name}}
            </h3>

            <div class="text-gray-500 text-sm mt-1 ">
                <p>Latitude : {{station.location.lat || "Location unavailable"}}</p>
                <p>Longitude : {{station.location.long  || "Longitude unavailale"}}</p>
            </div>
        </div>
        <div>
            <span 
            :class="
            station.status === 'Active'
            ? 'bg-green-100 text-green-600'
            : 'bg-orange-100 text-orange-600'
            "
            class="px-3 py-1 rounded-full text-sm font-medium">
            {{station.status}}
            </span>
        </div>
    </div>
    <div class="mt-5 grid grid-cols-2 gap-4">
        <div class="bg-blue-50 rounded-xl p-3">
            <p class="text-gray-500 text-sm">
                Power Output
            </p>
            <h3 class="font-bold text-xl text-blue-600">
                {{station.powerOutput}} kW
            </h3>
        </div>
        <div class="bg-blue-50 rounded-xl p-3">
            <p class="text-gray-500 text-sm">
                Connector
            </p>
            <h3 class="font-semibold text-lg">
                {{station.connectorType || "N/A"}}
            </h3>
        </div>
    </div>
    <button
    @click="viewStation"
    class="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
        View Details
   </button>
</div>
</template>