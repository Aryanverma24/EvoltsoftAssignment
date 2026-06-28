<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import StationMapPreview from "../components/map/StationMapPreview.vue";
import api from "../api/axios";

const route = useRoute();
const router = useRouter();

const station = ref(null);
const user = ref(null);

const loading = ref(false);
const error = ref("");

const showModel = ref(false);

const form = ref({
  name: "",
  status: "",
  powerOutput: "",
  connectorType: "",
  lat: "",
  long: "",
});

const fetchStation = async () => {
  try {
    loading.value = true;

    const id = route.params.id;
    const res = await api.get(`/chargers/${id}`);
    station.value = res.data.data;
  } catch (err) {
    error.value = err?.response?.data?.message || "Failed to fetch station";
  } finally {
    loading.value = false;
  }
};

const fetchMe = async () => {
  try {
    const res = await api.get("/auth/me");
    user.value = res.data.user;
  } catch (error) {
    console.log(error);
  }
};

const canEdit = computed(() => {
  return (
    user.value && station.value && user.value._id === station.value.createdBy
  );
});

const goBack = () => {
  router.back();
};

const openEdit = () => {
  console.log("btn clicked");

  form.value = {
    name: station.value.name,
    status: station.value.status,
    powerOutput: station.value.powerOutput,
    long: station?.value.location?.long,
    lat: station?.value.location?.lat,
    connectorType: station.value.connectorType,
  };
  showModel.value = true;
};

const updateStation = async () => {
  try {
    const res = await api.put(`/chargers/${station.value._id}`, {
      name: form.value.name,
      status: form.value.status,
      powerOutput: form.value.powerOutput,
      connectorType: form.value.connectorType,
      location: {
        lat: form.value.lat,
        long: form.value.long,
      },
    });
    if (res.data.success) {
      showModel.value = false;
      fetchStation();
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteStation = async () => {
  try {
    const res = await api.delete(`/chargers/${station.value._id}`);
    router.back();
  } catch (error) {
    console.log(error);
  }
};

const getDirection = () => {
  const lat = station.value.location.lat;
  const long = station.value.location.long;

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`,
    "_blank"
  );
};

onMounted(() => {
  fetchStation();
  fetchMe();
});
</script>

   <template>
  <div class="min-h-screen bg-blue-50 p-4 md:p-8">
    <!-- BACK -->

    <button
      @click="goBack"
      class="mb-6 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
    >
      ← Back to Stations
    </button>

    <!-- LOADING -->

    <div
      v-if="loading"
      class="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow animate-pulse"
    >
      <div class="h-10 bg-gray-200 rounded w-1/3"></div>

      <div class="h-5 bg-gray-200 rounded w-1/2 mt-5"></div>
    </div>

    <!-- ERROR -->

    <div
      v-if="error"
      class="max-w-xl mx-auto bg-red-100 text-red-600 p-5 rounded-2xl"
    >
      {{ error }}
    </div>

    <!-- MAIN CARD -->

    <div
      v-if="station"
      class="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden"
    >
      <!-- HEADER -->

      <div
        class="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-white flex flex-col md:flex-row justify-between gap-5"
      >
        <div>
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl"
            >
              ⚡
            </div>

            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ station.name }}
              </h1>

              <p class="text-gray-500 mt-1">
                📍 {{ station.location?.lat }},
                {{ station.location?.long }}
              </p>
            </div>
          </div>
        </div>

        <span
          :class="
            station.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          "
          class="h-fit px-5 py-2 rounded-full font-semibold text-sm"
        >
          ● {{ station.status }}
        </span>
      </div>

      <!-- STATS -->

      <div class="grid md:grid-cols-3 gap-5 p-6 md:p-8">
        <div class="bg-blue-50 rounded-2xl p-5">
          <p class="text-gray-500 text-sm">Power Output</p>

          <h2 class="text-3xl font-bold text-blue-600 mt-2">
            {{ station.powerOutput }}

            <span class="text-lg"> KW </span>
          </h2>
        </div>

        <div class="bg-blue-50 rounded-2xl p-5">
          <p class="text-gray-500 text-sm">Connector</p>

          <h2 class="text-2xl font-bold mt-3">
            🔌 {{ station.connectorType }}
          </h2>
        </div>

        <div class="bg-blue-50 rounded-2xl p-5">
          <p class="text-gray-500 text-sm">Availability</p>

          <h2 class="text-2xl font-bold mt-3 text-green-600">Available</h2>
        </div>
      </div>

      <!-- EXTRA DETAILS -->

      <div class="p-6 md:p-8 grid md:grid-cols-2 gap-6">
        <!-- Charging Info -->

        <div class="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
          <h3 class="text-xl font-bold mb-5">⚡ Charging Information</h3>

          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-500"> Charging Speed </span>

              <span class="font-semibold"> Fast Charging </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-500"> Connector Support </span>

              <span class="font-semibold">
                {{ station.connectorType }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-500"> Output Capacity </span>

              <span class="font-semibold text-blue-600">
                {{ station.powerOutput }} KW
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-500"> Current Status </span>

              <span
                :class="
                  station.status === 'Active'
                    ? 'text-green-600'
                    : 'text-red-500'
                "
                class="font-semibold"
              >
                {{ station.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Station Info -->

        <div class="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
          <h3 class="text-xl font-bold mb-5">🏢 Station Information</h3>

          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-500"> Station ID </span>

              <span class="font-semibold text-sm truncate max-w-[180px]">
                {{ station._id }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-500"> Created </span>

              <span class="font-semibold">
                {{ new Date(station.createdAt).toLocaleDateString() }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-500"> Last Updated </span>

              <span class="font-semibold">
                {{ new Date(station.updatedAt).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- LOCATION -->

      <div class="mt-10 mx-8">
        <h3 class="text-xl font-bold mb-4">📍 Location Details</h3>

        <div 
        @click="getDirection"
        class="cursor-pointer">          
            <!-- MAP -->
          <div class="bg-white rounded-2xl shadow border border-blue-100 p-3">
            <StationMapPreview
              :lat="station.location.lat"
              :long="station.location.long"
              :name="station.name"
            />
          </div>
      </div>
      </div>

      <!-- ACTIONS -->

      <div class="p-6 md:p-8 flex flex-col sm:flex-row justify-end gap-3">
        <button
          v-if="canEdit"
          @click="openEdit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          ✏️ Edit Station
        </button>

        <button
          v-if="canEdit"
          @click="deleteStation"
          class="border border-red-500 text-red-500 px-6 py-3 rounded-xl hover:bg-red-50 transition"
        >
          Delete
        </button>

        <button
          @click="getDirection"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          📍 Get Direction
        </button>
      </div>
    </div>
  </div>
</template>