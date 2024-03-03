import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosClient from "@/axiosClient";
import { useToast } from "vue-toastification";

export const useAdminAuthStore = defineStore("authadmin", () => {
  // State
  const isAuthenticated = ref(false);
  const router = useRouter();
  const toast = useToast();
  // Actions

  const checkAuth = async () => {
    try {
      const response = await axiosClient.get(`/admin/active`);
      if (response) {
        return (isAuthenticated.value = true);
      }
    } catch (err) {
      isAuthenticated.value = false;
      console.log(err);
    }
  };

  const submitAdminLogin = async (formData) => {
    console.log(formData);
    try {
      const data = await axiosClient.post(`/admin/login`, formData);
      if (data) {
        toast.success(data.data.message, {
          timeout: 1500,
        });

        setTimeout(async () => {
          await router.push("/admin_dashboard");
          return (isAuthenticated.value = true);
        }, 2000);
      }
      console.log(typeof data);
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {
        timeout: 1500,
      });
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
    submitAdminLogin,
    checkAuth,
    submitLogout,
    router,
    toast,
  };
});
