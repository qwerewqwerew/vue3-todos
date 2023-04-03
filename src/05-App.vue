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
    <div v-if="!tolist.length">등록된 일정이 없습니다</div>
    <div v-if="!filteredTodos.length">검색결과가 없습니다</div>
    <TodoList
      :tolist="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
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
    const searchText = ref("");
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return tolist.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return tolist.value;
    });
    const onSubmit = (todo) => {
      //데이터베이스에 todo 데이터를 저장
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

    return {
      onSubmit,
      tolist,
      toggle,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
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