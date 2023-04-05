<template>
  <div class="container">
    <h1>오늘의 할일</h1>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <hr />
    <TodoBasicForm @add-todo="onSubmit" />
    <div style="color:red">{{error}}</div>
    <div v-if="!todos.length">등록된 일정이 없습니다</div>
    <div v-if="!filteredTodos.length">검색결과가 없습니다</div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed } from "vue";
import TodoBasicForm from "./components/TodoBasicForm.vue";
import TodoList from "./components/TodoList.vue";
export default {
  components: {
    TodoBasicForm,
    TodoList,
  },
  setup() {
    const error = ref("");
    const toggle = ref(false);
    const todos = ref([]);
    const searchText = ref("");
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });
    const onSubmit = (todo) => {
      error.value = "";
      axios
        .post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        })
        .then((res) => {
          return [console.log("res", res), todos.value.push(res.data)];
        })
        .catch((err) => {
          console.log(err);
          error.value="일시적으로 오류가 발생했습니다. 잠시후 다시 이용해주세요"
        });
    };
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };
    const deleteTodo = (index) => {
      console.log(index);
      todos.value.splice(index, 1);
    };
    const toggleTodo = (index) => {
      console.log(index);
      todos.value[index].completed = !todos.value[index].completed;
    };

    return {
      onSubmit,
      todos,
      toggle,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error
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