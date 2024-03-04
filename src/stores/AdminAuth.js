import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosClient from "@/axiosClient";
import { useToast } from "vue-toastification";

export const useAdminAuthStore = defineStore("authadmin", () => {
  // State
  const isAuthenticated = ref(false);
  const userName = ref("");
  const router = useRouter();
  const currentPassword = ref("");
  const newPassword = ref("");
  const currentUsername = ref("");
  const newUsername = ref("");
  const toast = useToast();
  // Actions

  const checkAuth = async () => {
    try {
      const response = await axiosClient.get(`/admin/active`);
      if (response) {
        console.log(response.data.content.userName);
        userName.value = response.data.content.userName;
        return (isAuthenticated.value = true);
      }
    } catch (err) {
      isAuthenticated.value = false;
      console.log(err);
    }
  };
  const changeAdminPasswordHandler = async () => {
    try {
      const response = await axiosClient.patch(
        `/admin/changepassword/${userName.value}`,
        {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        }
      );
      toast.success(response.data.message, {
        timeout: 1500,
      });
      currentPassword.value = "";
      newPassword.value = "";
    } catch (err) {
      toast.error(err.response.data.message, {
        timeout: 1500,
      });
      console.log(err);
    }
  };
  const changeUserNameHandler = async () => {
    try {
      const response = await axiosClient.patch(
        `/admin/changeusername/${userName.value}`,
        {
          currentUsername: currentUsername.value,
          newUserName: newUsername.value,
        }
      );
      toast.success(response.data.message, {
        timeout: 1500,
      });
      currentUsername.value = "";
      newUsername.value = "";
    } catch (err) {
      toast.error(err.response.data.message, {
        timeout: 1500,
      });
      console.log(err);
    }
  };
  const submitAdminLogin = async (formData) => {
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
      console.log(data);
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
    currentPassword,
    newPassword,
    changeAdminPasswordHandler,
    currentUsername,
    newUsername,
    changeUserNameHandler,
  };
});
