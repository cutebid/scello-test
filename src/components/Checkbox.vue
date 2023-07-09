<script setup>
import { ref } from "vue";

const checked = ref(false);

const props = defineProps({
  id: Number,
});

const handleChange = () => {
  emit("change", { checked: checked.value, id: props.id });
};
const emit = defineEmits(["change"]);
</script>

<template>
  <label class="custom-checkbox">
    <input type="checkbox" v-model="checked" @change="handleChange" />
    <span class="checkmark"></span>
    <slot></slot>
  </label>
</template>
<style lang="scss" scoped>
.custom-checkbox {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  margin-right: 8px;

  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  .checkmark {
    position: absolute;
    top: -12px;
    left: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #8b83ba;
    border-radius: 2px;
    background-color: #fff;
  }

  input[type="checkbox"]:checked + .checkmark {
    @apply bg-purple;
  }

  .checkmark::after {
    content: "";
    position: absolute;
    display: none;
  }

  input[type="checkbox"]:checked + .checkmark::after {
    display: block;
  }

  .checkmark::after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}
</style>
