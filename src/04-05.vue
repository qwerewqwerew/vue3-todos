<template>
  <div class="container">
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
      <div v-for="i in todos" :key="i.id" class="card-body p-2">
        <div class="form-check">
          <!-- <label class="form-check-label" :style="i.complated ? todoStyle : {}"> -->
          <label class="form-check-label" :class="{ todo: i.complated }">
            {{ i.subject }}
            <input
              v-model="i.complated"
              type="checkbox"
              class="form-check-input"
            />
          </label>
        </div>
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
    //todos의 초기값을 삭제
    const todos = ref([]);
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const onSubmit = () => {
      if (todo.value === "") {
        errMsg.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          //complated 추가 -> 초기에는 체크되지 않은 상태로 false를 넣는다
          complated: false,
        });
        errMsg.value = false;
        todo.value = "";
      }
      console.log(todos.value);
    };
    const ontoggle = () => {
      toggle.value = !toggle.value;
    };
    return {
      todo,
      onSubmit,
      todos,
      toggle,
      ontoggle,
      errMsg,
      todoStyle,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>