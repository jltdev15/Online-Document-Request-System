<template>
  <section class="">
    <div class="w-2/6 mx-auto">
      <h1 class="py-12 text-5xl font-bold text-center">Welcome Admin!</h1>
      <form @submit.prevent="submitCredentials">
        <div
          class="flex flex-col items-center justify-center py-12 bg-gray-200 rounded shadow"
        >
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg font-bold label-text"
                >What is your Username?</span
              >
            </div>

            <input
              type="text"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              v-model.trim="adminuser"
              required
            />
          </label>
          <label class="w-full max-w-xs pt-3 form-control">
            <div class="label">
              <span class="text-lg font-bold label-text"
                >What is your Password?</span
              >
            </div>
            <input
              type="password"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              v-model.trim="adminpass"
              required
            />
          </label>
          <div class="w-full px-20 py-6">
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
import { useRouter } from "vue-router";

const adminAuthStore = useAdminAuthStore();
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
  console.log(adminAuthStore.isAuthenticated);
    if (adminAuthStore.isAuthenticated) {
    router.push("/admin_dashboard");
  }
});
</script>
