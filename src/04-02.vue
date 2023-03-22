<template>
  <div :class="red">{{ name }}</div>
  <input type="text" :value="name" />
  <button class="btn-primary" @:click="updateName">click</button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const name = ref("김망고");
    //const red = ref("red");
    const red = ref("");
    const updateName = () => {
      name.value = "공주";
      red.value = "green";
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
.green {
  color: green;
}
</style>