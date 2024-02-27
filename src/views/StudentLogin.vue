<template>
  <section class="">
    <div class="mx-auto lg:w-2/6">
      <h1 class="py-6 text-2xl font-bold text-center sm:py-12 lg:text-5xl">Welcome Student!</h1>
      <form @submit.prevent="submitCredentials">
        <div class="flex flex-col items-center justify-center py-12 rounded shadow md:bg-gray-200">
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text">What is your Username?</span>
            </div>
            <input v-model.trim="studentUser" type="text" placeholder="Type here"
              class="w-full max-w-xs input input-bordered" />
          </label>
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text">What is your Password?</span>
            </div>
            <input v-model.trim="studentPass" type="password" placeholder="Type here"
              class="w-full max-w-xs input input-bordered" />
          </label>
          <div class="w-full max-w-xs py-3 pt-6 md:px-20">
            <button class="w-full text-lg font-bold btn btn-primary">
              Login
            </button>
          </div>
          <div class="w-full max-w-xs pb-3 md:px-20">
            <p class="py-3 text-center">Dont have an account?</p>
            <router-link to="/student_registration" class="w-full text-lg btn btn-outline">Register</router-link>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";

const studentAuthStore = useStudentAuthStore();
const router = useRouter();
const studentUser = ref("");
const studentPass = ref("");

const submitCredentials = async () => {
  const loginData = {
    learnerReferenceNumber: studentUser.value,
    password: studentPass.value,
  };
  await studentAuthStore.submitLogin(loginData);
  router.push("/student_dashboard");
};

onMounted(async () => {
  await studentAuthStore.checkAuthStudent();
  console.log(studentAuthStore.isAuthenticatedStudent);
  if (studentAuthStore.isAuthenticatedStudent) {
    router.push("/student_dashboard");
  }
});
</script>
