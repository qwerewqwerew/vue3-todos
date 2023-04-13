<template>
	<div class="card mb-2">
		<div @click="moveToPage(todo.id)" v-for="(todo, index) in todos" :key="todo.id" class="card-body p-2 d-flex align-items-center" style="cursor: pointer">
			<div class="flex-grow-1">
				<input class="ms-2 me-2" type="checkbox" :checked="todo.completed" @change="toggleTodo(index, $event)" @click.stop />
				<span :class="{ todo: todo.completed }">
					{{ todo.subject }}
				</span>
			</div>
			<div>
				<button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">삭제</button>
			</div>
		</div>
	</div>
	<teleport to="#new">
		<Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
	</teleport>
</template>

<script>
	import Modal from "@/components/DeleteModal.vue";
	import { useRouter } from "vue-router";
	import { ref } from "vue";
	export default {
		components: {
			Modal,
		},
		props: {
			todos: {
				type: Array,
				required: true,
			},
		},
		emits: ["toggle-todo", "delete-todo"],
		setup(props, { emit }) {
			const router = useRouter();
			const showModal = ref(false);
			const todoDeleteId = ref(null);

			const closeModal = () => {
				todoDeleteId.value = null;
				showModal.value = false;
			};

			const toggleTodo = (index, event) => {
				emit("toggle-todo", index, event.target.checked);
			};
			const openModal = (id) => {
				todoDeleteId.value = id;
				showModal.value = true;
			};

			const moveToPage = (todoId) => {
				router.push("/todos/" + todoId);
				router.push({
					name: "Todo",
					params: {
						id: todoId,
					},
				});
			};
			return {
				openModal,
				toggleTodo,
				moveToPage,
				showModal,
				closeModal,
			};
		},
	};
</script>

<style></style>
