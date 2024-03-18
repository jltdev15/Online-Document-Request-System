<template>
  <div class="bg-[url('./images/home-bg.png')] bg-cover h-screen bg-center backdrop-blur-2xl z-[-999]">
    <div class="h-screen bg-gray-900 bg-opacity-25 rounded-lg blur-bg text-gray-50">
      <section class="sm:h-[80svh] pt-32 md:pt-24 flex justify-center items-center">
        <div class="w-full pb-0">
          <h1 class="p-3 text-xl font-bold text-center text-gray-800 lg:text-gray-50 py-9 sm:text-5xl">
            PBC Sunbeam School ODRS
          </h1>
          <div class="flex flex-col gap-12 p-6 mx-auto md:flex-row sm:w-5/6 justify-evenly">
            <div class="md:p-0">
              <h2
                class="flex items-center justify-center gap-3 py-3 text-lg font-bold text-center text-gray-800 bg-white">
                Administrator<i class="fa-solid fa-unlock"></i>
              </h2>
              <router-link to="/admin_login"
                class="inline-block w-full py-3 font-bold text-center bg-blue-800 hover:bg-blue-700 transistion-all px-9 text-gray-50">
                Proceed here <i class="fa-solid fa-arrow-right-long"></i>
              </router-link>
            </div>
            <div class="md:p-0">
              <h2
                class="flex items-center justify-center gap-3 py-3 text-lg font-bold text-center text-gray-800 bg-white">
                School Registrar<i class="fa-solid fa-address-card"></i>
              </h2>
              <router-link to="/registrar-login"
                class="inline-block w-full py-3 font-bold text-center bg-blue-800 hover:bg-blue-700 transistion-all px-9 text-gray-50">
                Proceed here <i class="fa-solid fa-arrow-right-long"></i>
              </router-link>
            </div>
            <div class="md:p-0">
              <h2
                class="flex items-center justify-center gap-3 py-3 text-lg font-bold text-center text-gray-800 bg-white">
                Student<i class="fa-solid fa-user-graduate"></i>
              </h2>
              <router-link to="/student_login"
                class="inline-block w-full py-3 font-bold text-center bg-blue-800 hover:bg-blue-700 transistion-all px-9 text-gray-50">
                Proceed here <i class="fa-solid fa-arrow-right-long"></i>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";
import { useRegistrarAuthStore } from "@/stores/Registrar";
const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
const registrarAuthStore = useRegistrarAuthStore();
const router = useRouter();

console.log("test");

onMounted(async () => {
  await studentAuthStore.checkAuthStudent();
  if (studentAuthStore.isAuthenticatedStudent) {
    return router.push("/student_dashboard");
  }

  await adminAuthStore.checkAuth();
  if (adminAuthStore.isAuthenticated) {
    return router.push("/admin_dashboard");
  }
  await registrarAuthStore.checkAuthRegistrar();
  if (registrarAuthStore.isRegAuthenticated) {
    return router.push("/admin_dashboard");
  }
});
</script>

<style scoped>
.blur-bg {
  backdrop-filter: blur(1px);
  /* Adjust the blur intensity */
}
</style>
