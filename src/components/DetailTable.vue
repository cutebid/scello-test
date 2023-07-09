<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  data: Array,
  required: true,
});
</script>

<template>
  <td class="expanded-data" colspan="8">
    <div class="flex items-center expanded-row">
      <p class="pl-20 w-[200px]">DATE</p>
      <p class="pl-5 w-[250px]">USER ACTIVITY</p>
      <p class="flex items-center pl-24">
        DETAIL
        <img src="/src/assets/Info.png" alt="info" />
      </p>
    </div>
    <div>
      <p
        v-if="data.length == 0"
        class="text-center font-semibold text-base text-primaryVariant py-4 bg-[#F4F2FF]"
      >
        No records found
      </p>
      <div
        v-else
        v-for="detail in data"
        :key="detail.id"
        class="expanded-row2 flex items-center"
      >
        <span class="date pl-20 w-[200px]">{{ detail.date }}</span>
        <span class="activity pl-5 w-[250px]">
          {{ detail.activity }}
        </span>
        <span class="detail pr-16 pl-24 flex-1">{{ detail.detail }}</span>
      </div>
    </div>
  </td>
</template>
<style scoped lang="scss">
.expanded-row {
  letter-spacing: 0.6px;
  padding: 12px 120px !important;
  border-bottom: 1px solid #ddd;

  @apply text-primaryVariant text-xs font-semibold uppercase bg-[#f2f0f9];
}
.expanded-row2 {
  letter-spacing: 0.6px;
  padding: 12px 0 12px 120px !important;
  background-color: #f4f2ff;
  border-bottom: 1px solid #ddd;

  @apply text-xs font-semibold uppercase;
}
.activity,
.detail {
  color: #25213b;
}
.date {
  @apply text-primaryVariant;
}
.expanded-data {
  padding: 0;
}
img {
  width: 15px;
  height: 15px;
  object-fit: cover;
  margin-left: 4px;
}
</style>
