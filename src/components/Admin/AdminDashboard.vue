<template>
  <section class="w-9/12 mx-auto pb-32 pt-6">
    <header>
      <h1>Welcome Admin</h1>
      <h2 class="font-bold text-3xl">Dashboard</h2>
    </header>
    <div class="grid grid-cols-4 gap-x-3">
      <div class="card w-56 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Pending</h2>
          <p class="text-center text-2xl font-bold">{{ 0 }}</p>
          <div class="card-actions justify-end">
            <button class="btn w-full btn-primary">View more</button>
          </div>
        </div>
      </div>
      <div class="card w-56 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Approved</h2>
          <p class="text-center text-2xl font-bold">0</p>
          <div class="card-actions justify-end">
            <button class="btn w-full btn-primary">View more</button>
          </div>
        </div>
      </div>
      <div class="card w-56 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Processing</h2>
          <p class="text-center text-2xl font-bold">0</p>
          <div class="card-actions justify-end">
            <button class="btn w-full btn-primary">View more</button>
          </div>
        </div>
      </div>
      <div class="card w-56 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Completed</h2>
          <p class="text-center text-2xl font-bold">0</p>
          <div class="card-actions justify-end">
            <button class="btn w-full btn-primary">View more</button>
          </div>
        </div>
      </div>
    </div>
    <base-dialog
      :show="adminStore.isScheduleShow"
      title="Schedule Document Pickup"
    >
      <template #default>
        <div>
          <label class="text-center font-bold my-3" for="">Select Date</label>
          <input
            v-model="adminStore.date"
            type="date"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xl"
            :min="adminStore.date"
          />
        </div>
      </template>
      <template #actions>
        <div class="flex gap-2">
          <button
            @click="adminStore.hideSchedule"
            class="px-6 py-3 bg-red-800 border-blue-800 rounded text-gray-50"
          >
            Close
          </button>
          <button
            @click="adminStore.updatePickUp"
            class="px-6 py-3 font-semibold capitalize bg-blue-800 border border-transparent rounded hover:bg-blue-600 text-gray-50"
          >
            Confirm Pickup
          </button>
        </div>
      </template>
    </base-dialog>
    <div class="py-9">
      <EasyDataTable
        :headers="headers"
        alternating
        :items="adminStore.requests"
      >
        <template #item-supporting="{ fileName, filePath }">
          <a target="_blank" :href="filePath">{{ fileName }}</a>
        </template>
        <template #item-proof="{ proof, proofPath }">
          <a target="_blank" :href="proofPath">{{ proof }}</a>
        </template>
        <template #item-operation="item">
          <div
            v-if="item.status === 'Pending'"
            class="flex justify-between items-center gap-3 p-1"
          >
            <button
              class="flex transition-all hover:bg-green-500 rounded-md px-3 py-2 bg-green-600 text-gray-50 btn-success gap-3 items-center"
              @click="acceptHandler(item)"
            >
              Accept<i class="fa-solid fa-circle-check text-gray-50"></i>
            </button>
            <button
              class="flex transition-all hover:bg-red-500 text-gray-50 px-3 py-2 rounded-md bg-red-600 gap-3 items-center"
              @click="rejectHandler(item)"
            >
              Reject<i class="fa-solid fa-ban text-gray-50"></i>
            </button>
          </div>
          <div
            class="p-3 flex justify-center"
            v-show="item.status === 'Approved'"
          >
            <p
              v-if="item.proof === 'Waiting for payment'"
              class="transition-all flex w-[9rem] rounded-md px-6 py-2 text-gray-900 btn-success gap-3 items-center"
            >
              No action needed
            </p>
            <button
              v-else
              class="transition-all flex w-[9rem] hover:bg-green-500 rounded-md px-6 py-2 bg-green-600 text-gray-50 btn-success gap-3 items-center"
              @click="processHandler(item)"
            >
              Process now <i class="fa-solid fa-circle-check text-gray-50"></i>
            </button>
          </div>
          <div
            class="p-3 flex justify-center"
            v-show="item.status === 'Processing'"
          >
            <button
              class="transition-all flex justify-center w-[9rem] hover:bg-green-500 rounded-md px-6 py-2 bg-green-600 text-gray-50 btn-success gap-3 items-center"
              @click="adminStore.showSchedule(item)"
            >
              Schedule <i class="fa-regular fa-calendar-check"></i>
            </button>
          </div>
          <div class="p-3 flex justify-center" v-show="item.status === 'Completed'">
            <p
              class="transition-all flex justify-center w-[10rem] hrounded-md px-6 py-2 text-gray-800 btn-success gap-3 items-center"
            >
              No action needed
            </p>
          </div>
        </template>
      </EasyDataTable>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/Admin";
import BaseDialog from "@/components/Admin/BaseDialog.vue";
const adminStore = useAdminStore();
adminStore.getRequest();

const headers = [
  { text: "LRN", value: "learnerReferenceNumber" },
  { text: "REQUESTOR", value: "requestorName" },
  { text: "DATE CREATED", value: "dateCreated" },
  { text: "TYPES OF DOC.", value: "documentType" },
  { text: "DATE NEEDED", value: "dateNeeded" },
  { text: "PURPOSE OF REQUEST", value: "purpose" },
  { text: "SUPPORTING DOCUMENTS", value: "supporting" },
  { text: "S.Y. LAST ATTENDED", value: "year" },
  { text: "STATUS", value: "status" },
  { text: "PROOF OF PAYMENT", value: "proof" },
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

onMounted(async () => {});
</script>
