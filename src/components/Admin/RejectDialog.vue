<template>
  <teleport to="body">
    <div v-if="show" @click="closeHandler" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show" class="w-[80%] sm:w-3/6 lg:w-3/6 xl:w-1/12">
        <header class="bg-blue-800">
          <slot name="header">
            <h2 class="py-3 text-2xl font-bold text-center">{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">

          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["close"]);

function closeHandler() {
  if (props.fixed) {
    return;
  }
  emit("close");
}
</script>
  
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

dialog {
  position: fixed;
  top: 30vh;
  left: 10dvw;
  z-index: 999;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
  width: 80%;
}

header {
  color: white;
  width: 100%;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);


}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.2s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 1280px) {
  dialog {
    top: 25svh;
    left: 35dvw;
    width: 30%;
  }
}
</style>
  
  
  