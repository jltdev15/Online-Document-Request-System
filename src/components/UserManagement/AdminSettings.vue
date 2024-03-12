<template>
    <section class="container pb-24 md:px-9">

        <div class="px-3">
            <h1 class="pb-2 text-3xl font-bold text-center md:text-left md:px-24 md:text-5xl">
                Manage account
            </h1>
        </div>
        <div class="grid px-3 md:p-3 md:gap-3 md:px-24 md:grid-cols-2">
            <div class="p-3 border md:py-9 md:px-9">
                <p class="px-3 text-3xl font-bold text-left md:text-center">Manage username</p>
                <div class="py-3">
                    <label class="flex items-center gap-2 input input-bordered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input v-model="adminAuthStore.currentUsername" type="text" class="grow"
                            placeholder="Enter current username" required />
                    </label>
                </div>
                <div class="py-3">
                    <label class="flex items-center gap-2 input input-bordered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input v-model="adminAuthStore.newUsername" type="text" class="grow"
                            placeholder="Enter New username" required />
                    </label>
                </div>
                <div class="py-3">
                    <button class="bg-blue-800 btn btn-block text-gray-50 hover:bg-blue-500"
                        @click="adminAuthStore.changeUserNameHandler">
                        Change Username
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
                        <input v-model="adminAuthStore.currentPassword" type="password" class="grow"
                            placeholder="Enter Old password here" required />
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
                        <input v-model="adminAuthStore.newPassword" type="password" class="grow"
                            placeholder="Enter New password here" required />
                    </label>
                </div>
                <div class="py-3">
                    <button class="bg-blue-800 btn btn-block text-gray-50 hover:bg-blue-500"
                        @click="adminAuthStore.changeAdminPasswordHandler">
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
    // await studentAuthStore.checkAuthStudent();
    // await adminAuthStore.checkAuth();
    // // if (studentAuthStore.isAuthenticatedStudent) {
    // //     return router.push("/student_profile");
    // // }
    // console.log(adminAuthStore.isAuthenticated);
    // if (adminAuthStore.isAuthenticated) {
    //     return router.push("/admin_profile");
    // }
    // router.push("/");
});
</script>
