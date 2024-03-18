import { ref, computed, reactive, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosClient from "@/axiosClient";
import { useToast } from "vue-toastification";

export const useAdminAuthStore = defineStore("authadmin", () => {
  // State
  const isAuthenticated = ref(false);
  const isNewUserModal = ref(false);
  const isUpdateUserModal = ref(false);
  const isDeleteUserModal = ref(false);
  const userName = ref("");
  const router = useRouter();
  const currentPassword = ref("");
  const newPassword = ref("");
  const currentUsername = ref("");
  const newUsername = ref("");
  const toast = useToast();
  const usersList = ref([]);
  const userID = ref("");

  const newUser = reactive({
    empId: "",
    fullName: "",
    emailAddress: "",
    contact: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  watch(usersList, (newValue) => {
    usersList.value = newValue;
    console.log(usersList.value);
  });
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
      console.log(err);
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
  const exportToExcel = async () => {
    try {
      const response = await axiosClient.get(`/admin/export`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Request-archived.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleNewUserModal = async () => {
    isNewUserModal.value = !isNewUserModal.value;
  };
  const getUsers = async () => {
    try {
      const userFound = await axiosClient.get("/admin/users");
      usersList.value = userFound.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const addNewUserHandler = async () => {
    if (newUser.username === "") {
      return toast.error("Username is required", {
        timeout: 2000,
      });
    }
    if (newUser.password === "") {
      return toast.error("Password is required", {
        timeout: 2000,
      });
    }
    if (newUser.confirm_password === "") {
      return toast.error("Confirm password is required", {
        timeout: 2000,
      });
    }
    if (newUser.password !== newUser.confirm_password) {
      return toast.error("Password doesnt match", {
        timeout: 2000,
      });
    }
    const newUserAccount = {
      userName: newUser.username,
      password: newUser.password,
    };
    try {
      const newAccount = await axiosClient.post(
        "/admin/registrar",
        newUserAccount
      );
      toast.success(newAccount.data.status, {
        timeout: 1500,
      });
      getUsers();
      setTimeout(() => {
        isNewUserModal.value = !isNewUserModal.value;
        newUser.empId = "";
        newUser.fullName = "";
        newUser.emailAddress = "";
        newUser.contact = "";
        newUser.username = "";
        newUser.password = "";
        newUser.confirm_password = "";
      }, 1800);
    } catch (err) {
      console.log(err);
    }
  };
  const showUpdateModal = async (value) => {
    isUpdateUserModal.value = !isUpdateUserModal.value;
    console.log(value);
    userID.value = value._id;
    console.log(userID.value);
    newUser.empId = value.employeeID;
    newUser.fullName = value.fullName;
    newUser.emailAddress = value.emailAddress;
    newUser.contact = value.contactNumber;
  };
  const updateUserHandler = async () => {
    if (newUser.empId === "") {
      return toast.error("Employee Id is required", {
        timeout: 2000,
      });
    }
    if (newUser.fullName === "") {
      return toast.error("Name is required", {
        timeout: 2000,
      });
    }
    if (newUser.emailAddress === "") {
      return toast.error("Email Address is required", {
        timeout: 2000,
      });
    }
    if (newUser.contact === "") {
      return toast.error("Contact Number is required", {
        timeout: 2000,
      });
    }
    try {
      const updatedDate = await axiosClient.patch(
        `/admin/users/${userID.value}`,
        {
          employeeID: newUser.empId,
          fullName: newUser.fullName,
          emailAddress: newUser.emailAddress,
          contactNumber: newUser.contact,
        }
      );
      toast.success("User updated!", {
        timeout: 1500,
      });
      await getUsers();
      userID.value = "";
      newUser.empId = "";
      newUser.fullName = "";
      newUser.emailAddress = "";
      newUser.contact = "";
      isUpdateUserModal.value = false;
    } catch (err) {
      console.log(err);
    }
  };
  const hideUpdateModal = async (value) => {
    isUpdateUserModal.value = !isUpdateUserModal.value;
    console.log(value);
    userID.value = "";
    newUser.empId = "";
    newUser.fullName = "";
    newUser.emailAddress = "";
    newUser.contact = "";
  };
  const showDeleteModal = async (value) => {
    isDeleteUserModal.value = !isDeleteUserModal.value;
    console.log(value);
    userID.value = value._id;
    console.log(userID.value);
  };
  const deleteUserHandler = async () => {
    try {
      const deletedUser = await axiosClient.delete(
        `/admin/users/${userID.value}`
      );
      toast.success("User remove", {
        timeout: 1500,
      });
      getUsers();
      isDeleteUserModal.value = false;
      console.log(deletedUser);
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
    exportToExcel,
    newUser,
    addNewUserHandler,
    isNewUserModal,
    toggleNewUserModal,
    getUsers,
    usersList,
    showUpdateModal,
    isUpdateUserModal,
    hideUpdateModal,
    isDeleteUserModal,
    showDeleteModal,
    userID,
    deleteUserHandler,
    updateUserHandler,
  };
});
