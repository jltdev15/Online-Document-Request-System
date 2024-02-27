<template>
  <section class="pt-24">
    <div class="mx-auto lg:w-2/6">
      <h1 class="py-6 text-2xl font-bold text-center md:py-12 md:text-5xl">Welcome Admin!</h1>
      <form @submit.prevent="submitCredentials">
        <div class="flex flex-col items-center justify-center py-6 rounded md:shadow lg:bg-gray-200">
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg font-bold label-text">What is your Username?</span>
            </div>

            <input type="text" placeholder="Type here" class="w-full max-w-xs input input-bordered"
              v-model.trim="adminuser" required />
          </label>
          <label class="w-full max-w-xs pt-3 form-control">
            <div class="label">
              <span class="text-lg font-bold label-text">What is your Password?</span>
            </div>
            <input type="password" placeholder="Type here" class="w-full input input-bordered" v-model.trim="adminpass"
              required />
          </label>
          <div class="w-full px-6 py-6 xs:px-20">
            <button class="w-full text-xl font-bold btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";

const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
const router = useRouter();
const adminuser = ref("");
const adminpass = ref("");
adminAuthStore.checkAuth();
const submitCredentials = async () => {
  const loginData = {
    userName: adminuser.value,
    password: adminpass.value,
  };
  await adminAuthStore.submitLogin(loginData);
  router.push("/admin_dashboard");
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
