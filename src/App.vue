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
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">등록된 일정이 없습니다</div>
    <div v-if="!filteredTodos.length">검색결과가 없습니다</div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" href="#"> Previous </a>
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
    {{ numberOfPages }}
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
    const totalTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const numberOfPages = computed(() => {
      return Math.ceil(totalTodos.value / limit);
    });
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });
    const getTodos = () => {
      axios
        .get(
          `http://localhost:3000/todos?_page=${currentPage.value}&_limit=${limit}`
        )
        .then((res) => {
          totalTodos.value = res.headers["x-total-count"];
          console.log(res.headers["x-total-count"]);
          todos.value = res.data;
        })
        .catch((err) => {
          err.value =
            "일시적으로 오류가 발생했습니다. 잠시후 다시 이용해주세요";
        });
    };
    getTodos();
    const onSubmit = (todo) => {
      error.value = "";
      axios
        .post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.complated,
        })
        .then((res) => {
          console.log(res.data);
          todos.value.push(res.data);
        })
        .catch((err) => {
          err.value =
            "일시적으로 오류가 발생했습니다. 잠시후 다시 이용해주세요";
        });
    };

    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const deleteTodo = (index) => {
      error.value = "";
      const id = todos.value[index].id;
      axios
        .delete("http://localhost:3000/todos/" + id)
        .then(() => {
          alert(id);
          todos.value.splice(index, 1);
        })
        .catch(() => {
          error.value =
            "일시적으로 오류가 발생했습니다. 잠시후 다시 이용해주세요";
        });
    };

    const toggleTodo = (index) => {
      error.value = "";
      const id = todos.value[index].id;
      console.log(todos.value[index].completed);
      axios
        .patch("http://localhost:3000/todos/" + id, {
          completed: !todos.value[index].completed,
        })
        .then(() => {
          todos.value[index].completed = !todos.value[index].completed;
        })
        .catch(() => {
          error.value =
            "일시적으로 오류가 발생했습니다. 잠시후 다시 이용해주세요";
        });
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
      error,
      numberOfPages,
      currentPage,
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