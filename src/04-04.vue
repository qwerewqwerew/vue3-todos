<template>
  <div class="container">
    <!--     <div v-show="toggle">show</div>
    <div v-show="!toggle">hide</div>
 -->
    <div v-if="toggle">show</div>
    <div v-else>hide</div>
    <button @click="ontoggle">토글버튼</button>
    <h1>오늘의 할일</h1>
    <form action="#" @:submit.prevent="onSubmit">
      <div class="input-group mb-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="할일을 추가하세요"
        />
        <button class="btn btn-primary" type="submit">추가하기</button>
      </div>
      <div v-if="errMsg" class="alert alert-danger">할일을 입력해주세요</div>
    </form>
    <div class="card mb-2">
      <div v-for="i in tolist" :key="i.id" class="card-body p-2">
        {{ i.subject }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const toggle = ref(false);
    const todo = ref("");
    const errMsg = ref(false);
    const tolist = ref([
      { id: 1, subject: "리액트 공부" },
      { id: 2, subject: "자바스크립트 공부" },
    ]);

    const onSubmit = () => {
      if (todo.value === "") {
        errMsg.value = true;
      } else {
        tolist.value.push({
          id: Date.now(),
          subject: todo.value,
        });
        errMsg.value = false;
      }
    };
    const ontoggle = () => {
      toggle.value = !toggle.value;
    };
    return {
      todo,
      onSubmit,
      tolist,
      toggle,
      ontoggle,
      errMsg,
    };
  },
};
</script>

<style>
.red {
  color: red;
}
</style>