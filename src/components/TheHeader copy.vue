<template>
  <section>
    <header class="bg-blue-800">
      <nav class="flex items-center justify-between md:px-12 text-gray-50">
        <router-link to="/" class="flex items-center gap-3 p-3">
          <img class="w-10 sm:w-[4rem]" src="../assets/images/pbc_logo.webp" alt="" />
          <p class="text-sm font-bold sm:text-xl">PBC Sunbeam School. Incorporated</p>
        </router-link>
        <div :class="{ 'right-0': isNavShow, 'right-[-100%]': isNavHide }"
          class="2xs:py-2 md:px-0 md:gap-2 lg:px-0 md:py-0 h-screen md:h-auto absolute capitalize bg-[#0245A3] text-gray-50 md:bg-transparent md:justify-between lg:justify-between  md:static md:flex top-[100%] lg:z-0 z-[999] animate__animated animate__fadeInLeft">
          <!-- <ul v-show="!adminAuthStore.isAuthenticated && !studentAuthStore.isAuthenticatedStudent" -->
          <ul
            class="flex flex-col gap-6 px-6 py-12 text-base font-semibold lg:text-base xs:px-12 md:gap-3 md:text-sm md:py-0 sm:text-lg md:text-gray-800 sm:px-16 md:items-center md:flex-row md:px-0 lg:gap-2">
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
          <!-- <ul v-show="adminAuthStore.isAuthenticated" class="items-center gap-3 text-sm md:flex">
            <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
              <a href="" class="inline-block p-6 font-bold"> Profile</a>
            </li>
            <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
              <a href="javascript:void(0)" @click="adminAuthStore.submitLogout" class="inline-block p-6 font-bold">
                Logout</a>
            </li>
          </ul>
          <ul v-show="studentAuthStore.isAuthenticatedStudent" class="items-center gap-3 text-sm md:flex">
            <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
              <a href="" class="inline-block p-6 font-bold"> Student Profile</a>
            </li>
            <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
              <a href="javascript:void(0)" @click="adminAuthStore.submitLogout" class="inline-block p-6 font-bold">
                Logout</a>
            </li>
          </ul> -->
        </div>
        <div class="mr-3 md:hidden animate__animated animate__rubberBand" id="nav-icon1" @click="toggleMobileNav"
          :class="{ open: isNavShow, '': isNavHide }">
          <span class="bg-blue-100"></span>
          <span class="bg-blue-100"></span>
          <span class="bg-blue-100"></span>
        </div>
      </nav>
    </header>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";

const adminAuthStore = useAdminAuthStore();
const studentAuthStore = useStudentAuthStore();
adminAuthStore.checkAuth();

const isShow = ref(true);
const isClose = ref(false);
const isNavShow = ref(false);
const isNavHide = ref(true);

function toggleMobileNav() {
  isShow.value = !isShow.value;
  isClose.value = !isClose.value;
  isNavShow.value = !isNavShow.value;
  isNavHide.value = !isNavHide.value;
}
</script>

<style scoped>
#nav-icon1 {
  width: 1.8rem;
  height: 1.6rem;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

#nav-icon1 span {
  position: absolute;
  height: 2px;
  width: 100%;

  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
  top: 0px;
}

#nav-icon1 span:nth-child(2) {
  top: 10px;
}

#nav-icon1 span:nth-child(3) {
  top: 20px;
}

#nav-icon1.open span:nth-child(1) {
  top: 10px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

#nav-icon1.open span:nth-child(3) {
  top: 10px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
</style>