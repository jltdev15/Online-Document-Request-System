import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";

export const useAdminStore = defineStore("admin", () => {
  // State
  const requests = ref([]);
  const isScheduleShow = ref(false);
  const isRemarksShow = ref(false);
  const schedId = ref("");
  const rejectId = ref("");
  const date = ref("");
  const remarks = ref("");
  const currentDate = new Date();
  date.value = currentDate.toISOString().split("T")[0];

  // Computed Properties

  const getPendingRequest = computed(() => {
    const numberOfPending = requests.value.filter(
      (request) => request.status === "Pending"
    );
    return numberOfPending.length;
  });
  const getApproved = computed(() => {
    const numberOfPending = requests.value.filter(
      (request) => request.status === "Approved"
    );
    return numberOfPending.length;
  });
  const getProcessing = computed(() => {
    const numberOfPending = requests.value.filter(
      (request) => request.status === "Processing"
    );
    return numberOfPending.length;
  });
  const getCompleted = computed(() => {
    const numberOfPending = requests.value.filter(
      (request) => request.status === "Completed"
    );
    return numberOfPending.length;
  });

  // Actions or Method
  const showSchedule = async (id) => {
    isScheduleShow.value = !isScheduleShow.value;
    console.log(id._id);
    schedId.value = id._id;
  };
  const showRemarksDialog = async (id) => {
    isRemarksShow.value = !isRemarksShow.value;
    console.log(id._id);
    rejectId.value = id._id;
  };
  const updatePickUp = async () => {
    try {
      const status = await axiosClient.patch(
        `/admin/schedule/${schedId.value}`,
        {
          pickUpDate: date.value,
          status: "Done",
        }
      );
      isScheduleShow.value = !isScheduleShow.value;
      console.log(status);
      await getRequest();
    } catch (err) {}
  };
  const updateCompleted = async (id) => {
    try {
      const status = await axiosClient.patch(`/admin/complete/${id}`, {
        status: "Completed",
      });
      console.log(status);
      await getRequest();
    } catch (err) {
      console.log(err);
    }
  };

  const hideSchedule = async () => {
    isScheduleShow.value = !isScheduleShow.value;
  };
  const getRequest = async () => {
    try {
      const request = await axiosClient.get("/admin/requests");
      // requests.value.push(request.data.content[0]);
      requests.value = request.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const updateToApproved = async (id) => {
    console.log(id);
    try {
      const status = await axiosClient.patch(`/admin/approved/${id}`);
      console.log(status);
      getRequest();
    } catch (err) {}
  };
  const updateToReject = async () => {
    try {
      const status = await axiosClient.patch(
        `/admin/rejected/${rejectId.value}`,
        {
          remarks: remarks.value,
          status: "Rejected",
        }
      );
      isRemarksShow.value = !isRemarksShow.value;
      console.log(status);
      await getRequest();
    } catch (err) {
      console.log(err);
    }
  };
  const updateToProcess = async (id) => {
    console.log(id);
    try {
      const status = await axiosClient.patch(`/admin/processing/${id}`);
      console.log(status);
      getRequest();
    } catch (err) {
      console.log(err);
    }
  };
  const updateToComplete = async (id) => {
    console.log(id);
    try {
      const status = await axiosClient.patch(`/admin/processing/${id}`);
      console.log(status);
      getRequest();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    requests,
    getRequest,
    updateToApproved,
    updateToReject,
    updateToProcess,
    isScheduleShow,
    showSchedule,
    hideSchedule,
    schedId,
    updatePickUp,
    date,
    currentDate,
    getPendingRequest,
    getApproved,
    getProcessing,
    getCompleted,
    updateCompleted,
    isRemarksShow,
    showRemarksDialog,
    updateToReject,
    rejectId,
    remarks,
  };
});
