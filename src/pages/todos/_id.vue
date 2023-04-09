<template>
  <h1>일정목록페이지</h1>
  <div v-if="loading">Loading..</div>
  <form v-else>
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
    <button
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
    >
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
    const getTodo = () => {
      axios
        .get("http://localhost:3000/todos/" + route.params.id)
        .then((res) => {
          todo.value = res.data;
          loading.value = false;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getTodo();

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
    };
  },
};
</script>


<style>
</style>