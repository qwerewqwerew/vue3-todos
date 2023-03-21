<template>
  <div class="container">
    <h1>오늘의 할일</h1>
    <form action="#" class="d-flex" @:submit.prevent="onSubmit">
      <div class="input-group mb-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="할일을 추가하세요"
        />
        <button class="btn btn-primary" type="submit">추가하기</button>
      </div>
    </form>
    <!-- {{ tolist }} -->
    <div class="card mb-2">
      <div class="card-body p-2">
        {{ tolist[0].subject }}
      </div>
    </div>
    <div class="card mb-2">
      <div class="card-body p-2">
        {{ tolist[1].subject }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref("");
    const tolist = ref([
      { id: 1, subject: "리액트 공부" },
      { id: 2, subject: "자바스크립트 공부" },
    ]);

    const onSubmit = () => {
      console.log(todo.value);
      tolist.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    };

    return {
      todo,
      onSubmit,
      tolist,
    };
  },
};
</script>

<style>
.red {
  color: red;
}
</style>