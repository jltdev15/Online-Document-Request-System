import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export const useStudentStore = defineStore("student", () => {
  // State
  const requestList = ref([]);
  const isPaymentShow = ref(false);
  const isConditionShow = ref(false);
  const idPayment = ref("");
  const isEnabled = ref(false);
  const router = useRouter();
  const toast = useToast();
  const isEnabledCheckBox = computed(() => {
    return isEnabled.value;
  });
  // Actions
  const getRequest = async () => {
    try {
      const request = await axiosClient.get("/allrequest");
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
      if (newData) {
        toast.success(
          "Account created",
          {
            timeout: 2000,
          },
          await router.push("/student_login")
        );
      }
      console.log(newData);
    } catch (err) {
      toast.error(err.response.data.content, {
        timeout: 2000,
      });
      console.log(err.response.data.content);
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
    toast,
  };
});
