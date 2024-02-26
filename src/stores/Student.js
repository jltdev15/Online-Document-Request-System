import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";

export const useStudentStore = defineStore("student", () => {
  // State
  const requestList = ref([]);
  const isPaymentShow =ref(false);
  // const requestForm = reactive({
  //   type: "",
  //   attended: "",
  //   dateNeeded: "",
  //   purpose: "",
  //   supportingDocument: "",
  // });
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

  return {
    requestList,
    getRequest,
    isPaymentShow
  };
});
