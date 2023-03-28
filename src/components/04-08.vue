<template>
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
</template>

<script>
export default {
  /* props:['tolist'] */
  props: {
    tolist: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>