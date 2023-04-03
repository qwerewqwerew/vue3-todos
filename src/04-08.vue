<template>
  <div class="container">
    <h1>오늘의 할일</h1>
    <TodoBasicForm @add-todo="onSubmit" />
    <div v-if="!tolist.length">등록된 일정이 없습니다</div>
    <TodoList
      :tolist="tolist"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import TodoBasicForm from "./components/TodoBasicForm.vue";
import TodoList from "./components/TodoList.vue";
export default {
  components: {
    TodoBasicForm,
    TodoList,
  },
  setup() {
    const toggle = ref(false);
    const tolist = ref([]);
    const onSubmit = (todo) => {
      tolist.value.push(todo);
    };
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };
    const deleteTodo = (index) => {
      console.log(index);
      tolist.value.splice(index, 1);
    };
    const toggleTodo = (index) => {
      console.log(index);
      tolist.value[index].completed = !tolist.value[index].completed;
    };

    return { onSubmit, tolist, toggle, todoStyle, deleteTodo, toggleTodo };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>