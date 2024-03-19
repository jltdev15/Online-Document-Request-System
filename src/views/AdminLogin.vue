<template>
  <section class="bg-[url('./images/pbc.png')] bg-no-repeat bg-center">
    <div class="h-screen bg-gray-900 bg-opacity-50 blur-bg text-gray-50">
      <div class="pt-24">
        <h1 class="py-6 text-2xl font-bold text-center md:py-9 md:text-5xl">
          Administrator <i class="text-yellow-400 fa-solid fa-unlock"></i>
        </h1>
        <form @submit.prevent="submitCredentials">
          <div class="flex flex-col items-center justify-center lg:w-[30%] mx-auto md:rounded-xl">
            <label class="w-full max-w-xs form-control">
              <div class="label">
                <span class="text-lg font-bold text-white label-text">What is your Username?</span>
              </div>

              <input type="text" placeholder="Username" class="w-full max-w-xs text-gray-800 input input-bordered"
                v-model.trim="adminuser" required />
            </label>
            <label class="w-full max-w-xs pt-3 form-control">
              <div class="label">
                <span class="text-lg font-bold text-white label-text">What is your Password?</span>
              </div>
              <input type="password" placeholder="Password" class="w-full text-gray-800 input input-bordered"
                v-model.trim="adminpass" required />
            </label>
            <div class="w-full max-w-xs py-3 pt-6 lg:max-w-full md:px-0 xl:px-8 2xl:px-14">
              <button type="submit" class="w-full text-xl font-bold btn btn-primary">
                Login
              </button>
            </div>
            <div class="px-3 py-1 mt-3 text-base text-gray-800 rounded bg-gray-50">
              <p class="text-gray-700">Can't access your account?<span @click="toggleProvider"
                  class="pl-1 font-bold text-blue-500 cursor-pointer">Click
                  here</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
    <contact-provider :show="isProviderOpen" title="Contact Provider">
      <template #default>
        <div class="px-3 py-3 bg-gray-50">
          <h1 class="text-xl font-bold">Lets talk</h1>
          <a href="tel:+63 922-320-3524" class="text-blue-900 sm:text-lg">+63 922-320-3524 , </a>
          <a href="tel:+63
            922-320-352" class="text-blue-900 sm:text-lg">+63
            922-320-3524</a>
        </div>
        <div class="px-3 py-3 bg-gray-50">
          <h1 class="font-bold sm:text-xl">Software Support</h1>
          <div class="items-center justify-between sm:flex">
            <p class="py-2 text-blue-900 sm:text-xl">sdrsbsiscapstoneproject@gmail.com</p>
            <a class="bg-blue-800 btn hover:bg-blue-500 text-gray-50"
              href="mailto:sdrsbsiscapstoneproject@gmail.com">Send us
              email</a>
          </div>
        </div>
        <div class="flex justify-center text-xl">
          <button @click="toggleProvider" class="py-3 text-base text-red-700">
            Close
          </button>
        </div>
      </template>

    </contact-provider>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";
import ContactProvider from "@/UI/BaseDialog.vue";

const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
const router = useRouter();
const adminuser = ref("");
const adminpass = ref("");
const isProviderOpen = ref(false)
adminAuthStore.checkAuth();
const submitCredentials = async () => {
  const loginData = {
    userName: adminuser.value,
    password: adminpass.value,
  };
  await adminAuthStore.submitAdminLogin(loginData);
  // router.push("/admin_dashboard");
};

const toggleProvider = async () => {
  isProviderOpen.value = !isProviderOpen.value;
}

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
  backdrop-filter: blur(1px);
  /* Adjust the blur intensity */
}
</style>
