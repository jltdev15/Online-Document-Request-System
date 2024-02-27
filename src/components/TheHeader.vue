<template>
  <nav class="fixed top-0 z-50 w-full px-0 bg-blue-800 border-gray-200 shadow lg:px-6 sm:px-2 md:px-2 3xl:px-32">
    <section class="flex flex-wrap items-center justify-between py-3 mx-auto sm:py-0 md:static">
      <router-link to="/" class="flex items-center gap-3 p-3">
        <img class="w-12 sm:w-[4rem]" src="../assets/images/pbc_logo.webp" alt="" />
        <p class="text-lg font-bold sm:text-xl text-gray-50">PBC Sunbeam School Inc.</p>
      </router-link>
      <div :class="{ 'right-0': isNavShow, 'right-[-100%]': isNavHide }" id="main-nav"
        class="2xs:py-2 md:px-0 md:gap-2 lg:px-0 md:py-0 h-screen md:h-auto absolute capitalize bg-[#0245A3] text-gray-50 md:bg-transparent md:justify-between lg:justify-between  md:static md:flex top-[100%] lg:z-0 z-[999] animate__animated animate__fadeInLeft">
        <ul
          class="flex flex-col gap-6 px-6 py-12 text-base font-semibold text-gray-50 lg:text-base xs:px-12 md:gap-3 md:text-sm md:py-0 sm:text-lg md:text-gray-800 sm:px-16 md:items-center md:flex-row md:px-0 lg:gap-2">
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/admin_login" class="inline-block p-3 font-bold sm:p-6 text-gray-50">
              Admin</router-link>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/student_login" href=""
              class="inline-block p-3 font-bold sm:p-6 text-gray-50">Student</router-link>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/admin_dashboard" class="inline-block p-3 font-bold sm:p-6 text-gray-50">
              About Us</router-link>
          </li>
          <li class="transition-all hover:bg-gray-50 hover:text-gray-800">
            <router-link to="/student_dashboard" href="" class="inline-block p-3 font-bold sm:p-6 text-gray-50">
              Contact Us</router-link>
          </li>
        </ul>
      </div>
      <!-- Mobile Navigation -->
      <!-- <div class="md:hidden" aria-current="false">
        <button
          @click="toggleMobileNav"
          class="transition-all btnMobileNav animate__animated animate__rubberBand"
        >
          <i
            id="icon"
            class="text-2xl text-white fa-solid"
            :class="{ 'fa-bars': isShow, 'fa-xmark': isClose }"
          ></i>
        </button>
      </div> -->
      <div class="mr-3 md:hidden animate__animated animate__rubberBand" id="nav-icon1" @click="toggleMobileNav"
        :class="{ open: isNavShow, '': isNavHide }">
        <span class="bg-blue-50"></span>
        <span class="bg-blue-50"></span>
        <span class="bg-blue-50"></span>
      </div>
      <!-- Social Links -->
      <!-- <ul class="social-ul">
        <li class="social-li">
          <a class="social-links" href="#">
            <i class="fab fa-facebook-f icon"></i>
          </a>
        </li>
        <li class="social-li">
          <a class="social-links" href="#"><i class="fab fa-twitter icon"></i></a>
        </li>
        <li class="social-li">
          <a class="social-links" href="#"><i class="fab fa-linkedin-in icon"></i></a>
        </li>
        <li class="social-li">
          <a class="social-links" href="#"><i class="fab fa-google-plus-g icon"></i></a>
        </li>

      </ul> -->
    </section>
  </nav>
</template>
<script setup>
import { onMounted, ref } from "vue";

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
* {
  transition: 0.5s;
}

.social-ul {
  display: flex;
}

.social-ul .social-li {
  list-style: none;
}

.nav-li {
  position: relative;
}

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

.nav-link {
  transition: 0.2s;
}

.nav-link:hover {
  transform: scale(0.9);
}

.nav-link {
  position: relative;
}

.nav-link:hover::after {
  width: 50%;
}

.nav-link::after {
  content: "";
  right: 25%;
  bottom: 0;
  position: absolute;
  background-color: #0245a3;
  width: 0;
  height: 3px;
  border-radius: 20px;
  margin: 0 auto;

  transition: all 0.3s ease-in-out;
}
</style>
<!-- 
<style scoped>
.nav-link {
  position: relative;
}
.nav-link:hover::after {
  width: 50%;
}
.nav-link::after {
  content: "";
  right: 25%;
  bottom: 0;
  position: absolute;
  background-color: #0245a3;
  width: 0;
  height: 3px;
  border-radius: 20px;
  margin: 0 auto;

  transition: all 0.3s ease-in-out;
}
.shadow-bot {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
</style> -->
