<template>
  <section class="bg-[url('./images/pbc.png')] bg-no-repeat bg-center">
    <div class="h-screen bg-gray-900 bg-opacity-50 blur-bg text-gray-50">
      <div class="px-3 mx-auto pt-28 md:pt-16 sm:w-4/6 md:w-7/12 lg:w-5/12 xl:w-4/12">
        <h1 class="py-4 text-2xl font-bold text-center sm:pt-12 lg:text-5xl 3xl:pt-12">
          Welcome Student
        </h1>
        <form @submit.prevent="submitCredentials">
          <div class="flex flex-col items-center p-6 lg:pt-3 rounded-xl">
            <div class="w-full max-w-xs sm:max-w-lg md:px-3 lg:px-12">
              <label class="w-full form-control">
                <div class="label">
                  <span class="text-lg font-bold label-text text-gray-50">What is your Username?</span>
                </div>
                <input v-model.trim="studentUser" type="text" placeholder="Username" required
                  class="w-full max-w-xs text-gray-800 sm:max-w-lg input input-bordered" />
              </label>
            </div>
            <div class="w-full max-w-xs sm:max-w-lg md:px-3 lg:px-12">
              <label class="w-full max-w-xs sm:max-w-lg form-control">
                <div class="label">
                  <span class="text-lg font-bold label-text text-gray-50">What is your Password?</span>
                </div>
                <input v-model.trim="studentPass" type="password" placeholder="Password" required
                  class="w-full max-w-xs text-gray-800 sm:max-w-lg input input-bordered" />
              </label>
            </div>
            <div class="w-full max-w-xs py-3 pt-6 sm:max-w-lg md:p-3 lg:px-12 xl:px-12">
              <button class="w-full text-lg font-bold btn btn-primary">Login</button>
            </div>
            <div class="w-full max-w-xs pb-3 sm:max-w-lg md:px-3 lg:px-12 xl:px-12">
              <p class="py-3 text-center text-gray-50">Dont have an account?</p>
              <router-link to="/student_registration"
                class="w-full text-lg btn btn-outline text-gray-50">Register</router-link>
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
const adminAuthStore = useAdminAuthStore();
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
  await studentAuthStore.checkAuthStudent();
  if (studentAuthStore.isAuthenticatedStudent) {
    return router.push("/student_dashboard");
  }
});
</script>

<style scoped>
.blur-bg {
  backdrop-filter: blur(0.1rem);
  /* Adjust the blur intensity */
}
</style>
