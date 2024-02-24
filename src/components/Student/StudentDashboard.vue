<template>
    <section class="w-10/12 mx-auto pb-32 pt-6">
      <header>
        <h1>Welcome Student</h1>
        <h2 class="font-bold text-3xl">Dashboard</h2>
      </header>
      <div class="grid grid-cols-5 gap-x-3">
        <div class="card w-56 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Pending </h2>
            <p class="text-center text-2xl font-bold">0</p>
            <div class="card-actions justify-end">
              <button class="btn w-full btn-primary">View more</button>
            </div>
          </div>
        </div>
        <div class="card w-56 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Approved</h2>
            <p class="text-center text-2xl font-bold">0</p>
            <div class="card-actions justify-end">
              <button class="btn w-full btn-primary">View more</button>
            </div>
          </div>
        </div>
        <div class="card w-56 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Implemented</h2>
            <p class="text-center text-2xl font-bold">0</p>
            <div class="card-actions justify-end">
              <button class="btn w-full btn-primary">View more</button>
            </div>
          </div>
        </div>
        <div class="card w-56 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Completed</h2>
            <p class="text-center text-2xl font-bold">0</p>
            <div class="card-actions justify-end">
              <button class="btn w-full btn-primary">View more</button>
            </div>
          </div>
        </div>
        <div class="card w-56 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">For Rating</h2>
            <p class="text-center text-2xl font-bold">0</p>
            <div class="card-actions justify-end">
              <button class="btn w-full btn-primary">View more</button>
            </div>
          </div>
        </div>
      </div>
      <div class="py-9">
        <EasyDataTable :headers="headers" :items="items" />
      </div>
    </section>
  </template>
  <script lang="ts" setup>
  const headers= [
    { text: "STUDENT NUMBER", value: "player" },
    { text: "REQUESTOR", value: "team" },
    { text: "DATE CREATED", value: "number" },
    { text: "TYPES OF DOC.", value: "position" },
    { text: "DATE NEEDED", value: "indicator.height" },
    { text: "PURPOSE OF REQUEST", value: "indicator.weight", sortable: true },
    { text: "SUPPORTING DOCUMENTS", value: "lastAttended", width: 200 },
    { text: "SCHOOL YEAR LAST ATTENDED", value: "country" },
    { text: "REMARKS", value: "country" },
    { text: "PROOF OF PAYMENT", value: "country" },
    { text: "ACTIONS", value: "country" },
  ];
  
  const items = [
    
  ];
  </script>
  