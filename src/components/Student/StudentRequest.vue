<template>
  <section>
    <div class="w-6/12 mx-auto p-6">
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
            Student Request Form
          </h1>
        </header>
        <div class="">
          <div class="grid grid-cols-3 gap-6">
            <div class="flex flex-col gap-3">
              <label class="font-bold text-xl" for="document_type"
                >Document Type</label
              >
              <select class="select select-bordered w-full max-w-xs">
                <option value="COE">Certificate of Enrollment - P50</option>
                <option value="COR">Certificate of Registration - P50</option>
                <option value="CON">Certificate of Completion - P50</option>
                <option value="SOA">Statement of Account - P50</option>
                <option value="Diploma">Diploma - P100</option>
                <option value="TOR">Transcript of Records - P100</option>
                <option value="CGMC">
                  Certificate of Good Moral Character - P50
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-3">
              <label class="font-bold text-xl" for="last_school_year"
                >S.Y. Attended</label
              >
              <select class="select select-bordered w-full max-w-xs">
                <option v-for="item in yearsRange" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-3">
              <label class="font-bold text-xl" for="date_needed"
                >Date Needed</label
              >
              <input
                class="border py-2 px-2 rounded-lg w-full max-w-xs"
                type="date"
                :min="date"
                name="date_needed"
                required
                v-model="date"
              />
            </div>
          </div>
          <div>
            <header class="pt-6 pb-3">
              <h2 class="text-xl font-bold">Purpose of Request</h2>
            </header>
            <div>
              <textarea
                class="w-full border p-3 resize-none"
                name="purpose"
                id="purpose"
                rows="4"
                placeholder="(eg. Scholarship, Graduation, etc.)"
                required
              ></textarea>
            </div>
            <div class="border p-3 mb-3">
              <input
                type="file"
                name="supporting_document"
                accept="application/pdf"
                id="supporting_document"
              />
            </div>
            <!-- <input type="submit" name="submit" value="Upload" /> -->
            <button class="btn w-full btn-primary" type="submit">
              Send Request
            </button>
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
