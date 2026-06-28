<script setup>

import Sidebar from "../components/dashboard/Sidebar.vue";
import TopNavbar from "../components/dashboard/Topbar.vue";
import StationCard from "../components/dashboard/StationCard.vue";

import AddStationModal from "../components/stations/AddStationModal.vue"

import api from "../api/axios";

import { ref,onMounted } from "vue";



const stations = ref([]);

const loading = ref(false);
const error = ref("");

const currentPage = ref(1);
const totalPages = ref(1);

const activeFilter = ref("all")
const showFilters = ref(false)

const showAddModal = ref(false);

const search = ref("");

let searchTimer;
// search 
const handleSearch = () => {
    clearTimeout(searchTimer);
    searchTimer= setTimeout(()=> {
        currentPage.value = 1;
        fetchStations();
    },600)
}

const filters = ref({
    connectorType:"",
    minPower:"",
})

const applyFilter = ()=> {
    currentPage.value = 1;
    fetchStations();
    showFilters.value = false
}

const clearFilter = () => {
    filters.value= {
        connectorType : "",
        minPower:"",
    }   
    currentPage.value=1;
    fetchStations();
}

const setFilter = (status) => {
    activeFilter.value = status;
    currentPage.value = 1;
    
    fetchStations();
}

const fetchStations = async()=>{
    try{
        loading.value=true;
        error.value="";
        console.log("Clicked")
        let url = `/chargers?page=${currentPage.value}&limit=9`;
    //filter
        if(activeFilter.value !== 'all'){
            url += `&status=${activeFilter.value}`;
        }
    //connector type
        if(filters.value.connectorType){
            url += `&connectorType=${filters.value.connectorType}`
        }
    //powerOutput
          if(filters.value.minPower){
            url += `&powerOutput=${filters.value.minPower}`
        }
    //search
    if(search.value){
        url += `&search=${search.value}`
    }

        const res = await api.get(url);
        
        stations.value = res.data.data;
        totalPages.value = res.data.pagination.pages;
    }
    catch(err){
            error.value = err.response?.data?.message || "Failed to fetch stations";
            }
    finally{
        loading.value=false;
        }
}

const nextPage = ()=>{
    if(currentPage.value < totalPages.value){
    currentPage.value++;
    fetchStations();
    }
}

const prevPage = ()=>{
    if(currentPage.value > 1){
    currentPage.value--;
    fetchStations();
    }
}

onMounted(()=>{
    fetchStations();
})
</script>


<template> 
   <div class="min-h-screen bg-blue-50 flex">
    
    <!-- SIDEBAR -->
       <div class="fixed left-0 top-0 h-screen w-64 z-50">
            <Sidebar/>
        </div>
    <!-- CONTENT -->
    <div class="ml-64 h-screen overflow-y-auto w-full">
        <div class="p-6 py-2">
            <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mt-8 mb-6">
                <div>
                    <h2 class="text-2xl font-bold">
                        Charging Stations
                    </h2>

                <!-- FILTER BUTTONS -->
                <div class="flex gap-3 mt-4">
                    <button
                        @click="setFilter('all')"
                        :class="activeFilter==='all'
                        ?'bg-blue-600 text-white'  : 'bg-white text-gray-700'"
                        class="px-5 py-2 rounded-xl shadow border">
                            All
                    </button>

                    <button
                        @click="setFilter('Active')"
                        :class="activeFilter==='Active'
                        ?'bg-green-600 text-white'
                        :'bg-white text-gray-700 hover:bg-green-100'"
                        class="px-5 py-2 rounded-xl shadow border cursor-pointer ">
                            Active
                    </button>

                    <button
                        @click="setFilter('Inactive')"
                        :class="activeFilter==='Inactive'
                        ?'bg-orange-600 text-white' :'bg-white text-gray-700 hover:bg-red-100'"
                        class="px-5 py-2 rounded-xl shadow border cursor-pointer ">
                            Inactive
                    </button>
                    <button
                    @click="showFilters=true"
                    class="bg-white border shadow px-5 py-3 rounded-xl cursor-pointer hover:bg-blue-50">
                    ⚙ Filters
                    </button>
                </div>
            
                </div>

            <div class="flex gap-3 mt-8">
                <input 
                    v-model="search"
                    @input="handleSearch"
                    placeholder="Search station..."
                    class="px-4 py-3 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-blue-300"
                    />
                   <button
                        @click="showAddModal = true"
                        class="bg-blue-600 text-white px-5 py-3 rounded-xl">
                            + Add Station
                    </button>
            </div>
    </div>
        <!-- LOADING -->
            <div v-if="loading"
                class="text-blue-600">
                    Loading stations...
            </div>
    
    <!-- ERROR -->
        <div v-if="error"
            class="bg-red-100 text-red-600 p-4 rounded-xl">
                {{error}}
        </div>
    
    <!-- CARDS -->
        <div
            v-if="!loading"
            class="grid md:grid-cols-3 gap-6">
                <StationCard
                    v-for="station in stations"
                    :key="station._id"
                    :station="station"
                />
        </div>

    <!-- PAGINATION -->
        <div class="flex justify-center items-center gap-5 mt-10 pb-10">
            <button
                @click="prevPage"
                :disabled="currentPage===1"
                class="px-5 py-2 rounded-xl bg-white shadow border disabled:opacity-50">
                    ← Previous
            </button>

        <span class="font-semibold">
            Page {{currentPage}} / {{totalPages}}
        </span>
        
        <button
            @click="nextPage"
            :disabled="currentPage===totalPages"
            class="px-5 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50">
                Next →
        </button>
        </div>
    </div>
</div>

<!-- model -->
    <div v-if="showFilters"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        
        <div class="bg-white w-full max-w-md rounded-3xl p-8 shadow-xl">
            <div class="flex justify-between mb-6">
                <h2 class="text-2xl font-bold">
                    Filter Stations
                </h2>
        
                <button
                    @click="showFilters=false">
                        ✕
                </button>
            </div>

            <div class="space-y-5">
                <div>
                    <label class="text-sm text-gray-500">
                        Connector Type
                    </label>
                    <select
                        v-model="filters.connectorType"
                        class="w-full mt-2 border rounded-xl px-4 py-3">
                        <option value="">
                            All
                        </option>
                        
                        <option value="Type2">
                            Type 2
                        </option>
    
                        <option value="CCS">
                            CCS
                        </option>
            
                        <option value="CHAdeMO">
                            CHAdeMO
                        </option>
                    </select>
                </div>
            <div>
            
            <label class="text-sm text-gray-500">
                Minimum Power Output
            </label>
            
            <input
                v-model="filters.minPower"
                type="number"
                placeholder="eg. 50"
                class="w-full mt-2 border rounded-xl px-4 py-3"
            />
        </div>
            <div class="flex gap-3 mt-6">
            <button
                @click="clearFilter"
                class="flex-1 border py-3 rounded-xl">
                    Clear
            </button>

            <button
                @click="applyFilter"
                class="flex-1 bg-blue-600 text-white py-3 rounded-xl">
                    Apply
            </button>
        </div>
    </div>
</div>
</div>
<!-- add Modal -->
<AddStationModal
    v-if="showAddModal"
    @close="showAddModal = false"
    @refresh="fetchStations"
/>
</div>
</template>