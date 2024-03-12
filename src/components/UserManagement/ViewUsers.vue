<template>
    <div>
        <EasyDataTable :headers="headers" :items="adminAuthStore.usersList" table-class-name="customize-table"
            :rows-per-page="10" border-cell header-text-direction="left">
            <template #item-operation="item">
                <div class="flex justify-between gap-3 p-3">
                    <button @click="adminAuthStore.showUpdateModal(item)"
                        class="flex items-center justify-center w-24 gap-2 py-3 bg-blue-800 text-gray-50">
                        Edit <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button @click="adminAuthStore.showDeleteModal(item)"
                        class="flex items-center justify-center w-24 gap-2 py-3 bg-red-500 text-gray-50">
                        Remove<i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </template>
        </EasyDataTable>
        <UpdateModal title="Update user" :show="adminAuthStore.isUpdateUserModal">
            <template #default>
                <div class="grid grid-cols-2 gap-3">
                    <label class="w-full max-w-xs form-control">
                        <div class="label">
                            <span class="font-bold label-text">Employee ID</span>
                        </div>
                        <input v-model="adminAuthStore.newUser.empId" type="text" placeholder="Type here"
                            class="w-full max-w-xs input input-bordered" />
                    </label>
                    <label class="w-full max-w-xs form-control">
                        <div class="label">
                            <span class="font-bold label-text">Full Name</span>
                        </div>
                        <input v-model="adminAuthStore.newUser.fullName" type="text" placeholder="Type here"
                            class="w-full max-w-xs input input-bordered" />
                    </label>
                    <label class="w-full max-w-xs form-control">
                        <div class="label">
                            <span class="font-bold label-text">Email Address</span>
                        </div>
                        <input v-model="adminAuthStore.newUser.emailAddress" type="text" placeholder="Type here"
                            class="w-full max-w-xs input input-bordered" />
                    </label>
                    <label class="w-full max-w-xs form-control">
                        <div class="label">
                            <span class="font-bold label-text">Contact Number</span>
                        </div>
                        <input v-model="adminAuthStore.newUser.contact" type="text" placeholder="Type here"
                            class="w-full max-w-xs input input-bordered" />
                    </label>
                </div>
            </template>
            <template #actions>
                <button @click="adminAuthStore.hideUpdateModal" class="text-gray-800 btn btn-outline">
                    Cancel
                </button>
                <button type="submit" @click="adminAuthStore.updateUserHandler" class="btn btn-primary text-gray-50">
                    Update user
                </button>
            </template>
        </UpdateModal>
        <DeleteModal title="Delete user" :show="adminAuthStore.isDeleteUserModal">
            <template #default>
                <p class="text-xl font-bold">Are you sure
                    you want to delete this
                    account?</p>
            </template>
            <template #actions>
                <button @click="adminAuthStore.isDeleteUserModal = false" class="text-gray-800 btn btn-outline">
                    Cancel
                </button>
                <button @click="adminAuthStore.deleteUserHandler" type="submit"
                    class="bg-red-800 hover:bg-red-500 btn text-gray-50">
                    Delete user
                </button>
            </template>
        </DeleteModal>
    </div>
</template>

<script setup>
import { useAdminAuthStore } from "@/stores/AdminAuth";
import UpdateModal from "./../../UI/BaseDialog.vue";
import DeleteModal from "./../../UI/BaseDialog.vue";
const adminAuthStore = useAdminAuthStore();

const headers = [
    { text: "EmployeeID", value: "employeeID" },
    { text: "Full Name", value: "fullName" },
    { text: "Email Address", value: "emailAddress" },
    { text: "Contact Number", value: "contactNumber" },
    { text: "User Name", value: "userName" },
    { text: "Action", value: "operation", width: 50 },
];
</script>
<style scoped>
.customize-table {
    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 60px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: rgb(30 64 175);
    --easy-table-body-row-font-size: 16px;

    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 16px;
}
</style>
