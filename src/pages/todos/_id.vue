<template>
  <h1>일정목록페이지</h1>
  <div v-if="loading">Loading..</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>일정명: </label>
          <input type="text" class="form-control" v-model="todo.subject" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>완료상태: </label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? ' btn-success ' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? "완료" : "미완료" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary">저장</button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">
      취소
    </button>
  </form>
</template>


<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id
    const url="http://localhost:3000/todos/";

    const getTodo = () => {
      axios
        .get(`${url}${todoId}`)
        .then((res) => {
          todo.value = res.data;
          loading.value = false;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getTodo();

    const onSave = () => {
      axios
        .put(`${url}${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
    };
  },
};
</script>


<style>
</style>