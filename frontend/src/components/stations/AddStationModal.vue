<script setup>
    import { ref } from "vue";
    import api from "../../api/axios";

    import { useToast } from "vue-toastification";
    
    const toast = useToast();
    
    const emit = defineEmits(["close","refresh"]);

    const form = ref({
        name: "",
        status: "Active",
        powerOutput: "",
        connectorType: "",
        lat: "",
        long: ""
    })

    const createStation = async() => {
        try {
                const res = await api.post("/chargers",{
                name: form.value.name,
                status: form.value.status,
                powerOutput: form.value.powerOutput,
                connectorType: form.value.connectorType,
                location:{
                    lat : form.value.lat,
                    long: form.value.long,
                }
            })
            if(res.data){
                // close modal
            emit("close");

            // refresh station list
            emit("refresh");

            // optional: reset form
            form.value = {
                name:"",
                status:"Active",
                powerOutput:"",
                connectorType:"",
                lat:"",
                long:""
            };
            }
            toast.success("Station created successfully")
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }

</script>

<template>
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div class="bg-white w-full max-w-lg p-6 rounded-2xl">

        <h2 class="text-xl font-bold mb-4">Add Station</h2>

        <input v-model="form.name" placeholder="Name" class="w-full border p-2 mb-2 rounded-lg"/>

        <input v-model="form.powerOutput" type="number" placeholder="Power Output" class="w-full border p-2 mb-2 rounded-lg"/>

        <input v-model="form.connectorType" placeholder="Connector Type" class="w-full border p-2 mb-2 rounded-lg"/>

        <div class="grid grid-cols-2 gap-2">
            <input v-model="form.lat" placeholder="Latitude" class="border p-2 rounded-lg"/>
            <input v-model="form.long" placeholder="Longitude" class="border p-2 rounded-lg"/>
        </div>

        <div class="flex gap-3 mt-4">
            <button @click="$emit('close')" class="flex-1 border py-2 rounded-xl">Cancel</button>

            <button 
            @click="createStation" 
            class="flex-1 bg-blue-600 text-white py-2 rounded-xl">
                Save
            </button>
        </div>

    </div>

</div>
</template>
