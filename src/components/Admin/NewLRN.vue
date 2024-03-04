<template>
    <section class="pt-32">
        <div class="container w-3/6 mx-auto border p-9 shadow">
            <h1 class="font-bold text-3xl">New LRN</h1>
            <div class="sm:py-12">
                <input v-model="lrn" type="number" class="input input-bordered w-full max-w-xs sm:max-w-3xl"
                    placeholder="New LRN" />
            </div>
            <div class="flex justify-end gap-3">
                <button class="btn btn-lg">Reset</button>
                <button @click="saveLrnHandler" class="btn btn-lg btn-primary">Save</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import axiosClient from "@/axiosClient";
import { ref } from "vue";
import { useToast } from "vue-toastification";
const lrn = ref("");
const toast = useToast();

const saveLrnHandler = async () => {
    if (lrn.value.toString().length < 12) {
        return toast.error("LRN must be 12 digits", {
            timeout: 1500,
        });
    }
    if (lrn.value.toString().length > 12) {
        return toast.error("LRN must not exceed 12 digits", {
            timeout: 1500,
        });
    }
    try {
        const newLRN = await axiosClient.post("/admin/addlrn", {
            lrn: lrn.value,
        });
        console.log(newLRN);
        lrn.value = "";
    } catch (err) {
        console.log(err);
    }
};
</script>
