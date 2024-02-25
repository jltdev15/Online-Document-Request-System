<template>
  <section>
    <div class="w-7/12 mx-auto p-6">
      <div class="">
        <router-link class="btn btn-outline" to="/student_dashboard"
          ><i class="fa-solid fa-circle-arrow-left"></i>Back to
          Dashboard</router-link
        >
      </div>
      <div class="pb-6">
        <header class="py-3">
          <h1
            class="text-center rounded-lg text-gray-50 font-bold py-6 text-3xl bg-blue-800"
          >
            Your Feedback Matters
          </h1>
        </header>
        <div class="bg-gray-100 p-3 rounded-lg">
          <div class="grid grid-cols-3 gap-6 py-0">
            <div>
              <label class="font-bold" for="">Request ID</label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label class="font-bold" for="">Date of Feedback</label>
              <input
                v-model="date"
                type="date"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label class="font-bold" for="">Rating</label>
              <select class="select select-bordered w-full max-w-xs">
                <option value="">Select rating</option>
                <option value="5">Very Satisfactory</option>
                <option value="4">Satisfactory</option>
                <option value="3">Neutral</option>
                <option value="2">Dissatisfactory</option>
                <option value="1">Very Dissatisfactory</option>
              </select>
            </div>
          </div>
          <div class="py-6">
            <h2 class="font-bold text-xl">Comment and Suggestions:</h2>
            <textarea
              class="w-full border p-3 resize-none"
              name="purpose"
              id="purpose"
              rows="4"
              placeholder="(eg. Scholarship, Graduation, etc.)"
              required
            ></textarea>
          </div>
          <div>
            <!-- <input type="submit" name="submit" value="Upload" /> -->
            <button class="btn w-full btn-primary" type="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
const years = ref("");
const date = ref("");
const yearsRange = ref([]);
for (let i = 1980; i <= 2200; i++) {
  years.value = i + "-" + (i + 1);
  yearsRange.value.push(years.value);
}

onMounted(async () => {
  const currentDate = new Date();
  date.value = currentDate.toISOString().split("T")[0];
});
</script>
