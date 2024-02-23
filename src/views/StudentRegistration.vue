<template>
  <section class="py-0">
    <div class="w-3/6 mx-auto">
      <h1 class="text-center text-5xl font-bold py-3 capitalize">
        Create new Account
      </h1>
      <div
        class="grid capitalize grid-cols-2 gap-9 px-12 justify-center flex-col items-center py-12 shadow rounded bg-gray-200"
      >
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text text-lg">What is your Full Name?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text text-lg">Learner Reference Number?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text text-lg"> Your Complete address?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
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
            <span class="label-text text-lg"> Your Email Address?</span>
          </div>
          <input
            type="email"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text text-lg">Your Secure Password?</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </label>

        <!-- <div class="pb-3 w-full px-20">
            <p class="text-center py-3">Dont have an account?</p>
            <button class="btn btn-outline w-full text-lg">Register</button>
          </div> -->
      </div>
      <div class="text-center py-3">
        <input type="checkbox" />
        <span> I agree to the <a href="">Terms and Condition</a></span>
      </div>
      <div class="py-2 w-full flex gap-3">
        <router-link to="/student_login" class="w-3/6 btn btn-outline text-lg font-bold">
          Already Registered? Login now
        </router-link>
        <button class="w-3/6 btn btn-primary text-lg font-bold">
          Register Account
        </button>
      </div>
    </div>
  </section>
</template>
