<template>
    <section>
      <div class="w-7/12 p-6 mx-auto">
        <div class="">
          <router-link class="btn btn-outline" to="/student_dashboard"
            ><i class="fa-solid fa-circle-arrow-left"></i>Back to Dashboard</router-link
          >
        </div>
        <div class="pb-6">
          <header class="py-3">
            <h1
              class="py-6 text-3xl font-bold text-center bg-blue-800 rounded-lg text-gray-50"
            >
              Payment Details
            </h1>
          </header>
          <div class="p-3 bg-gray-100 rounded-lg">
            <div class="grid grid-cols-2 gap-6 py-6 ">
              <div class="p-3 border">
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
                    <input type="text" placeholder="Type here" class="w-full max-w-xs input input-bordered" />
                </div>
                <div>
                    <label for="">Date of Payment</label>
                    <input v-model="date" type="date" placeholder="Type here" class="w-full max-w-xs input input-bordered" />
                </div>
    
              </div>
              <div class="p-3 my-3 mb-3 border">
                <input
                  type="file"
                  name="supporting_document"
                  accept="application/pdf"
                  id="supporting_document"
                />
              </div>
              <div>
                <!-- <input type="submit" name="submit" value="Upload" /> -->
                <button class="w-full btn btn-primary" type="submit">
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
  