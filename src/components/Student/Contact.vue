<template>
    <section class="pt-32">
        <div class="w-full sm:w-7/12 mx-auto sm:p-6">
            <h1 class="text-5xl pb-3 text-center sm:text-7xl font-bold sm:pb-16">Contact Us</h1>
            <div class="px-3 border py-3">
                <p class="text-base sm:text-lg sm:pb-3">You may contact the following:</p>
                <p class="flex text-lg items-center font-bold py-2 gap-3 sm:text-3xl">
                    <i class="fa-regular fa-envelope"></i>pbcsunbeamschoolshs@gmail.com
                </p>
                <p class="flex font-bold items-center py-2 gap-3 sm:text-3xl">
                    <i class="fa-solid fa-phone"></i>(044) 795 2753
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";
const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
const router = useRouter();
onMounted(async () => {
    await studentAuthStore.checkAuthStudent();

    if (studentAuthStore.isAuthenticatedStudent) {
        return router.push("/contact");
    }
    await adminAuthStore.checkAuth();
    if (adminAuthStore.isAuthenticated) {
        return router.push("/admin_dashboard");
    }
    router.push("/");
});
</script>
