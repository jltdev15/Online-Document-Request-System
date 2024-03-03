import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axiosClient from "@/axiosClient";

export const useStudentAuthStore = defineStore("authstudent", () => {
  // State
  const isAuthenticatedStudent = ref(false);
  const router = useRouter();
  const toast = useToast();
  const activeUser = ref("");
  const isEdit = ref(false);
  const currentPassword = ref("");
  const newPassword = ref("");
  const profileData = reactive({
    lrn: "",
    name: "",
    address: "",
    contact: "",
    email: "",
  });

  // Actions
  const updateProfileHandler = async () => {
    try {
      const updatedData = await axiosClient.patch(
        `/updateprofile/${profileData.lrn}`,
        {
          learnerReferenceNumber: profileData.lrn,
          fullName: profileData.name,
          address: profileData.address,
          contact: profileData.contact,
          email: profileData.email,
        }
      );
      toast.success(updatedData.data.message, {
        timeout: 1500,
      });
      isEdit.value = !isEdit.value;
      console.log(updatedData);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleEdit = async () => {
    isEdit.value = !isEdit.value;
  };
  const changePasswordHandler = async () => {
    try {
      const response = await axiosClient.patch(
        `/changepassword/${profileData.lrn}`,
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
      // console.log(err);
    }
  };
  const checkAuthStudent = async () => {
    try {
      const response = await axiosClient.get(`/active_student`);
      console.log(response.data.content);
      // profileDate.lrn =
      profileData.lrn = response.data.content.learnerReferenceNumber;
      profileData.name = response.data.content.fullName;
      profileData.address = response.data.content.address;
      profileData.email = response.data.content.email;
      profileData.contact = response.data.content.contact;
      if (response) {
        return (isAuthenticatedStudent.value = true);
      }
    } catch (err) {
      isAuthenticatedStudent.value = false;
      // console.log(err);
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
        setTimeout(async () => {
          await router.push("/student_dashboard");
          return (isAuthenticatedStudent.value = true);
        }, 2000);
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        return toast.error(err.message, {
          timeout: 1500,
        });
      }
      toast.error(err.response.data.message, {
        timeout: 1500,
      });
    }
  };
  const submitLogout = async () => {
    try {
      await axiosClient.post("/logout", {});
      isAuthenticatedStudent.value = false;
      router.push("/student_login");
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
    activeUser,
    profileData,
    isEdit,
    toggleEdit,
    currentPassword,
    newPassword,
    changePasswordHandler,
    updateProfileHandler,
  };
});
