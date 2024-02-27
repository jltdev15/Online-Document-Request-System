<template>
  <section class="w-full px-3 pb-0 mx-auto pt-28 md:px-12">
    <header class="py-3">
      <h1>Welcome Admin</h1>
      <h2 class="text-3xl font-bold">Dashboard</h2>
    </header>
    <div class="grid grid-cols-2 gap-y-3 md:grid-cols-4 gap-x-3">
      <div class="shadow-xl md:w-56 card bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Pending</h2>
          <p class="text-2xl font-bold text-center">
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
          <p class="text-2xl font-bold text-center">
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
          <p class="text-2xl font-bold text-center">
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
          <p class="text-2xl font-bold text-center">
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
            Confirm Pickup
          </button>
        </div>
      </template>
    </base-dialog>
    <div class="py-9">
      <EasyDataTable :headers="headers" alternating :items="adminStore.requests" table-class-name="customize-table"
        :rows-per-page="5" border-cell header-text-direction="center">
        <template #item-supporting="{ fileName, filePath }">
          <a target="_blank" :href="filePath">{{ fileName }}</a>
        </template>
        <template #item-proof="{ proof, proofPath }">
          <a target="_blank" :href="proofPath">{{ proof }}</a>
        </template>
        <template #item-status="item">
          <div :class="item.status === 'Completed' ? 'bg-green-700 p-3 text-gray-50' : ''
            ">
            {{ item.status }}
          </div>
        </template>
        <template #item-date="item">
          <p v-if="item.pickUpDate === ''">Not set</p>
          <p else>
            {{ item.pickUpDate }}
          </p>
        </template>
        <template #item-operation="item">
          <div v-if="item.status === 'Pending'" class="flex items-center justify-between gap-3 p-1">
            <button
              class="flex items-center gap-3 px-3 py-2 transition-all bg-green-600 rounded-md hover:bg-green-500 text-gray-50 btn-success"
              @click="acceptHandler(item)">
              Accept<i class="fa-solid fa-circle-check text-gray-50"></i>
            </button>
            <button
              class="flex items-center gap-3 px-3 py-2 transition-all bg-red-600 rounded-md hover:bg-red-500 text-gray-50"
              @click="rejectHandler(item)">
              Reject<i class="fa-solid fa-ban text-gray-50"></i>
            </button>
          </div>
          <div class="flex justify-center p-3" v-show="item.status === 'Approved'">
            <p v-if="item.proof === 'Waiting for payment'"
              class="transition-all flex w-[9rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center">
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
          <div class="flex justify-center p-3" v-show="item.status === 'Completed'">
            <p
              class="transition-all flex justify-center w-[10rem] hrounded-md px-6 py-2 text-gray-800 btn-success gap-3 items-center">
              No action needed
            </p>
          </div>
        </template>
      </EasyDataTable>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/Admin";
import BaseDialog from "@/components/Admin/BaseDialog.vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useRouter } from "vue-router";

const router = useRouter();

const adminAuthStore = useAdminAuthStore();
const adminStore = useAdminStore();
adminStore.getRequest();

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

  { text: "STATUS", value: "status" },
  {
    text: "PICK UP DATE",
    value: "date", width: 150
  },
  { text: "ACTIONS", value: "operation" },
];
const showScheduleDialog = async () => {
  return (isScheduleShow.value = !isScheduleShow.value);
};
const closeScheduleDialog = async () => {
  return (isScheduleShow.value = !isScheduleShow.value);
};
const acceptHandler = async (value) => {
  adminStore.updateToApproved(value._id);
};
const rejectHandler = async (value) => {
  adminStore.updateToReject(value._id);
};
const processHandler = async (value) => {
  adminStore.updateToProcess(value._id);
};

onMounted(async () => {
  console.log(adminAuthStore.isAuthenticated);
  if (!adminAuthStore.isAuthenticated) {
    router.push("/");
  }
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
