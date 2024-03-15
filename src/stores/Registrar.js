import { ref, computed, reactive, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosClient from "@/axiosClient";
import { useToast } from "vue-toastification";

export const useRegistrarAuthStore = defineStore("authregistrar", () => {
  // Action
  const toast = useToast();
  const isRegAuthenticated = ref(false);
  const router = useRouter();
  const checkAuthRegistrar = async () => {
    try {
      const response = await axiosClient.get(`/registrar/active`);
      if (response) {
        console.log(response.data.content.userName);
        // userName.value = response.data.content.userName;
        return (isRegAuthenticated.value = true);
      }
    } catch (err) {
      isRegAuthenticated.value = false;
      // console.log(err);
    }
  };
  const submitAdminLogin = async (formData) => {
    try {
      const data = await axiosClient.post(`/registrar/login`, formData);
      if (data) {
        toast.success(data.data.message, {
          timeout: 1500,
        });

        setTimeout(async () => {
          router.push("/admin_dashboard");
          return (isRegAuthenticated.value = true);
        }, 2000);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        timeout: 1500,
      });
    }
  };
  const submitLogout = async () => {
    try {
      await axiosClient.post("/admin/logout", {});
      isRegAuthenticated.value = false;
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return {
    isRegAuthenticated,
    submitAdminLogin,
    checkAuthRegistrar,
    toast,
    submitLogout,
    router,
  };
});
