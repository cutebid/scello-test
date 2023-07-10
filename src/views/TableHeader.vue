<script setup>
import DataTable from "../components/DataTable.vue";
import { ref, onMounted, computed, watch } from "vue";
import HeaderTab from "../components/HeaderTab.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import Filter from "../components/icons/Filter.vue";
import RadioInput from "../components/RadioInput.vue";
import { useStore } from "vuex";
import Pagination from "../components/Pagination.vue";

const store = useStore();
let user = ref();
const checkedStatus = ref([]);
const sortContainer = ref(false);
const rowPerPage = ref(10);
let startValue = ref(0);
let endValue = ref(10);
const options = ref([
  { value: "default", label: "Default" },
  { value: "first_name", label: "First Name" },
  { value: "last_name", label: "Last Name" },
  { value: "Due_date", label: "Due Date" },
  { value: "last_login", label: "Last Login" },
]);
const options2 = ref([
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]);

const column = ref([
  { key: "name", label: "NAME" },
  { key: "user", label: "USER STATUS" },
  { key: "payment", label: "PAYMENT STATUS" },
  { key: "amount", label: "AMOUNT" },
]);

onMounted(() => {
  user.value = store.state.user.data.slice(startValue.value, endValue.value);
  if (endValue.value > computedUser.value.length) {
    endValue.value = computedUser.value.length;
  } else {
    endValue.value = rowPerPage.value;
  }
});

let computedUser = computed(() => {
  return store.state.user.data;
});

const getId = (id) => {
  switch (id) {
    case 1:
      user.value = store.state.user.data;
      break;

    case 2:
      user.value = store.state.user.data.filter(
        (item) => item.paidStatus == "paid"
      );
      break;
    case 3:
      user.value = store.state.user.data.filter(
        (item) => item.paidStatus == "unpaid"
      );
      break;
    case 4:
      user.value = store.state.user.data.filter(
        (item) => item.paidStatus == "overdue"
      );
      break;

    default:
      break;
  }
};

const payDue = () => {
  console.log(checkedStatus.value);
  const userArray = user.value.map((user) => {
    const uniqUser = checkedStatus.value.find((item) => user.id == item.id);
    return uniqUser?.id == user.id && user.paidStatus == "unpaid"
      ? { ...user, paidStatus: "paid" }
      : user;
  });
  user.value = userArray;
  store.dispatch("GetUserInfo", user.value);
};
const getCheckedValue = (value) => {
  if (!value.checked) {
    let checkedValue = checkedStatus.value.filter(
      (item) => item.id !== value.id
    );
    checkedStatus.value = checkedValue;
  } else {
    checkedStatus.value.push(value);
  }
};
const toggleSortContainer = () => {
  sortContainer.value = !sortContainer.value;
};
const nextPage = () => {
  if (endValue.value + rowPerPage.value <= computedUser.value.length) {
    startValue.value += rowPerPage.value;
    endValue.value += rowPerPage.value;
  } else if (startValue.value + rowPerPage.value <= computedUser.value.length) {
    startValue.value += rowPerPage.value;
    endValue.value = computedUser.value.length;
  }
  console.log(startValue.value + rowPerPage.value, computedUser.value.length);
};
const previousPage = () => {
  if (
    startValue.value - rowPerPage.value >= 0 &&
    endValue.value !== computedUser.value.length
  ) {
    startValue.value -= rowPerPage.value;
    endValue.value -= rowPerPage.value;
  } else if (
    endValue.value == computedUser.value.length &&
    startValue.value - rowPerPage.value >= 0
  ) {
    startValue.value -= rowPerPage.value;
    endValue.value = startValue.value + rowPerPage.value;
  }
};

const sortData = (value) => {
  let defaultValue = [...user.value];
  if (value == "first_name") {
    defaultValue.sort((a, b) => {
      return a.fname.localeCompare(b.fname);
    });
    user.value = defaultValue;
  }
  if (value == "last_name") {
    defaultValue.sort((a, b) => {
      return a.lname.localeCompare(b.lname);
    });
    user.value = defaultValue;
  }
  if (value == "default") {
    user.value = store.state.user.data;
  }
  sortContainer.value = false;
};

const filterKey = ref("");

watch([startValue, endValue], () => {
  user.value = store.state.user.data.slice(startValue.value, endValue.value);
});
</script>
<template>
  <div class="table-header">
    <h1 class="table-header__heading">Table Heading</h1>
    <HeaderTab @get:id="getId" />
    <div class="mt-5">
      <div class="table-wrapper">
        <div class="flex items-center justify-between relative px-5 mb-[15px]">
          <div class="flex items-center">
            <div class="">
              <div
                class="filter-wrapper flex items-aligned"
                @click="toggleSortContainer"
              >
                <Filter />
                <span class="ml-2">Filter</span>
              </div>
            </div>

            <div class="search-wrapper flex">
              <SearchIcon />
              <input
                placeholder="Search Users by Name, Email or Date"
                v-model="filterKey"
                class=""
              />
            </div>
          </div>
          <div v-if="sortContainer" class="sort-container absolute top-10 z-50">
            <div>
              <div>
                <p>Sort By:</p>
                <RadioInput
                  name="radioGroup"
                  :options="options"
                  @sort:data="sortData"
                />
              </div>
              <div class="mt-6">
                <p>Users:</p>
                <RadioInput name="radioGroup2" :options="options2" />
              </div>
            </div>
          </div>
          <button @click="payDue">PAY DUES</button>
        </div>
        <DataTable
          @checked:value="getCheckedValue"
          :columns="column"
          :data="user"
          :filterKey="filterKey"
          ><!-- Slot for 'name' column -->
          <template #name="{ item }">
            <div class="flex flex-col">
              <span class="name">{{ item.fname }} {{ item.lname }}</span>
              <span class="email mt-1">{{ item.email }}</span>
            </div>
          </template>

          <!-- Slot for 'user' column -->
          <template #user="{ item }">
            <div class="">
              <div
                class="inline-flex items-center bg-[#E6E6F2]"
                :class="{ active: item.active, inactive: !item.active }"
              >
                <span class="w-2 h-2 rounded-full mr-2"></span>
                {{ item.active ? "Active" : "Inactive" }}
              </div>
              <br />
              <span class="text-xs text-primaryVariant mt-1">
                last login: {{ item.lastLogin }}</span
              >
            </div>
          </template>

          <!-- Slot for 'payment' column -->
          <template #payment="{ item }">
            <div class="flex flex-col">
              <div>
                <div
                  class="inline-flex items-center"
                  :class="{
                    paid: item.paidStatus == 'paid',
                    unpaid: item.paidStatus == 'unpaid',
                    overdue: item.paidStatus == 'overdue',
                  }"
                >
                  <span class="w-2 h-2 rounded-full mr-2"></span
                  >{{ item.paidStatus }}
                </div>
              </div>
              <span class="paid-on"> Paid on {{ item.paidOn }} </span>
            </div>
          </template>

          <!-- Slot for 'amount' column -->
          <template #amount="{ item }">
            <div class="flex flex-col">
              <span class="amount">{{ item.amount }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </template>
        </DataTable>
        <Pagination
          :userLength="computedUser.length"
          :startValue="startValue"
          :endValue="endValue"
          :rowPerPage="rowPerPage"
          @next-page="nextPage"
          @previous-page="previousPage"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../../src/sass/mediaquery";

.table-header {
  @apply px-[100px] pt-[50px];

  @include media("<=1024px") {
    @apply px-3;
  }
  @include media("<=768px") {
    overflow: scroll;
    width: 900px;
  }

  &__heading {
    @apply text-primaryVariant text-sm font-bold uppercase mb-3;
  }
  .table-wrapper {
    border: 1px solid #ddd;
    background-color: #fff;

    box-shadow: 0px 32px 48px -20px rgba(100, 112, 122, 0.15);
    @apply pt-[15px]  rounded-lg;

    @include media("<=768px") {
      width: 900px;
    }

    .filter-wrapper {
      border: 1px solid #c6c2de;
      padding: 10px;
      border-radius: 6px;
      margin-right: 20px;
    }
    .search-wrapper {
      width: 392px;
      border-radius: 6px;
      background: #f4f2ff;
      padding: 10px;
      @apply ml-2;

      &:hover {
        border: 1px solid #c6c2de;
        background-color: #fff;
      }

      & input {
        background-color: transparent;
        @apply ml-2;
        &::placeholder {
          @apply text-xs text-primaryVariant;
        }
        &:focus {
          border: none;
          outline: none;
          @apply cursor-progress;
        }
      }
    }
    button {
      color: #fff;
      border-radius: 6px;
      @apply bg-purple font-semibold py-2 px-3 outline-none border-none;
    }
  }
  .name {
    @apply text-fontPrimary font-medium text-sm;
  }
  .email {
    @apply text-primaryVariant text-sm;
  }
  .active {
    @apply text-[#4A4AFF] text-xs font-medium
      rounded-[10px];

    span {
      @apply bg-[#4A4AFF];
    }
  }
  .inactive {
    @apply text-primaryVariant text-xs font-medium;

    span {
      @apply bg-primaryVariant;
    }
  }
  .paid {
    color: #007f00;
    font-size: 12px;
    background-color: #cdffcd;
    border-radius: 6px;

    span {
      @apply bg-[#007F00];
    }
  }
  .unpaid {
    color: #965e00;
    font-size: 12px;
    font-weight: 500;
    background-color: #ffeccc;
    border-radius: 6px;
    span {
      @apply bg-[#965e00];
    }
  }
  .overdue {
    border-radius: 6px;
    background-color: #ffe0e0;
    color: #d30000;
    font-size: 12px;
    font-weight: 500;
    span {
      @apply bg-[#d30000];
    }
  }
  .amount {
    color: #25213b;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }
  .unit {
    @apply text-primaryVariant;
    font-size: 12px;
    letter-spacing: 0.6px;
  }
  .paid-on {
    color: #25213b;
    font-size: 12px;
    font-weight: 500;
    margin-top: 5px;
  }
  .sort-container {
    border-radius: 6px;
    border: 1px solid #c6c2de;
    background: #fff;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2);
    width: 224px;
    padding: 20px;

    p {
      color: #6e6893;
      font-size: 12px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
  }
}
</style>
