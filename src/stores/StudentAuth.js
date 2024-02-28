import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axiosClient from "@/axiosClient";

export const useStudentAuthStore = defineStore("authstudent", () => {
  // State
  const isAuthenticatedStudent = ref(false);
  const router = useRouter();
  const toast = useToast();

  // Actions
  const checkAuthStudent = async () => {
    try {
      const response = await axiosClient.get(`/active_student`);
      console.log(response);
      if (response) {
        return (isAuthenticatedStudent.value = true);
      }
    } catch (err) {
      isAuthenticatedStudent.value = false;
      console.log(err);
    }
  };
  const submitLogin = async (formData) => {
    try {
      const data = await axiosClient.post(`/login`, formData);
      console.log(data.data.message);
      if (data) {
        toast.success(data.data.message, {
          timeout: 1500,
        });
        router.push("/student_dashboard");
        return (isAuthenticatedStudent.value = true);
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        timeout: 1500,
      });
    }
  };
  const submitLogout = async () => {
    try {
      await axiosClient.post("/logout", {});
      isAuthenticatedStudent.value = false;
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return {
    isAuthenticatedStudent,
    submitLogin,
    checkAuthStudent,
    submitLogout,
    router,
  };
});
