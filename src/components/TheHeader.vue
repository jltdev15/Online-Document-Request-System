<template>
  <section>
    <header class="bg-blue-800">
      <nav class="flex items-center justify-between md:px-12 text-gray-50">
        <router-link to="/" class="flex items-center gap-3 p-3">
          <img class="w-10 sm:w-[4rem]" src="../assets/images/pbc_logo.webp" alt="" />
          <p class="font-bold sm:text-xl">PBC Sunbeam School. Incorporated</p>
        </router-link>

        <ul v-show="!adminAuthStore.isAuthenticated && !studentAuthStore.isAuthenticatedStudent"
          class="items-center hidden gap-3 text-base md:flex">
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/admin_login" class="inline-block p-6 font-bold">
              Admin</router-link>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/student_login" href="" class="inline-block p-6 font-bold">Student</router-link>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/admin_dashboard" class="inline-block p-6 font-bold">
              About Us</router-link>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/student_dashboard" href="" class="inline-block p-6 font-bold">
              Contact Us</router-link>
          </li>
        </ul>
        <ul v-show="adminAuthStore.isAuthenticated" class="flex items-center gap-3 text-sm">
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <a href="" class="inline-block p-6 font-bold"> Profile</a>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <a href="javascript:void(0)" @click="adminAuthStore.submitLogout" class="inline-block p-6 font-bold">
              Logout</a>
          </li>
        </ul>
        <ul v-show="studentAuthStore.isAuthenticatedStudent" class="flex items-center gap-3 text-sm">
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <a href="" class="inline-block p-6 font-bold"> Student Profile</a>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <a href="javascript:void(0)" @click="adminAuthStore.submitLogout" class="inline-block p-6 font-bold">
              Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";

const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
adminAuthStore.checkAuth();
</script>
