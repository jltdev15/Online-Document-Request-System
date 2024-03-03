<template>
  <section class="px-3 pt-24 mx-auto md:w-10/12">
    <header class="flex items-center justify-between gap-3 py-3">
      <div class="">
        <h1>Welcome Student</h1>
        <h2 class="text-3xl font-bold">Dashboard</h2>
      </div>
      <div>
        <button @click="isGuideLineShow = !isGuideLineShow" class="btn btn-primary text-gray-50">
          Create Request <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </header>

    <div v-if="isGuideLineShow" id="guidelinesModal" class="modal1">
      <div class="modal-content1">
        <span @click="isGuideLineShow = !isGuideLineShow"
          class="float-right px-3 py-1 text-3xl text-red-700 border rounded-full cursor-pointer border-1 close1">&times;</span>
        <div class="guidelines">
          <h2>Guidelines in Requesting Document</h2>
          <b>1. Requests shall be for regular processing only:</b><br />
          Regular processing days shall be 10 working days. Working days exclude
          Saturdays, Sundays, Holidays, and Christmas break.<br />
          <b>2. Provide a Detailed Description:</b><br />
          Clearly explain the purpose and context of the document. Include any
          specific requirements or details that the document should contain.
          Attached documents request slip if available.<br />
          <b>3. Provide Contact Information:</b><br />
          Include your contact information in case there are any questions or
          clarifications needed regarding the request.<br />
          Keep your communication professional and concise. Avoid unnecessary
          information and be respectful in your tone.<br />
          <b>4. Requested Documents:</b>

          <div class="table1-container">
            <table class="word-table">
              <colgroup>
                <col style="width: 40%" />
                <col style="width: 30%" />
                <col style="width: 30%" />
              </colgroup>
              <tr>
                <th>Type of Documents</th>
                <th>Estimated Processing Days</th>
                <th>Cost</th>
              </tr>
              <tr>
                <td>Certificate of Enrollment</td>
                <td>5 days</td>
                <td>P 50.00</td>
              </tr>
              <tr>
                <td>Certificate of Completion</td>
                <td>7 days</td>
                <td>P 50.00</td>
              </tr>
              <tr>
                <td>Statement of Account</td>
                <td>7 days</td>
                <td>P 50.00</td>
              </tr>
              <tr>
                <td>Diploma</td>
                <td>7 days</td>
                <td>P 50.00</td>
              </tr>
              <tr>
                <td>Transcript of Records</td>
                <td>7 days</td>
                <td>P 50.00</td>
              </tr>
              <tr>
                <td>Certificate of Good Moral Character</td>
                <td>7 days</td>
                <td>P 50.00</td>
              </tr>
              <!-- Add more rows as needed -->
            </table>
          </div>

          <p><b>Reminders:</b></p>
          <li>Bring 1 valid ID in claiming the requested documents.</li>
          <li>
            In claiming a document through a representative, Authorization
            letter and valid IDs of Claimants and Requestor are required.
          </li>
          <br />

          Payment:<br />
          Gcash:<br />
          Account Name:<br />
          QR Code:<br />
          Contact Numbers:<br />
          Registrar: <br />
          <div class="flex justify-center py-3">
            <router-link to="/student_request" class="w-5/12 py-3 mx-auto btn btn-outline">Agree</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="py-9">
      <EasyDataTable :headers="headers" :items="studentStore.requestList" :rows-per-page="5" border-cell
        table-class-name="customize-table" header-text-direction="left">
        <template #item-operation="item">
          <div v-if="item.status === 'Approved'" class="my-2 w-[10rem]">
            <button v-if="item.proof === ''" @click="studentStore.toggleUpdatePayment(item)"
              class="w-full bg-red-700 btn hover:bg-red-500 text-gray-50">
              <i class="fa-solid fa-peso-sign text-center text-[0.8rem] font-bold"></i>Make Payment
            </button>
            <p v-else>No action needed</p>
          </div>

          <div v-if="item.status === 'Rejected'" class="flex justify-start my-3">
            <p class="text-gray-80">No action needed</p>
          </div>
          <div v-if="item.status === 'Pending'" class="flex justify-start my-3">
            <p class="text-gray-80">No action needed</p>
          </div>
          <div v-if="item.status === 'Processing'" class="flex justify-start my-3">
            <p class="text-gray-80">No action needed</p>
          </div>
          <div v-if="item.status === 'Done'" class="flex justify-start my-3">
            <p class="text-gray-80">No action needed</p>
          </div>
          <div v-if="item.status === 'Completed'" class="flex justify-start my-3">
            <p class="text-gray-80">No action needed</p>
          </div>
        </template>

        <template #item-remarks="item">
          <div v-if="item.status === 'Completed'" class="flex justify-start my-3">
            <p class="text-gray-80">Document received</p>
          </div>
          <div v-if="item.status === 'Done'" class="flex justify-start my-3">
            <p class="text-gray-80">Your document is ready</p>
          </div>
          <div v-if="item.status === 'Processing'" class="flex justify-start my-3">
            <p class="text-gray-80">Payment Received! Waiting document to be ready</p>
          </div>
          <div v-if="item.status === 'Rejected'" class="flex justify-start my-3">
            <p class="text-gray-80">{{ item.remarks }}</p>
          </div>
          <div v-if="item.status === 'Pending'" class="my-2 text-center w-[10rem]">
            <p class="text-gray-80">Your request has been received</p>
          </div>
          <div v-if="item.status === 'Approved'" class="flex justify-start my-3">
            <p v-if="item.proof === ''" class="text-gray-80">Waiting for payment</p>
            <p v-else>Document is on process.</p>
          </div>
        </template>

        <template #item-date="item">
          <p v-if="item.pickUpDate === ''">Not set</p>
          <p else>
            {{ item.pickUpDate }}
          </p>
        </template>
      </EasyDataTable>
      <payment-dialog :show="studentStore.isPaymentShow" title="Payment">

        <template #default>
          <div class="">
            <div class="p-3 text-base border">
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

              </div>
              <label for="" class="text-base font-bold">Upload Proof of payment</label>
              <p class="text-sm text-gray-500 font-extralight">Only JPEG or PNG format (5MB max size)</p>
              <div class="p-1 mt-3 mb-6 border">

                <input class="text-sm md:text-base" @change="handleFileUpload" type="file" name="supporting_document"
                  accept="image/x-png,image/jpeg" id="supporting_document" />
                <p v-if="isFileSizeExceed" class="p-1 text-red-800">Files size exceeded. Please upload other files
                </p>
              </div>

              <div class="flex flex-col gap-3">
                <button @click="uploadProof" class="w-full text-base btn btn-primary" type="submit">
                  Submit<i class="fa-solid fa-arrow-right"></i>
                </button>
                <button @click="studentStore.toggleUpdatePayment" class="w-full btn btn-outline" type="submit">
                  Cancel
                </button>

              </div>
            </div>

          </div>

        </template>
      </payment-dialog>
    </div>
  </section>
</template>

<script setup>
import {
  ref,
  onMounted
} from "vue";
import {
  useStudentStore
} from "@/stores/Student";
import {
  useStudentAuthStore
} from "@/stores/StudentAuth";
import {
  useRouter
} from "vue-router";
import PaymentDialog from "@/components/Student/PaymentDialog.vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useToast } from "vue-toastification";

const toast = useToast();
const studentStore = useStudentStore();
const studentAuthStore = useStudentAuthStore();
const adminAuthStore = useAdminAuthStore();
const router = useRouter();
studentStore.getRequest();
const fileName = ref(null);
const isFileSizeExceed = ref('')
const headers = [{
  text: "DATE REQUESTED",
  value: "dateCreated", width: 150
},
{
  text: "TYPES OF DOC.",
  value: "documentType", width: 150
},
{
  text: "DATE NEEDED",
  value: "dateNeeded", width: 150
},
{
  text: "PURPOSE OF REQUEST",
  value: "purpose", width: 150
},
{
  text: "PICK UP DATE",
  value: "date", width: 150
},
{
  text: "STATUS",
  value: "status", width: 150
},
{
  text: "REMARKS",
  value: "remarks", width: 150
},
{
  text: "ACTIONS",
  value: "operation", width: 150
},
];
const isPaymentShow = ref(false);
const isGuideLineShow = ref(false);
studentAuthStore.checkAuthStudent();
const items = [];

onMounted(async () => {
  await studentAuthStore.checkAuthStudent();
  await adminAuthStore.checkAuth()
  if (studentAuthStore.isAuthenticatedStudent) {
    return router.push("/student_dashboard");
  }
  if (adminAuthStore.isAuthenticated) {
    return router.push('/admin_dashboard')
  }
  router.push('/')

});


// const handleFileUpload = (event) => {
//   fileName.value = event.target.files[0];
//   const file = event.target.files[0];
//   const maxSize = 2048 * 2048;
//   if (file && file.size > maxSize) {
//     return isFileSizeExceed.value = true;
//   }
//   isFileSizeExceed.value = false;
//   console.log(fileName.value);
// };

const handleFileUpload = (event) => {
  fileName.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return isFileSizeExceed.value = true;
  }
}
const uploadProof = async () => {
  const formData = new FormData();
  if (!fileName.value) {
    return toast.error('Cant upload empty file', {
      timeout: 1500
    })
  }
  formData.append("proof", fileName.value);
  await studentStore.updatePayment(formData);
  toast.success(
    "Payment updated",
    {
      timeout: 2000,
    },
    await router.push("/")
  );
};
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #ffffff;
  --easy-table-header-background-color: rgb(30 64 175);
}

#guidelinesModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  /* Ensure the modal is in front */
  background-color: white;
  padding: 20px;
  border: 2px solid black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  /* Set the width of the modal */
  max-width: 900px;
  /* Maximum width if needed */
  margin-top: 20px;
  font-size: 16px;
}

/* Style for the modal content */
.modal-content1 {
  height: 400px;
  overflow-y: auto;
  text-align: left;

  /* Set a fixed height for the content */
  /* Enable vertical scrolling */
}

/* Enable vertical scrolling */

/* Close button style */

.agree-button {
  display: block;
  margin: 0 auto;
  background-color: darkblue;
  color: #fff;
  border: none;
  width: 100%;
  cursor: pointer;
}

.agree-button:hover {
  background-color: #2980b9;
}

.table1-container {
  max-height: 200px;
  margin-bottom: 20px;
}

/* Style for the table */
/* Style for the table */
.word-table {
  width: 100%;
  font-size: 10px;
  table-layout: fixed;
  position: sticky;
  top: 00;
  background-color: white;
  /* To maintain visibility */
  margin-top: 10px;
}

.word-table th,
.word-table td {
  border: 1px solid black;
  padding: 4px;
  text-align: center;
  white-space: nowrap;
  /* Prevents line breaks within table cells */
}
</style>