import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";
import { useRouter } from "vue-router";

export const useStudentStore = defineStore("student", () => {
  // State
  const requestList = ref([]);
  const isPaymentShow = ref(false);
  const isConditionShow = ref(false);
  const idPayment = ref("");
  const isEnabled = ref(false);
  const router = useRouter();

  const isEnabledCheckBox = computed(() => {
    return isEnabled.value;
  });
  // Actions
  const getRequest = async () => {
    try {
      const request = await axiosClient.get("/allrequest");
      // requests.value.push(request.data.content[0]);
      console.log(request);
      requestList.value = request.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const toggleUpdatePayment = async (id) => {
    isPaymentShow.value = !isPaymentShow.value;
    console.log("testing");
    idPayment.value = id._id;
    console.log(idPayment.value);
  };

  const showCondition = async () => {
    isConditionShow.value = !isConditionShow.value;
    isEnabled.value = !isEnabled.value;
    console.log(isEnabled.value);
  };
  const hideCondition = async () => {
    isConditionShow.value = !isConditionShow.value;
  };
  const updatePayment = async (value) => {
    try {
      await axiosClient.patch(`/update/${idPayment.value}`, value, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully");
      isPaymentShow.value = !isPaymentShow.value;
    } catch (err) {
      console.log(err);
    }
  };
  const registerAccount = async (value) => {
    try {
      const newData = await axiosClient.post("/register", value);
      console.log(newData);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    requestList,
    getRequest,
    isPaymentShow,
    toggleUpdatePayment,
    idPayment,
    updatePayment,
    registerAccount,
    router,
    showCondition,
    isConditionShow,
    isEnabled,
    isEnabledCheckBox,
    hideCondition,
  };
});
