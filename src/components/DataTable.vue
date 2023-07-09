<script setup>
import { computed, ref } from "vue";
import Checkbox from "../components/Checkbox.vue";
import MenuIcon from "./icons/MenuIcon.vue";
import DropdownIcon from "./icons/DropdownIcon.vue";
import Arrowup from "./icons/Arrowup.vue";
import DetailTable from "./DetailTable.vue";
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  filterKey: {
    type: String,
    default: "",
  },
});

let filteredData = computed(() => {
  const filterValue = props.filterKey.toLowerCase();
  return props.data?.filter(
    (item) =>
      String(item.fname).toLowerCase().includes(filterValue) ||
      String(item.lname).toLowerCase().includes(filterValue) ||
      String(item.email).toLowerCase().includes(filterValue)
  );
});

const sortedData = ref();
const expandedRowId = ref(null);

const toggleRow = (itemId) => {
  expandedRowId.value = itemId === expandedRowId.value ? null : itemId;
};

const getCheckedValue = (value) => {
  emit("checked:value", value);
};

const emit = defineEmits(["checked:value"]);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="checkbox-cell">
          <Checkbox class="checkbox-cell__icon" />
        </th>

        <th
          v-for="column in columns"
          :key="column.key"
          :class="{ 'text-blue-600': column.key === 'name' }"
        >
          <div class="flex items-center">
            <span> {{ column.label }}</span>
          </div>
        </th>
        <th></th>
        <th><MenuIcon /></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in filteredData" :key="item.id">
        <tr
          @click="toggleRow(item.id)"
          :class="{ 'bg-[#F4F2FF]': expandedRowId == item.id }"
        >
          <!-- Render data row -->
          <td class="checkbox">
            <div class="flex items-center">
              <Checkbox
                :id="item.id"
                class="checkbox__icon"
                @change="getCheckedValue"
              />
              <div
                v-if="expandedRowId === item.id"
                class="dropdown-icon w-[15px] h-[15px] ml-10"
              >
                <Arrowup />
              </div>
              <div v-else class="dropdown-icon w-[15px] h-[15px] ml-10">
                <DropdownIcon />
              </div>
            </div>
          </td>

          <td v-for="column in columns" :key="column.key">
            <slot :name="column.key" :item="item"></slot>
          </td>
          <td class="view-more">View More</td>
          <td>
            <MenuIcon />
          </td>
        </tr>

        <!-- Render row -->
        <tr v-if="expandedRowId === item.id">
          <DetailTable :data="item.detailData" />
        </tr>
      </template>
    </tbody>
  </table>
</template>
<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
tr {
  border-bottom: 1px solid #ddd;
  position: relative;
}
th {
  background-color: #f4f2ff;
  letter-spacing: 0.6px;
  padding: 12px 0px 12px 20px;

  @apply text-primaryVariant text-xs font-semibold uppercase;
}
td {
  position: relative;
  padding: 12px 0px 12px 20px;

  .dropdown-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1.5px solid #8b83ba;
  }
}
.view-more {
  @apply text-primaryVariant;
  font-size: 12px;
  font-weight: 500;
}
</style>
