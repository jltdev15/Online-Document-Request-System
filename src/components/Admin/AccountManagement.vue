<template>
    <section class="container pt-24 pb-24 md:px-9">
        <div class="flex justify-between px-3 py-3">
            <div>
                <router-link to="/admin_dashboard" class="flex items-center gap-2 text-lg text-blue-800 btn-md"><i
                        class="fa-solid fa-arrow-left"></i> Dashboard</router-link>
            </div>
            <div class="">
                <button @click="adminAuthStore.toggleNewUserModal" class="text-lg btn btn-primary text-gray-50">
                    New user <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
        <!-- Navigation -->
        <div class="flex flex-col gap-4">
            <ul class="md:w-[30%] flex  h-5/6 bg-gray-100 rounded-md p-3">
                <li>
                    <router-link active-class="active" class="inline-block w-full p-3" to="view">View
                        users</router-link>
                </li>
                <li>
                    <router-link active-class="active" class="inline-block w-full p-3" to="settings">Admin
                        settings</router-link>
                </li>
            </ul>

            <div class="w-full">
                <router-view></router-view>
            </div>
        </div>
        <new-user-dialog :show="adminAuthStore.isNewUserModal" title="New User">
            <template #default>
                <div class="grid grid-cols-1 gap-3">

                    <label class="w-full max-w-xl col-span-2 col-start-1 form-control">
                        <div class="label">
                            <span class="font-bold label-text">Username</span>
                        </div>
                        <input v-model="adminAuthStore.newUser.username" type="text" placeholder="Username"
                            class="w-full max-w-xl input input-bordered" />
                    </label>
                    <label class="w-full max-w-xl col-span-2 col-start-1 form-control">
                        <div class="label">
                            <span class="font-bold label-text">Strong Password</span>
                        </div>
                        <input v-model="adminAuthStore.newUser.password" type="password" placeholder="Password"
                            class="w-full max-w-xl input input-bordered" />
                    </label>
                    <label class="w-full max-w-xl col-span-2 col-start-1 form-control">
                        <div class="label">
                            <span class="font-bold label-text">Verify Password</span>
                        </div>
                        <input v-model="adminAuthStore.newUser.confirm_password" required type="password"
                            placeholder="Verify password" class="w-full max-w-xl input input-bordered" />
                    </label>
                </div>
            </template>
            <template #actions>
                <button @click="adminAuthStore.toggleNewUserModal" class="text-gray-800 btn btn-outline">
                    Cancel
                </button>
                <button type="submit" @click="adminAuthStore.addNewUserHandler" class="btn btn-primary text-gray-50">
                    Create New user
                </button>
            </template>
        </new-user-dialog>
    </section>
</template>

<script setup>
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useRegistrarAuthStore } from "@/stores/Registrar";
import { onMounted } from "vue";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";
import NewUserDialog from "../UserManagement/NewUserDialog.vue";
const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
const registrarAuthStore = useRegistrarAuthStore();
const router = useRouter();

adminAuthStore.getUsers();

onMounted(async () => {
    await studentAuthStore.checkAuthStudent();

    if (studentAuthStore.isAuthenticatedStudent) {
        return router.push("/student_profile");
    }
    console.log(adminAuthStore.isAuthenticated);
    await adminAuthStore.checkAuth();
    if (adminAuthStore.isAuthenticated) {
        return router.push("/account-management");
    }
    await registrarAuthStore.checkAuthRegistrar();
    if (registrarAuthStore.isRegAuthenticated) {
        return router.push("/admin_dashboard");
    }
    router.push("/");
});
</script>

<style scoped>
.active {
    font-weight: 600;
    color: #ffffff;

    background-color: rgb(30 64 175);
}
</style>
