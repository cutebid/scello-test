<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
let activeTab = ref(1);
const tabItems = ref([
  {
    id: 1,
    tab: "All",
  },
  {
    id: 2,
    tab: "Paid",
  },
  {
    id: 3,
    tab: "Unpaid",
  },
  {
    id: 4,
    tab: "Overdue",
  },
]);

const totalPayableAmount = computed(() => {
  return store.state.user.data.reduce((cumulative, item) => {
    if (item.paidStatus == "unpaid" || item.paidStatus == "overdue") {
      return cumulative + item.amount;
    } else {
      return cumulative;
    }
  }, 0);
});

const switchTab = (id) => {
  activeTab.value = id;
  emit("get:id", id);
};

const emit = defineEmits(["get:id"]);
</script>
<template>
  <div class="header-tab flex justify-between items-center">
    <div class="flex">
      <p
        v-for="item in tabItems"
        :key="item.id"
        :class="`px-4 py-3 text-sm ${
          activeTab === item.id ? 'active-tab' : ''
        }`"
        @click="switchTab(item.id)"
      >
        {{ item.tab }}
      </p>
    </div>
    <p class="amount">
      Total payable amount:
      <span class="amount__price"> ${{ totalPayableAmount }} </span>
      <span class="amount__unit">USD</span>
    </p>
  </div>
</template>
<style scoped lang="scss">
.header-tab {
  border-bottom: 1px solid #cdc7e1;
  @apply text-primaryVariant font-medium;
  .amount {
    @apply text-sm;
    &__price {
      @apply text-purple text-xl;
    }
    &__unit {
      @apply text-xl;
    }
  }
  .active-tab {
    border-bottom: 2px solid black;
  }
}
</style>
