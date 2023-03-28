<template>
  <div class="container">
    <h1>오늘의 할일</h1>
    <TodoBasicForm @add-todo="onSubmit" />
    <div v-if="!tolist.length">등록된 일정이 없습니다</div>

    <div class="card mb-2">
      <div
        v-for="i in tolist"
        :key="i.id"
        class="card-body p-2 d-flex align-items-center"
      >
        <div class="form-check flex-grow-1">
          <label class="form-check-label" :class="{ todo: i.complated }">
            {{ i.subject }}
            <input
              v-model="i.complated"
              type="checkbox"
              class="form-check-input"
            />
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(data)">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TodoBasicForm from "./components/TodoBasicForm.vue";
export default {
  components: {
    TodoBasicForm,
  },
  setup() {
    const toggle = ref(false);
    const tolist = ref([]);
    const onSubmit = (todo) => {
      console.log(todo);
      tolist.value.push(todo);
    };
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };
    const deleteTodo = (data) => {
      tolist.value.splice(data, 1);
    };

    return { onSubmit, tolist, toggle, todoStyle, deleteTodo };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>