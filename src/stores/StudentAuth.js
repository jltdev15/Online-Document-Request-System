import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosClient from "@/axiosClient";

export const useStudentAuthStore = defineStore("authstudent", () => {
  // State
  const isAuthenticatedStudent = ref(false);
  const router = useRouter();

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
      console.log(data);
      if (data) {
        return (isAuthenticatedStudent.value = true);
      }
    } catch (err) {
      console.log(err);
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
