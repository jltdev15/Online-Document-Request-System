<template>
  <section class="sm:h-[80svh] flex justify-center items-center">
    <div class="w-full pb-32">
      <h1 class="text-xl font-bold text-center p-9 sm:text-5xl">
        PBC Sunbeam School ODRS
      </h1>
      <div class="flex flex-col gap-12 p-6 mx-auto md:flex-row sm:w-3/6 justify-evenly">
        <div class="md:p-12">
          <h2 class="py-3 text-lg text-center">Are you Administrator?</h2>
          <router-link to="/admin_login"
            class="inline-block w-full py-3 font-bold text-center bg-blue-800 hover:bg-blue-700 transistion-all text-gray-50">
            Proceed here
          </router-link>
        </div>
        <div class="md:px-12">
          <h2 class="py-3 text-lg text-center">Are you Student?</h2>
          <router-link to="/student_login"
            class="inline-block w-full py-3 font-bold text-center bg-blue-800 hover:bg-blue-700 transistion-all px-9 text-gray-50">
            Proceed here
          </router-link>
        </div>
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

console.log("test");

onMounted(async () => {
  await studentAuthStore.checkAuthStudent();
  if (studentAuthStore.isAuthenticatedStudent) {
    return router.push('/student_dashboard')
  }

  await adminAuthStore.checkAuth()
  if (adminAuthStore.isAuthenticated) {
    return router.push('/admin_dashboard')
  }
});
</script>
