<script setup>
import TheHeader from './components/TheHeader.vue';
</script>

<template>
<the-header></the-header>
<template>
  <section>
      <div>
          <h1>Welcome Admin!</h1>
          <div>
              <label for="">Username</label>
              <input type="text" placeholder="Admin username">
          </div>
      </div>
  </section>
</template>
<router-view></router-view>
</template>

<style scoped>


</style>
