<template>
  <h1>일정목록</h1>
</template>


<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    console.log(route.params.id);
  },
};
</script>

<style>
</style>