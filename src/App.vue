<template>
  <div :class="red">{{ name }}</div>
  <!-- <input type="text" :value="name" @input="updateName" /> -->
  <input type="text" v-model="name" />
  <button class="btn-primary" @:click="onSubmit">click</button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const name = ref("김망고");

    const onSubmit = () => {
      console.log(name.value);
    };
    /*     const updateName = (e) => {
      console.log(e.target.value);
      name.value = e.target.value;
    }; */

    return {
      name,
      onSubmit,
      /* updateName, */
    };
  },
};
</script>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
</style>