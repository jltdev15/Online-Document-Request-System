<template>
    <section>
      <div class="w-7/12 mx-auto p-6">
        <div class="">
          <router-link class="btn btn-outline" to="/student_dashboard"
            ><i class="fa-solid fa-circle-arrow-left"></i>Back to Dashboard</router-link
          >
        </div>
        <div class="pb-6">
          <header class="py-3">
            <h1
              class="text-center rounded-lg text-gray-50 font-bold py-6 text-3xl bg-blue-800"
            >
              Payment Details
            </h1>
          </header>
          <div class="bg-gray-100 p-3 rounded-lg">
            <div class="grid grid-cols-2 gap-6 py-6 ">
              <div class="border p-3">
                <p>
                    <strong>Gcash</strong>
                    <ul><strong>Gcash Name:</strong> Juan Dela Cruz</ul>
                    <ul><strong>Gcash Number:</strong> 0909-090-9090</ul>
                    <strong>Bank Transfer</strong>
                    <ul><strong>Bank Name:</strong> Juan Dela Cruz</ul>
                    <ul><strong>Bank Number:</strong> 0909-00090-9090</ul>
                </p>
              </div>
              <div>
              <div class="flex gap-3">
                <div>
                    <label for="">Request ID</label>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label for="">Date of Payment</label>
                    <input v-model="date" type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                </div>
    
              </div>
              <div class="border p-3 mb-3 my-3">
                <input
                  type="file"
                  name="supporting_document"
                  accept="application/pdf"
                  id="supporting_document"
                />
              </div>
              <div>
                <!-- <input type="submit" name="submit" value="Upload" /> -->
                <button class="btn w-full btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
        
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
  