<template>
  <div v-bind:class="red">
    {{ name }}
  </div>
  <input type="text" v-bind:value="name" />
  <button class="btn-primary" v-on:click="updateName">click</button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const name = ref("user");
    const red = ref("red");
    const updateName = () => {
      name.value = "member";
    };
    return {
      name,
      updateName,
      red,
    };
  },
};
</script>

<style>
.red {
  color: red;
}
</style>