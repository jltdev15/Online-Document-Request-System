<template>
  <section>
    <header class="bg-blue-800">
      <nav class="flex justify-between text-gray-50 items-center px-12">
        <router-link to="/" class="p-3 flex items-center gap-3">
          <img class="w-[4rem]" src="../assets/images/pbc_logo.webp" alt="" />
          <p class="text-xl font-bold">PBC Sunbeam School. Incorporated</p>
        </router-link>
        <ul  class="flex items-center gap-3 text-base">
          <li class="hover:bg-gray-50 hover:text-gray-800 transition-all">
            <router-link
              to="/admin_login"
              class=" font-bold inline-block p-6"
            >
              Admin</router-link
            >
          </li>
          <li class="hover:bg-gray-50 hover:text-gray-800 transition-all">
            <router-link
              to="/student_login"
              href=""
              class=" font-bold inline-block p-6"
              >Student</router-link
            >
          </li>
          <li class="hover:bg-gray-50 hover:text-gray-800 transition-all">
            <router-link
              to="/admin_dashboard"
              class=" font-bold inline-block p-6"
            >
              About Us</router-link
            >
          </li>
          <li class="hover:bg-gray-50 hover:text-gray-800 transition-all">
            <router-link to="/student_dashboard" href="" class=" font-bold inline-block p-6">
              Contact Us</router-link>
          </li>
        </ul>
        <ul v-if="false" class="flex items-center gap-3 text-sm">
          <li class="hover:bg-gray-50 hover:text-gray-800 transition-all">
            <a href="" class="font-bold inline-block p-6"> Profile</a>
          </li>
          <li class="hover:bg-gray-50 hover:text-gray-800 transition-all">
            <a href="" class=" font-bold inline-block p-6"> Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  </section>
</template>
