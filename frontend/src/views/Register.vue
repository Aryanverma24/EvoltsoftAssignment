<script setup>
    import { ref } from "vue";
    import Login from './Login.vue'
    import api from "../api/axios.js"
    import { useRouter } from "vue-router";
    import { useToast } from "vue-toastification";

    const toast = useToast();

    const router = useRouter()

    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const error = ref("");
    const loading = ref(false);

    const register = async() => {
        try {
            loading.value = true;
            error.value = "";

            if(password.value !== confirmPassword.value){
                error.value = "Password do not match";
                return;
            }
            const res = await api.post("/auth/register",{
                name:name.value,
                email:email.value,
                password:password.value
            });

            localStorage.setItem("token",res.data.token);
            toast.success("User Registered")
            router.push("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed")
        }
        finally{
            loading.value = false
        }
    }

</script>

<template>
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-5">
            <div class="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100">
                <!-- left side -->
                <div class="hidden md:flex flex-col justify-center p-8 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
                   <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-600 text-2xl shadow">⚡
                        </div>
                        <h1 class="text-3xl font-bold text-white">
                            VoltCharge
                        </h1>
                    </div>
                    <h2 class="text-4xl font-bold text-white leading-tight">Join the future of 
                        <span class="text-blue-100">electric mobility</span>
                    </h2>

                    <p class="text-blue-100 mt-5 text-lg">Create your account and manage EV Charging stations with powerful smart tools</p>

                    <div class="mt-10 space-y-4">
                        <div class="text-white flex gap-3">
                            <span class="text-blue-200">✓</span>
                                Easy charging station management
                            </div>
                        <div class="text-white flex gap-3">
                            <span class="text-blue-200">✓</span>
                               Monitor EV infrastructure anytime
                            </div>
                        <div class="text-white flex gap-3">
                            <span class="text-blue-200">✓</span>
                                Secure and scalable platform
                            </div>
                    </div>
                </div>

                <!-- right side -->
                <div class="px-8 py-4">

                    <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>

                    <p class="text-gray-500 mt-2">Register to access VoltCharge dashboard</p>

                    <p v-if="error" class="mt-2 text-red-500 bg-red-50 p-3 rounded-lg">{{error}}</p>

                    <form @submit.prevent="register"
                    class="mt-4 space-y-3 mb-3">
                    <div>
                        <label class="text-gray-700 text-sm font-medium">Full Name</label>
                        <input v-model="name" type="text" required placeholder="Enter your full name" 
                        class="mt-2 w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-900 outline-none focus:border-blue-500 focus-ring-2 focus:ring-blue-200">
                    </div>
                    <div>
                        <label class="text-gray-700 text-sm font-medium">Email</label>
                        <input v-model="email" type="email" required placeholder="enter your email here" 
                        class="mt-2 w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-900 outline-none focus:border-blue-500 focus-ring-2 focus:ring-blue-200">
                    </div>
                    <div>
                        <label class="text-gray-700 text-sm font-medium">Password</label>
                        <input v-model="password" type="password" required placeholder="enter password" 
                        class="mt-2 w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-900 outline-none focus:border-blue-500 focus-ring-2 focus:ring-blue-200">
                    </div>
                    <div>
                        <label class="text-gray-700 text-sm font-medium">Confirm Password</label>
                        <input v-model="confirmPassword" type="password" required placeholder="enter password again" 
                        class="mt-2 w-full px-4 py-3 rounded-xl border bg-gray-50 border-gray-200 text-gray-900 outline-none focus:border-blue-500 focus-ring-2 focus:ring-blue-200">
                    </div>
                    <button type="submit" 
                            :disabled="loading"
                            class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-md shadow-blue-700">
                        <span v-if="!loading">
                            Create Account
                        </span>
                        <span v-else>
                            Creating...
                        </span>
                    </button>
                    </form>
                    <div class="mt-3 flex justify-center text-gray-600">
                        Already have an account?
                        <router-link to="/login">
                            <span class="text-blue-500 ml-1.5 hover:underline font-medium">
                                Login now
                            </span>
                        </router-link>
                    </div>
                     <div class="mt-4 text-center text-gray-400 text-sm "> © 2026 VoltCharge EV Platform
                    </div> 
                </div>
            </div>
        </div>
</template>