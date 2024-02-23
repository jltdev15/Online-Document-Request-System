<template>
  <section class="h-[80svh] flex justify-center items-center ">
    <div class="w-full pb-32">
      <h1 class="text-center p-12 text-5xl font-bold">
        PBC Sunbeam School Online Document Request
      </h1>
      <div class="flex justify-evenly py-12 w-3/6 mx-auto">
        <div class="px-12">
          <h2 class="py-3 text-lg">Are you Administrator?</h2>
          <router-link to="/admin_login" class="bg-blue-800 hover:bg-blue-700 transistion-all w-full text-center text-gray-50 font-bold py-3 inline-block" > Proceed here </router-link>
        </div>
        <div class="px-12">
            <h2 class="py-3 text-lg text-center">Are you Student?</h2>
            <router-link to="/student_login" class="bg-blue-800 hover:bg-blue-700 transistion-all w-full text-center px-9 text-gray-50 font-bold py-3 inline-block" > Proceed here </router-link>
          </div>
      </div>
    </div>
  </section>
</template>
