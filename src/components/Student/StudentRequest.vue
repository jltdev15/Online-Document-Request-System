<template>
  <section class="pt-24">
    <div class="mx-auto lg:p-6 lg:w-6/12">
      <div class="">
        <router-link class="flex items-center gap-2 px-3 py-3 bg-transparent" to="/student_dashboard"><i
            class="fa-solid fa-circle-arrow-left"></i>Back
          to Dashboard</router-link>
      </div>
      <div class="px-3 pb-6">
        <header class="py-3">
          <h1 class="py-3 text-3xl font-bold text-center rounded-lg md:bg-blue-800 md:text-gray-50">
            Student Request Form
          </h1>
        </header>
        <form @submit.prevent="uploadFile" enctype="multipart/form-dataß">
          <div class="">
            <div class="grid gap-6 md:grid-cols-3">
              <div class="flex flex-col gap-3">
                <label class="font-bold md:text-xl" for="document_type">Document Type</label>
                <select v-model.trim="documentType" class="w-full lg:max-w-xs select select-bordered">
                  <option selected value="">Choose Document</option>
                  <option value="COE">Certificate of Enrollment - P50</option>
                  <option value="COR">Certificate of Registration - P50</option>
                  <option value="CON">Certificate of Completion - P50</option>
                  <option value="SOA">Statement of Account - P50</option>
                  <option value="Diploma">Diploma - P100</option>
                  <option value="TOR">Transcript of Records - P100</option>
                  <option value="CGMC">Certificate of Good Moral Character - P50</option>
                </select>
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-base font-bold md:text-xl" for="last_school_year">S.Y. Attended</label>
                <select v-model.trim="year" class="w-full lg:max-w-xs select select-bordered">
                  <option selected value="">Choose Year</option>
                  <option v-for="item in yearsRange" :key="item">
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="hidden">
                <label class="my-3 font-bold text-center" for="">Select Date</label>
                <input v-model="adminStore.date" type="date" placeholder="Type here"
                  class="w-full max-w-xl input input-bordered" :min="adminStore.date" />
              </div>
              <div class="flex flex-col gap-3">
                <label class="font-bold md:text-xl" for="date_needed">Date Needed</label>
                <input v-model.trim="dateNeeded" class="w-full px-2 py-2 border rounded-lg lg:max-w-xs" type="date"
                  :min="date" name="date_needed" required />
              </div>
            </div>
            <div>
              <header class="pt-6 pb-3">
                <h2 class="text-xl font-bold">Purpose of Request</h2>
              </header>
              <div>
                <textarea v-model.trim="purpose" class="w-full p-3 border resize-none" name="purpose" id="purpose"
                  rows="4" placeholder="(eg. Scholarship, Graduation, etc.)" required></textarea>
              </div>
              <div class="p-3 mb-3 border">
                <input @change="handleFileUpload" type="file" name="supporting_document" accept="application/pdf"
                  id="supporting_document" ref="fileInput " />
              </div>
              <!-- <input type="submit" name="submit" value="Upload" /> -->
              <button class="w-full btn btn-primary" type="submit">Send Request</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosClient from "@/axiosClient";
import { useRouter } from "vue-router";
import { useStudentStore } from "@/stores/Student";
import { useToast } from "vue-toastification";
import { useAdminStore } from "../../stores/Admin";
const adminStore = useAdminStore();
const toast = useToast();
const router = useRouter();
const studentStore = useStudentStore();
const documentType = ref("");
const fileName = ref(null);
const year = ref("");
const dateNeeded = ref("");
const purpose = ref("");

const handleFileUpload = (event) => {
  fileName.value = event.target.files[0];
};

const uploadFile = async () => {
  const formData = new FormData();
  if (fileName.value) {
    formData.append("fileName", fileName.value);
  }
  formData.append("documentType", documentType.value);
  formData.append("dateCreated", adminStore.date);
  formData.append("year", year.value);
  formData.append("dateNeeded", dateNeeded.value);
  formData.append("purpose", purpose.value);
  try {
    await axiosClient.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(
      "Request sent",
      {
        timeout: 2000,
      },
      await router.push("/")
    );
    console.log("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
};
const years = ref("");
const date = ref("");
const yearsRange = ref([]);
for (let i = 1991; i <= 2025; i++) {
  years.value = i + "-" + (i + 1);
  yearsRange.value.push(years.value);
}

onMounted(async () => {
  const currentDate = new Date();
  date.value = currentDate.toISOString().split("T")[0];
});
</script>
