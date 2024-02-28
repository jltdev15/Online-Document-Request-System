<template>
  <section class=" bg-[url('./images/pbc_logo.webp')]  bg-cover bg-center h-screen">
    <div class="h-screen bg-gray-900 bg-opacity-50 blur-bg text-gray-50">
      <div class="mx-auto pt-28 md:pt-16 lg:w-2/6">
        <h1 class="py-4 text-2xl font-bold text-center sm:py-12 lg:text-5xl">Welcome Student!</h1>
        <form @submit.prevent="submitCredentials">
          <div class="flex flex-col items-center justify-center py-6 rounded-2xl md:shadow md:bg-gray-200">
            <label class="w-full max-w-xs form-control">
              <div class="label">
                <span class="text-lg font-bold label-text text-gray-50 md:text-gray-500">What is your Username?</span>
              </div>
              <input v-model.trim="studentUser" type="text" placeholder="Type here" required
                class="w-full max-w-xs text-gray-800 input input-bordered" />
            </label>
            <label class="w-full max-w-xs form-control">
              <div class="label">
                <span class="text-lg font-bold label-text text-gray-50 md:text-gray-500">What is your Password?</span>
              </div>
              <input v-model.trim="studentPass" type="password" placeholder="Type here" required
                class="w-full max-w-xs text-gray-800 input input-bordered" />
            </label>
            <div class="w-full max-w-xs py-3 pt-6 sm:max-w-lg md:px-20">
              <button class="w-full text-lg font-bold btn btn-primary">
                Login
              </button>
            </div>
            <div class="w-full max-w-xs pb-3 sm:max-w-lg md:px-20">
              <p class="py-3 text-center text-gray-50 md:text-gray-500">Dont have an account?</p>
              <router-link to="/student_registration"
                class="w-full text-lg btn btn-outline text-gray-50 md:text-gray-500">Register</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useRouter } from "vue-router";

const studentAuthStore = useStudentAuthStore();
const adminAuthStore = useAdminAuthStore()
const router = useRouter();
const studentUser = ref("");
const studentPass = ref("");

const submitCredentials = async () => {
  const loginData = {
    learnerReferenceNumber: studentUser.value,
    password: studentPass.value,
  };
  await studentAuthStore.submitLogin(loginData);
};

onMounted(async () => {
  await adminAuthStore.checkAuth();
  if (adminAuthStore.isAuthenticated) {
    return router.push("/admin_dashboard");
  }
  await studentAuthStore.checkAuthStudent()
  if (studentAuthStore.isAuthenticatedStudent) {
    return router.push('/student_dashboard')
  }
});
</script>

<style scoped>
.blur-bg {
  backdrop-filter: blur(5px);
  /* Adjust the blur intensity */
}
</style>
