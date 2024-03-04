<template>
  <section class="w-full px-3 pb-0 mx-auto pt-28 md:px-12">
    <header class="py-3">
      <h1>Welcome Admin</h1>
      <h2 class="text-3xl font-bold">Dashboard</h2>
    </header>
    <div class="container grid grid-flow-row grid-cols-2 gap-2 justify-items-stretch md:grid-cols-4">
      <div class="shadow-xl md:w-56 card bg-base-100">
        <div class="flex flex-col card-body">
          <h2 class="card-title">Pending</h2>
          <p class="p-3 text-xl font-bold text-center md:p-6 md:text-5xl">
            {{ adminStore.getPendingRequest }}
          </p>
          <!-- <div class="justify-end card-actions">
            <button class="w-full btn btn-primary">View more</button>
          </div> -->
        </div>
      </div>
      <div class="shadow-xl md:w-56 card bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Approved</h2>
          <p class="p-3 text-xl font-bold text-center md:p-6 md:text-5xl">
            {{ adminStore.getApproved }}
          </p>
          <!-- <div class="justify-end card-actions">
            <button class="w-full btn btn-primary">View more</button>
          </div> -->
        </div>
      </div>
      <div class="shadow-xl md:w-56 card bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Processing</h2>
          <p class="p-3 text-xl font-bold text-center md:p-6 md:text-5xl">
            {{ adminStore.getProcessing }}
          </p>
          <!-- <div class="justify-end card-actions">
            <button class="w-full btn btn-primary">View more</button>
          </div> -->
        </div>
      </div>
      <div class="shadow-xl md:w-56 card bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Completed</h2>
          <p class="p-3 text-xl font-bold text-center md:p-6 md:text-5xl">
            {{ adminStore.getCompleted }}
          </p>
          <!-- <div class="justify-end card-actions">
            <button class="w-full btn btn-primary">View more</button>
          </div> -->
        </div>
      </div>
    </div>
    <base-dialog :show="adminStore.isScheduleShow" title="Schedule Pickup">
      <template #default>
        <div>
          <label class="my-3 font-bold text-center" for="">Select Date</label>
          <input v-model="adminStore.date" type="date" placeholder="Type here"
            class="w-full max-w-xl input input-bordered" :min="adminStore.date" />
        </div>
      </template>

      <template #actions>
        <div class="flex gap-2">
          <button @click="adminStore.hideSchedule" class="px-6 py-3 bg-red-800 border-blue-800 rounded text-gray-50">
            Close
          </button>
          <button @click="adminStore.updatePickUp"
            class="px-6 py-3 font-semibold capitalize bg-blue-800 border border-transparent rounded hover:bg-blue-600 text-gray-50">
            Confirm
          </button>
        </div>
      </template>
    </base-dialog>
    <div class="py-9">
      <EasyDataTable :headers="headers" alternating :items="adminStore.requests" table-class-name="customize-table"
        :rows-per-page="5" border-cell header-text-direction="left">

        <template #item-supporting="{ fileName, filePath }">
          <a target="_blank" :href="filePath">{{ fileName }}</a>
        </template>

        <template #item-proof="{ proof, proofPath }">
          <a target="_blank" :href="proofPath">{{ proof }}</a>
        </template>

        <template #item-status="item">
          <div :class="item.status === 'Completed' ? 'bg-green-700 p-3 text-gray-50' : ''">
            {{ item.status }}
          </div>
        </template>

        <template #item-date="item">
          <p v-if="item.pickUpDate === ''">Not set</p>
          <p else>
            {{ item.pickUpDate }}
          </p>
        </template>

        <template #item-remarks="item">
          <div class="flex justify-center p-3" v-show="item.status === 'Rejected'">
            <p class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              {{ item.remarks }}
            </p>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Pending'">
            <p class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              Waiting for response
            </p>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Approved'">
            <p v-if="item.proof === ''"
              class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              Waiting for payment
            </p>
            <p v-else
              class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              Ready to process
            </p>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Processing'">
            <p class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              Working on request
            </p>
          </div>
          <div class="flex justify-start p-3" v-show="item.status === 'Done'">
            <p class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              Document ready
            </p>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Completed'">
            <p class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              Document received
            </p>
          </div>
        </template>

        <template #item-operation="item">
          <div v-if="item.status === 'Pending'" class="flex items-center justify-between gap-3 p-3">
            <button
              class="flex items-center gap-3 px-3 py-2 transition-all bg-green-600 rounded-md hover:bg-green-500 text-gray-50 btn-success"
              @click="acceptHandler(item)">
              Accept<i class="fa-solid fa-circle-check text-gray-50"></i>
            </button>
            <button
              class="flex items-center gap-3 px-3 py-2 transition-all bg-red-600 rounded-md hover:bg-red-500 text-gray-50"
              @click="adminStore.showRemarksDialog(item)">
              Reject<i class="fa-solid fa-ban text-gray-50"></i>
            </button>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Rejected'">
            <p class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              No action needed
            </p>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Approved'">
            <p v-if="item.proof === ''"
              class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
              No action needed
            </p>
            <button v-else
              class="transition-all flex w-[9rem] hover:bg-green-500 rounded-md px-6 py-2 bg-green-600 text-gray-50 btn-success gap-3 items-center"
              @click="processHandler(item)">
              Process now <i class="fa-solid fa-circle-check text-gray-50"></i>
            </button>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Processing'">
            <button
              class="transition-all flex justify-center w-[9rem] hover:bg-green-500 rounded-md px-6 py-2 bg-green-600 text-gray-50 btn-success gap-3 items-center"
              @click="adminStore.showSchedule(item)">
              Schedule <i class="fa-regular fa-calendar-check"></i>
            </button>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Done'">
            <button
              class="transition-all flex justify-center w-[12rem] hover:bg-green-500 rounded-md px-6 py-2 bg-green-600 text-gray-50 btn-success gap-3 items-center"
              @click="finishHandler(item)">
              Complete <i class="fa-regular fa-calendar-check"></i>
            </button>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Completed'">
            <!-- <p class="transition-all flex w-[12rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">No
              action needed</p> -->
            <button @click="adminStore.showArchiveDialog(item)" class="bg-red-800 btn text-gray-50 hover:bg-red-600">
              Move to archive<i class="fa-solid fa-box-archive"></i>
            </button>
          </div>
        </template>
      </EasyDataTable>
      <reject-dialog :show="adminStore.isRemarksShow" title="Reject request">

        <template #default>
          <div>
            <label class="my-3 font-bold text-center" for="">Select Remarks</label>
            <select v-model="adminStore.remarks" class="w-full select select-bordered">
              <option selected value="" disabled>Choose Remarks</option>
              <option value="Unavailable Documents">Unavailable Documents</option>
              <option value="Access Restrictions">Access Restrictions</option>
              <option value="Policy Violations">Policy Violations</option>
              <option value="Incorrect Information">Incorrect Information</option>
            </select>
          </div>
          <div>
            <p class="font-bold">Others</p>
            <textarea v-model.trim="adminStore.others" class="w-full p-3 border resize-none" name="purpose" id="purpose"
              rows="2" placeholder="Other remarks" required></textarea>
          </div>
        </template>

        <template #actions>
          <div class="flex gap-2">
            <button @click="adminStore.showRemarksDialog"
              class="px-6 py-3 bg-red-800 border-blue-800 rounded text-gray-50">
              Close
            </button>
            <button @click="adminStore.updateToReject"
              class="px-6 py-3 font-semibold capitalize bg-blue-800 border border-transparent rounded hover:bg-blue-600 text-gray-50">
              Confirm
            </button>
          </div>
        </template>
      </reject-dialog>
      <archive-dialog :show="adminStore.isArchiveShow" title="Archive Request">

        <template #default>
          <div class="flex items-center gap-3">
            <i class="text-3xl fa-regular fa-circle-question"></i>
            <p class="text-base font-semibold">
              Are you sure to move this request to archive?
            </p>
          </div>
        </template>

        <template #actions>
          <div class="flex gap-2">
            <button @click="adminStore.showArchiveDialog"
              class="px-6 py-3 font-semibold bg-red-800 border-blue-800 rounded hover:bg-red-500 text-gray-50">
              Cancel
            </button>
            <button @click="adminStore.updateToArchive"
              class="py-3 font-semibold capitalize bg-blue-800 border border-transparent rounded px-9 hover:bg-blue-600 text-gray-50">
              Yes, I'm sure
            </button>
          </div>
        </template>
      </archive-dialog>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/Admin";
import BaseDialog from "@/components/Admin/BaseDialog.vue";
import RejectDialog from "@/components/Admin/RejectDialog.vue";
import ArchiveDialog from "@/components/Admin/ArchiveDialog.vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const studentAuthStore = useStudentAuthStore();
const adminAuthStore = useAdminAuthStore();
const adminStore = useAdminStore();
adminStore.getRequest();

// setInterval(adminStore.getRequest(), 5000)
const isCompleted = ref(false);

const headers = [
  { text: "LRN", value: "learnerReferenceNumber" },
  { text: "REQUESTOR", value: "requestorName" },
  { text: "DATE CREATED", value: "dateCreated", width: 150 },
  { text: "TYPES OF DOC.", value: "documentType", width: 100 },
  { text: "DATE NEEDED", value: "dateNeeded", width: 150 },
  { text: "S.Y. LAST ATTENDED", value: "year", width: 150 },
  { text: "PURPOSE OF REQUEST", value: "purpose", width: 150 },
  { text: "SUPPORTING DOCUMENTS", value: "supporting", width: 150 },
  { text: "PROOF OF PAYMENT", value: "proof", width: 150 },
  {
    text: "PICK UP DATE",
    value: "date",
    width: 150,
  },
  { text: "STATUS", value: "status" },
  { text: "REMARKS", value: "remarks", width: 200 },

  { text: "ACTIONS", value: "operation" },
];

const acceptHandler = async (value) => {
  adminStore.updateToApproved(value._id);
};
const rejectHandler = async (value) => {
  adminStore.updateToReject(value._id);
};
const processHandler = async (value) => {
  adminStore.updateToProcess(value._id);
};
const finishHandler = async (value) => {
  adminStore.updateCompleted(value._id);
};
adminAuthStore.checkAuth();
onMounted(async () => {
  await studentAuthStore.checkAuthStudent();
  if (studentAuthStore.isAuthenticatedStudent) {
    return router.push("/student_dashboard");
  }
  await adminAuthStore.checkAuth();
  if (adminAuthStore.isAuthenticated) {
    return router.push("/admin_dashboard");
  }
  router.push("/");
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #ffffff;
  --easy-table-header-background-color: rgb(30 64 175);
}
</style>
