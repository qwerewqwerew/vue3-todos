<template>
	<div class="card mb-2">
		<List :items="todos">
			<template #default="{ item, index }">
				<div class="card-body p-2 d-flex align-items-center" style="cursor: pointer" @click="moveToPage(item.id)">
					<div class="flex-grow-1">
						<input class="ml-2 mr-2" type="checkbox" :checked="item.completed" @change="toggleTodo(index, $event)" @click.stop />
						<span :class="{ todo: item.completed }">
							{{ item.subject }}
						</span>
					</div>
					<div>
						<button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">삭제</button>
					</div>
				</div>
			</template>
		</List>
	</div>

	<teleport to="#new">
		<Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
	</teleport>
</template>

<script>
	import Modal from "@/components/DeleteModal.vue";
	import List from "@/components/List.vue";
	import { useRouter } from "vue-router";
	import { ref } from "vue";
	export default {
		components: {
			Modal,
			List,
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
			const deleteTodo = () => {
				emit("delete-todo", todoDeleteId.value);

				showModal.value = false;
				todoDeleteId.value = null;
			};

			const toggleTodo = (index, event) => {
				console.log(index, event);
				emit("toggle-todo", index, event.target.checked);
			};

			const openModal = (id) => {
				todoDeleteId.value = id;
				showModal.value = true;
			};

			const moveToPage = (todoId) => {
				//router.push("/todos/" + todoId);
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
				deleteTodo,
			};
		},
	};
</script>

<style></style>
