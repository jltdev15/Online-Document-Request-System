<template>
  <section class="w-10/12 mx-auto pb-32 pt-6">
    <header class="flex items-center justify-between py-3">
      <div>
        <h1>Welcome Student</h1>
        <h2 class="font-bold text-3xl">Dashboard</h2>
      </div>
      <div>
        <button
          @click="isGuideLineShow = !isGuideLineShow"
          class="btn btn-primary"
        >
          Create Request <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </header>

    <div v-if="isGuideLineShow" id="guidelinesModal" class="modal1">
      <div class="modal-content1">
        <span
          @click="isGuideLineShow = !isGuideLineShow"
          class="text-3xl border border-1 rounded-full cursor-pointer text-red-700 px-3 py-1 close1 float-right"
          >&times;</span
        >
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
          <div class="flex justify-center">
            <router-link
              to="/student_request"
              class="btn py-3 w-2/12 btn-outline mx-auto"
              >Agree</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="py-9">
      <EasyDataTable :headers="headers" :items="items" />
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";

const headers = [
  { text: "STUDENT NUMBER", value: "player" },
  { text: "REQUESTOR", value: "team" },
  { text: "DATE CREATED", value: "number" },
  { text: "TYPES OF DOC.", value: "position" },
  { text: "DATE NEEDED", value: "indicator.height" },
  { text: "PURPOSE OF REQUEST", value: "indicator.weight", sortable: true },
  { text: "SUPPORTING DOCUMENTS", value: "lastAttended", width: 200 },
  { text: "SCHOOL YEAR LAST ATTENDED", value: "country" },
  { text: "REMARKS", value: "country" },
  { text: "PROOF OF PAYMENT", value: "country" },
  { text: "ACTIONS", value: "country" },
];

const isGuideLineShow = ref(false);

const items = [];
</script>

<style scoped>
#guidelinesModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999; /* Ensure the modal is in front */
  background-color: white;
  padding: 20px;
  border: 2px solid black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 70%; /* Set the width of the modal */
  max-width: 900px; /* Maximum width if needed */
  margin-top: 20px;
  font-size: 15px;
}

/* Style for the modal content */
.modal-content1 {
  height: 500px;
  overflow-y: auto;
  text-align: left;

  /* Set a fixed height for the content */
  /* Enable vertical scrolling */
} /* Enable vertical scrolling */

/* Close button style */

.agree-button {
  display: block;
  margin: 0 auto;
  background-color: darkblue;
  color: #fff;
  border: none;
  padding: 5px 10px;
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
  background-color: white; /* To maintain visibility */
  margin-top: 10px;
}

.word-table th,
.word-table td {
  border: 1px solid black;
  padding: 4px;
  text-align: center;
  white-space: nowrap; /* Prevents line breaks within table cells */
}
</style>
