<template>
    <section class="container pb-24 pt-24 md:px-9">
        <header class="px-3 py-3 md:px-24">
            <router-link to="/student_dashboard"
                class="bg-blue-800 md:text-xl hover:text-gray-50 text-gray-50 btn-block hover:bg-blue-600 md:btn md:w-3/12 btn"><i
                    class="fa-solid fa-arrow-left"></i>Back to Dashboard</router-link>
        </header>
        <div class="px-3">
            <h1 class="pb-2 text-3xl font-bold text-center md:text-left md:px-24 md:text-5xl">
                Your Information
            </h1>
        </div>
        <div class="grid px-3 md:p-3 md:gap-3 md:px-24 md:grid-cols-2">
            <div class="grid grid-cols-2 gap-1 p-2 border md:border-1">
                <div class="py-3">
                    <label class="text-[0.7rem] md:text-base" for="">Learning Reference Number</label>

                    <input :class="{ border: studentAuthStore.isEdit }" :disabled="!studentAuthStore.isEdit"
                        class="p-1 font-bold bg-transparent text-xs md:text-xl" type="text"
                        v-model="studentAuthStore.profileData.lrn" />
                </div>
                <div class="py-3">
                    <label for="" class="text-[0.7rem] md:text-base">Full Name</label>

                    <input :class="{ border: studentAuthStore.isEdit }" :disabled="!studentAuthStore.isEdit"
                        class="p-1 font-bold text-xs bg-transparent md:text-xl" type="text"
                        v-model="studentAuthStore.profileData.name" />
                </div>
                <div class="py-3">
                    <label for="" class="text-[0.7rem] md:text-base">Address</label>
                    <!-- <p class="font-bold md:text-xl">{{ studentAuthStore.profileData.address }}</p> -->
                    <input :class="{ border: studentAuthStore.isEdit }" :disabled="!studentAuthStore.isEdit"
                        class="p-1 font-bold text-xs bg-transparent md:text-xl" type="text"
                        v-model="studentAuthStore.profileData.address" />
                </div>
                <div class="py-3">
                    <label for="" class="text-[0.7rem] md:text-base">Contact</label>
                    <!-- <p class="font-bold md:text-xl">{{ studentAuthStore.profileData.contact }}</p> -->
                    <input :class="{ border: studentAuthStore.isEdit }" :disabled="!studentAuthStore.isEdit"
                        class="p-1 text-xs font-bold bg-transparent md:text-xl" type="text"
                        v-model="studentAuthStore.profileData.contact" />
                </div>
                <div class="py-3">
                    <label for="" class="text-[0.7rem] md:text-base">Email</label>
                    <!-- <p class="font-bold md:text-xl">{{ studentAuthStore.profileData.email }}</p> -->
                    <input :class="{ border: studentAuthStore.isEdit }" :disabled="!studentAuthStore.isEdit"
                        class="p-1 font-bold text-xs bg-transparent md:text-xl" type="text"
                        v-model="studentAuthStore.profileData.email" />
                </div>
                <div class="flex justify-end col-span-2 gap-3 p-3">
                    <button v-if="!studentAuthStore.isEdit" @click="studentAuthStore.toggleEdit"
                        class="bg-blue-800 btn text-gray-50 hover:bg-blue-500">
                        Edit Profile
                    </button>
                    <button @click="studentAuthStore.toggleEdit" v-if="studentAuthStore.isEdit"
                        class="text-gray-500 btn btn-md btn-outline hover:bg-red-800">
                        Cancel
                    </button>
                    <button @click="studentAuthStore.updateProfileHandler" v-if="studentAuthStore.isEdit"
                        class="bg-green-800 hover:bg-green-500 btn btn-md text-gray-50">
                        Save Changes
                    </button>
                </div>
            </div>
            <div class="p-3 border md:py-9 md:px-9">
                <p class="px-3 text-3xl font-bold text-left md:text-center">Manage password</p>
                <div class="py-3">
                    <label class="flex items-center gap-2 input input-bordered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <input v-model="studentAuthStore.currentPassword" type="password" class="grow"
                            placeholder="Enter Old password here" />
                    </label>
                </div>
                <div class="py-3">
                    <label class="flex items-center gap-2 input input-bordered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <input v-model="studentAuthStore.newPassword" type="password" class="grow"
                            placeholder="Enter New password here" />
                    </label>
                </div>
                <div class="py-3">
                    <button class="bg-blue-800 btn btn-block text-gray-50 hover:bg-blue-500"
                        @click="studentAuthStore.changePasswordHandler">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { onMounted } from "vue";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";
const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
const router = useRouter();

onMounted(async () => {
    await studentAuthStore.checkAuthStudent();
    await adminAuthStore.checkAuth();
    if (studentAuthStore.isAuthenticatedStudent) {
        return router.push("/student_profile");
    }

    if (adminAuthStore.isAuthenticated) {
        return router.push("/admin_dashboard");
    }
    router.push("/");
});
</script>
