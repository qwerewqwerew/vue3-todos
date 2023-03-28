<template>
  <div class="card mb-2">
    <div
      v-for="i in tolist"
      :key="i.id"
      class="card-body p-2 d-flex align-items-center"
    >
      <div class="form-check flex-grow-1">
        <label class="form-check-label" :class="{ tolist: i.complated }">
          {{ i.subject }}
          <input
            type="checkbox"
            class="form-check-input"
            :value="tolist.completed"
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
    tolist: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, {emit}) {
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