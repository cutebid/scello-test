<script setup>
import { ref } from "vue";

const selectedValue = ref(props.lastSort);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  selected: {
    type: [String, Number],
    default: null,
  },
  lastSort: {
    type: String,
    required: true,
  },
});
const sortData = (value) => {
  emit("sort:data", value);
};

const handleChange = () => {
  emit("update:selected", selectedValue.value);
};

const emit = defineEmits(["update:selected", "sort:data"]);
</script>

<template>
  <div
    class="radio-group mt-[10px]"
    v-for="option in options"
    :key="option.name"
    @click="sortData(option.value)"
  >
    <label class="">
      <p>{{ option.label }}</p>
      <input
        type="radio"
        name="radio"
        :id="option.value"
        :value="option.value"
        v-model="selectedValue"
        @change="handleChange"
      />
      <span class="radio-custom"></span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.radio-group {
  padding: 5px;
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #25213b;
    font-size: 14px;
    letter-spacing: 0.7px;

    input[type="radio"] {
      display: none;

      + .radio-custom {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        height: 15px;
        margin-right: 6px;
        border: 2px solid #8b83ba;

        border-radius: 50%;

        &:before {
          content: "";
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #fff;
          opacity: 0;
        }
      }

      &:checked + .radio-custom:before {
        opacity: 1;
        background-color: white;
      }

      &:checked + .radio-custom {
        background-color: #6d5bd0;
        border: none;
      }
    }
  }

  &:hover {
    border-radius: 4px;
    background: #f2f0f9;
  }
}
</style>
