<template>
  <section class="pt-28">
    <div class="mx-auto md:w-3/6">
      <h1 class="py-6 text-2xl font-bold text-center capitalize lg:text-5xl">Create new Account</h1>
      <form @submit.prevent="registerStudent">
        <div
          class="grid gap-3 px-6 py-6 capitalize rounded shadow md:justify-center md:items-center md:px-12 md:grid-cols-2 md:bg-gray-200 md:gap-6">
          <label class="w-full md:max-w-xs form-control">
            <div class="label">
              <span class="text-lg font-bold label-text">What is your Full Name?</span>
            </div>
            <input v-model.trim="data.fullName" type="text" placeholder="Type here"
              class="w-full lg:max-w-xs input input-bordered" required />
          </label>
          <label class="w-full lg:max-w-xsform-control">
            <div class="label">
              <span class="text-lg font-bold label-text">Learner Reference Number?</span>
            </div>
            <input v-model.trim="data.lrn" type="number" placeholder="Type here"
              class="w-full lg:max-w-xs input input-bordered" required />
          </label>
          <label class="w-full lg:max-w-xs form-control">
            <div class="label">
              <span class="text-lg font-bold label-text"> Your Complete address?</span>
            </div>
            <input v-model.trim="data.address" type="text" placeholder="Type here"
              class="w-full lg:max-w-xs input input-bordered" required />
          </label>
          <label class="w-full lg:max-w-xs form-control">
            <div class="label">
              <span class="text-lg font-bold label-text"> Your Email Address?</span>
            </div>
            <input v-model.trim="data.email" type="email" placeholder="Type here"
              class="w-full lg:max-w-xs input input-bordered" required />
          </label>
          <label class="w-full lg:max-w-xs form-control">
            <div class="label">
              <span class="text-lg font-bold label-text">Your Contact?</span>
            </div>
            <input v-model.trim="data.contact" type="number" placeholder="Type here"
              class="w-full lg:max-w-xs input input-bordered" required />
          </label>
          <label class="w-full lg:max-w-xs form-control">
            <div class="label">
              <span class="text-lg font-bold label-text">Your Secure Password?</span>
            </div>
            <input v-model.trim="data.password" type="password" placeholder="Type here"
              class="w-full lg:max-w-xs input input-bordered" required />
          </label>

          <!-- <div class="w-full px-20 pb-3">
            <p class="py-3 text-center">Dont have an account?</p>
            <button class="w-full text-lg btn btn-outline">Register</button>
          </div> -->
        </div>
        <div class="py-3 text-center">
          <input type="checkbox" :disabled="!studentStore.isEnabled" :checked="isChecked" required
            @click="checkHandler" />
          <span> I agree to the <a href="javascript:void(0)" @click="studentStore.showCondition"
              class="text-blue-700">Terms and
              Condition</a></span>
        </div>
        <terms-and-condition :show="studentStore.isConditionShow" title="Terms and Conditions">
          <template #default>
            <div class="overflow-auto h-[50vh]">
              <h2>PBC Document Requisition Terms and Conditions</h2>
              <p>
                <strong class="text-center">Acceptance of Terms:</strong>
              <ul>
                <li>By accessing or using the Online Document Request System (PBC ODRS), you agree to comply with and be
                  bound by these terms and conditions.</li>
                <li>The ODRS is intended for use by authorized users only. Users must provide accurate and complete
                  information during the registration process.</li>
                <li>Users are responsible for maintaining the confidentiality of their login credentials. Any activity
                  that occurs under a user's account is their responsibility.</li>
                <li>Users agree to submit accurate and valid requests for documents. Misuse or abuse of the system may
                  result in suspension or termination of access.</li>
                <li>Information provided through the PBC ODRS will be used solely for the purpose of fulfilling document
                  requests. Personal information will be handled in accordance with the privacy policy.</li>
                <li>Users are prohibited from violating or attempting to violate the security of the PBC ODRS. Any
                  unauthorized access or use may result in legal action.</li>
                <li>These terms and conditions may be modified at any time. Users will be notified of any significant
                  changes, and continued use of the PBC ODRS after such modifications constitutes acceptance of the
                  updated terms.</li>
                <li>The system administrators reserve the right to terminate or suspend access to the ODRS at any time,
                  with or without cause.</li>
              </ul>
              <ul>By using the PBC ODRS, you acknowledge that you have read, understood, and agree to be bound by these
                terms and conditions.
              </ul>

              </p>
              <div class="py-3">
                <button @click="studentStore.hideCondition"
                  class="w-full py-3 font-bold bg-gray-400 text-gray-50">Accept</button>
              </div>
            </div>
          </template>
        </terms-and-condition>
        <div class="flex justify-end w-full gap-3 px-6 py-2">
          <button :disabled="!isChecked" class="w-full text-lg font-bold btn btn-primary" type="submit">
            Register Account
          </button>

        </div>
        <div class="flex justify-center py-3 text-center">
          <router-link to="/student_login" class="w-full text-lg font-bold btn-outline">
            Already Registered? Login now
          </router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useStudentStore } from "@/stores/Student";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import TermsAndCondition from '@/views/TermsAndCondition.vue'
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
const isChecked = ref(false)
const isConditionShow = ref(false);
const isEnabled = ref(false);
const checkHandler = async () => {
  isChecked.value = !isChecked.value;
  console.log(isChecked.value);
}
const registerStudent = async () => {
  console.log(data.lrn.toString().length);
  if (data.lrn.toString().length < 12) {
    return toast.error('LRN must be 12 digits', {
      timeout: 1500,
    })
  }
  if (data.lrn.toString().length > 12) {

    return toast.error('LRN must not exceed 12 digits', {
      timeout: 1500,
    })
  }
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
