<template>
  <div>
    <h1>오늘의 할일</h1>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    />
    <hr />
    <TodoBasicForm @add-todo="onSubmit" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">등록된 일정이 없습니다</div>
    <div v-if="!todos.length">검색결과가 없습니다</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)"> 이전 </a>
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a class="page-link" @click="getTodos(currentPage + 1)">다음</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import axios from "axios";
import TodoBasicForm from "@/components/TodoBasicForm.vue";
import TodoList from "@/components/TodoList.vue";
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
    let limit = 5;
    const currentPage = ref(1);

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };
    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });
    const numberOfPages = computed(() => {
      return Math.ceil(totalTodos.value / limit);
    });

    const getTodos = (page = currentPage.value) => {
      currentPage.value = page;
      axios
        .get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          totalTodos.value = res.headers["x-total-count"];
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
        .then(() => {
          alert("목록이 등록 되었습니다");
          getTodos(1);
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
          alert("삭제 되었습니다");
          todos.value.splice(index, 1);
        })
        .catch(() => {
          error.value =
            "일시적으로 오류가 발생했습니다. 잠시후 다시 이용해주세요";
        });
    };

    const toggleTodo = (index,checked) => {
      console.log(checked);
      error.value = "";
      const id = todos.value[index].id;
      axios
        .patch("http://localhost:3000/todos/" + id, {
          completed: checked,
        })
        .then(() => {
          todos.value[index].completed = checked;
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
      searchTodo,
      error,
      numberOfPages,
      currentPage,
      getTodos,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
.page-item a {
  cursor: pointer;
}
</style>