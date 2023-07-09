<script setup>
import ArrowLeft from "./icons/ArrowLeft.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import ArrowSolidDown from "./icons/ArrowSolidDown.vue";

defineProps({
  startValue: Number,
  endValue: Number,
  userLength: Number,
  rowPerPage: Number,
});
const next = () => {
  emit("next-page");
};
const back = () => {
  emit("previous-page");
};

const emit = defineEmits(["next-page", "previous-page"]);
</script>
<template>
  <div class="pagination flex justify-end pr-10 py-[15px]">
    <div class="flex items-center">
      <p class="mr-4">Rows per page: {{ rowPerPage }}</p>
      <ArrowSolidDown @click="changePerPage" />
    </div>
    <p class="mx-8">{{ startValue + 1 }}-{{ endValue }} of {{ userLength }}</p>
    <div class="flex items-center">
      <ArrowLeft @click="back" class="mr-8" />
      <ArrowRight @click="next" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.pagination {
  background-color: #f4f2ff;
  color: var(--fonts-primary-variant, #6e6893);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.6px;
  width: 100%;
}
</style>
