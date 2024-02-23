<template>
  <section class="">
    <div class="w-2/6 mx-auto">
      <h1 class="text-center text-5xl font-bold py-12">Welcome Admin!</h1>
      <div class="flex justify-center flex-col items-center py-12 shadow rounded bg-gray-200">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text text-lg">What is your Username?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text text-lg">What is your Password?</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <div class="py-6 w-full px-20">
            <button class="w-full btn btn-primary text-xl font-bold">Login</button>
        </div>
      </div>
    </div>
  </section>
</template>
