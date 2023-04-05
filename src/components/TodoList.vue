<template>
  <div class="card mb-2">
    <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card-body p-2 d-flex align-items-center"
    >
      <div class="form-check flex-grow-1">
        <label class="form-check-label" :class="{ todo: todo.completed }">
          {{ todo.subject }}
          <input
            type="checkbox"
            class="form-check-input"
            :value="todos.completed"
            @change="toggleTodo(index)"
          />
        </label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };
    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };
    return {
      toggleTodo,
      deleteTodo,
    };
  },
};
</script>

<style>
</style>