import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosClient from "@/axiosClient";

export const useAdminAuthStore = defineStore("authadmin", () => {
  // State
  const isAuthenticated = ref(false);
  const router = useRouter();

  // Actions

  const checkAuth = async () => {
    try {
      const response = await axiosClient.get(`/admin/active`);
      console.log(response);
      if (response) {
        return (isAuthenticated.value = true);
      }
    } catch (err) {
      isAuthenticated.value = false;
      console.log(err);
    }
  };
  const submitLogin = async (formData) => {
    try {
      const data = await axiosClient.post(`/admin/login`, formData);
      console.log(data);
      if (data) {
        return (isAuthenticated.value = true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const submitLogout = async () => {
    try {
      await axiosClient.post("/admin/logout", {});
      isAuthenticated.value = false;
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return {
    isAuthenticated,
    submitLogin,
    checkAuth,
    submitLogout,
    router,
  };
});
