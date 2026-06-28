<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import Register from "./Register.vue"
import api from "../api/axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const login = async()=>{
    try{
        loading.value = true;
        error.value = "";
        const res = await api.post("/auth/login",
            {
                email:email.value,
                password:password.value
            }
        );
        localStorage.setItem("token",res.data.token);
        toast.success("Login Successfully");
        router.push("/dashboard");
    }
   catch(error){
        toast.error(
          error.response?.data?.message || "Login failed"
        );  
    }
    finally{
        loading.value=false;
        email.value="";
        password.value="";
    }
}
</script>

<template>
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-5">
            <div class="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100">

            <!-- LEFT SIDE -->
            <div class="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
              <div>
                <div class="flex items-center gap-3 mb-8">

                    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-600 text-2xl shadow">⚡</div>
                        <h1 class="text-3xl font-bold text-white">VoltCharge</h1>
                    </div>

                    <h2 class="text-4xl font-bold text-white leading-tight">
                        Powering the future of <span class="text-blue-100">electric mobility</span>
                    </h2>

                    <p class="text-blue-100 mt-5 text-lg">
                            Manage EV charging stations, monitor locations and optimize energy usage from one dashboard.
                    </p>
                    
                    <div class="mt-10 space-y-4">
                        <div class="text-white flex gap-3">
                            <span class="text-blue-200">✓</span>
                            Real-time charging station monitoring
                        </div>
                    
                    <div class="text-white flex gap-3">
                        <span class="text-blue-200">✓</span>
                        Smart location based management
                    </div>
                    
                    <div class="text-white flex gap-3">
                        <span class="text-blue-200">
                            ✓</span> Secure EV infrastructure platform
                    </div>
                </div>
                </div>
            </div>

            <!-- RIGHT LOGIN -->

            <div class="p-8 md:p-12">
                <h2 class="text-3xl font-bold text-gray-900">Welcome Back </h2>
                <p class="text-gray-500 mt-2">
                    Login to your charging station dashboard
                </p>
                <p v-if="error" class="mt-5 text-red-500 bg-red-50 p-3 rounded-lg">{{error}}</p>
                
                <form @submit.prevent="login" class="mt-8 space-y-5">

                    <div>
                        <label class="text-gray-700 text-sm font-medium">Email</label>
                            <input  v-model="email" required type="email" placeholder="admin@voltcharge.com" 
                            class="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/> 
                    </div>

                     <div>
                        <label class="text-gray-700 text-sm font-medium">Password</label>
                            <input  v-model="password" required minlength="6" type="password" placeholder="************" 
                            class="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/> 
                    </div>

                    <button type="submit" :disabled="loading" 
                        class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-md shadow-blue-700" >
                        <span v-if="!loading"> Login </span>
                        <span v-else>Authenticating...</span>
                    </button>
                </form>
                <div class="mt-3 flex justify-center">
                    Do not have an account. 
                    <router-link to="/register">
                    <span class="text-blue-500 ml-1.5 hover:underline font-medium"> Register now</span>
                    </router-link>
                </div>

                <div class="mt-4 text-center text-gray-400 text-sm "> © 2026 VoltCharge EV Platform
                    </div> 
            </div> 
        </div>
    </div>
</template>