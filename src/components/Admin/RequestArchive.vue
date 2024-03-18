<template>
    <section class="w-full px-3 pb-0 mx-auto pt-28 md:px-12">
        <div>
            <router-link to="/admin_dashboard" class="flex items-center gap-2 text-lg text-blue-800 btn-md"><i
                    class="fa-solid fa-arrow-left"></i> Dashboard</router-link>
        </div>

        <div class="py-3">
            <div class="flex items-center justify-between">
                <p class="py-3 text-3xl font-bold">List of Archive request</p>
                <button @click="adminAuthStore.exportToExcel"
                    class="flex items-center text-lg transition-all bg-blue-800 btn btn-md hover:bg-blue-500 text-gray-50">
                    Export to Excel <i class="fa-solid fa-download"></i>
                </button>
            </div>
            <EasyDataTable :headers="headers" alternating :items="adminStore.archiveRequest"
                table-class-name="customize-table" :rows-per-page="10" border-cell header-text-direction="left">
            </EasyDataTable>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/Admin";
import BaseDialog from "@/components/Admin/BaseDialog.vue";
import RejectDialog from "@/components/Admin/RejectDialog.vue";
import ArchiveDialog from "@/components/Admin/ArchiveDialog.vue";
import { useAdminAuthStore } from "@/stores/AdminAuth";
import { useStudentAuthStore } from "@/stores/StudentAuth";

const adminStore = useAdminStore();
const adminAuthStore = useAdminAuthStore();
adminStore.getArchiveRequest();

const headers = [
    { text: "LRN", value: "learnerReferenceNumber", width: 200 },
    { text: "REQUESTOR", value: "requestorName", width: 200 },
    { text: "DATE CREATED", value: "dateCreated", width: 200 },
    { text: "TYPES OF DOC.", value: "documentType", width: 200 },
    { text: "PURPOSE OF REQUEST", value: "purpose", width: 200 },
    { text: "SUPPORTING DOCUMENTS", value: "fileName", width: 200 },
    { text: "PROOF OF PAYMENT", value: "proof", width: 200 },
    {
        text: "PICK UP DATE",
        value: "pickUpDate",
        width: 150,
    },
    { text: "STATUS", value: "status" },
];

// onMounted(async () => {
//     await studentAuthStore.checkAuthStudent();
//     if (studentAuthStore.isAuthenticatedStudent) {
//         return router.push("/student_dashboard");
//     }
//     await adminAuthStore.checkAuth()
//     if (adminAuthStore.isAuthenticated) {
//         return router.push('/admin_dashboard')
//     }
//     router.push('/')
// });
</script>

<style scoped>
.customize-table {
    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 60px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: rgb(30 64 175);
    --easy-table-body-row-font-size: 16px;

    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 20px;
}
</style>
