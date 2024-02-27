<template>
  <section class="py-0">
    <div class="w-3/6 mx-auto">
      <h1 class="py-3 text-5xl font-bold text-center capitalize">Create new Account</h1>
      <form @submit.prevent="registerStudent">
        <div
          class="grid flex-col items-center justify-center grid-cols-2 px-12 py-12 capitalize bg-gray-200 rounded shadow gap-9">
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text">What is your Full Name?</span>
            </div>
            <input v-model.trim="data.fullName" type="text" placeholder="Type here"
              class="w-full max-w-xs input input-bordered" required />
          </label>
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text">Learner Reference Number?</span>
            </div>
            <input v-model.trim="data.lrn" type="number" placeholder="Type here"
              class="w-full max-w-xs input input-bordered" required />
          </label>
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text"> Your Complete address?</span>
            </div>
            <input v-model.trim="data.address" type="text" placeholder="Type here"
              class="w-full max-w-xs input input-bordered" required />
          </label>
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text"> Your Email Address?</span>
            </div>
            <input v-model="data.email" type="email" placeholder="Type here" class="w-full max-w-xs input input-bordered"
              required />
          </label>
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text">Your Contact?</span>
            </div>
            <input v-model="data.contact" type="number" placeholder="Type here"
              class="w-full max-w-xs input input-bordered" required />
          </label>
          <label class="w-full max-w-xs form-control">
            <div class="label">
              <span class="text-lg label-text">Your Secure Password?</span>
            </div>
            <input v-model="data.password" type="password" placeholder="Type here"
              class="w-full max-w-xs input input-bordered" required />
          </label>

          <!-- <div class="w-full px-20 pb-3">
            <p class="py-3 text-center">Dont have an account?</p>
            <button class="w-full text-lg btn btn-outline">Register</button>
          </div> -->
        </div>
        <div class="py-3 text-center">
          <input type="checkbox" />
          <span> I agree to the <a href="">Terms and Condition</a></span>
        </div>
        <div class="flex justify-end w-full gap-3 py-2">
          <button class="w-full text-lg font-bold btn btn-primary" type="submit">
            Register Account
          </button>
        </div>
        <div class="flex justify-center text-center">
          <router-link to="/student_login" class="w-full text-lg font-bold btn-outline">
            Already Registered? Login now
          </router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useStudentStore } from "@/stores/Student";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast()
const studentStore = useStudentStore();
const studentAuthStore = useStudentAuthStore();
const adminAuthStore = useAdminAuthStore();
const router = useRouter();
const data = reactive({
  fullName: "",
  lrn: "",
  address: "",
  email: "",
  password: "",
  contact: "",
});

const registerStudent = async () => {
  console.log("text");
  const registerForm = {
    fullName: data.fullName,
    learnerReferenceNumber: data.lrn,
    address: data.address,
    contact: data.contact,
    email: data.email,
    password: data.password,
    requestList: [],
  };
  await studentStore.registerAccount(registerForm);
  toast.success(
    "Account created",
    {
      timeout: 2000,
    },
    await router.push("/student_login")
  );

  data.fullName = "";
  data.lrn = "";
  data.address = "";
  data.contact = "";
  data.email = "";
  data.password = "";
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
})
</script>
