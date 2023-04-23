<template>
	<h1 v-if="editing">일정상세페이지</h1>
	<div v-if="loading">Loading..</div>
	<form
		v-else
		@submit.prevent="onSave">
		<div class="row">
			<div class="col-6">
				<Input
					label="일정명😀"
					v-model:subject="todo.subject"
					:error="subjectError" />
			</div>
			<div
				v-if="editing"
				class="col-6">
				<div class="form-group">
					<label>완료상태: </label>
					<div>
						<button
							class="btn"
							type="button"
							:class="todo.completed ? ' btn-success ' : 'btn-danger'"
							@click="toggleTodoStatus">
							{{ todo.completed ? "완료" : "미완료" }}
						</button>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group">
					<label>일정내용:</label
					><textarea
						class="form-control"
						v-model="todo.body"
						cols="30"
						rows="10"></textarea>
				</div>
			</div>
		</div>
		<button
			type="submit"
			class="btn btn-primary m-2"
			:disabled="!todoUpdated">
			{{ editing ? "수정" : "등록" }}
		</button>
		<button
			class="btn btn-outline-dark ml-2"
			@click="moveToTodoListPage">
			취소
		</button>
	</form>
</template>
<script>
	import { useRoute, useRouter } from "vue-router";
	import axios from "@/axios";
	import { ref, computed } from "vue";
	import { useToast } from "@/composables/toast";
	import Input from "@/components/Input.vue";
	import _ from "lodash";
	export default {
		components: {
			Input,
		},
		props: {
			editing: {
				type: Boolean,
				default: false,
			},
		},
		setup(props) {
			const subjectError = ref("");
			const route = useRoute();
			const router = useRouter();
			const originalTodo = ref(null);
			const todo = ref({
				subject: "",
				completed: false,
				body: "",
			});
			const loading = ref(false);
			const todoId = route.params.id;
			const url = `todos/`;
			const { toastMessage, toastAlertType, showToast, triggerToast } = useToast();

			const getTodo = () => {
				loading.value = true;
				axios
					.get(`${url}${todoId}`)
					.then((res) => {
						todo.value = { ...res.data };
						originalTodo.value = { ...res.data };
						loading.value = false;
					})
					.catch((error) => {
						console.log(error);
						loading.value = false;
					});
			};

			if (props.editing) {
				getTodo();
			}

			const onSave = () => {
				subjectError.value = "";
				if (!todo.value.subject) {
					subjectError.value = "일정명은 필수입력사항 입니다";
					return;
				}
				axios({
					method: props.editing ? "put" : "post",
					url: props.editing ? `todos/${todoId}` : "todos",
					data: {
						subject: todo.value.subject,
						completed: todo.value.completed,
						body: todo.value.body,
					},
				})
					.then((res) => {
						console.log(props.editing);
						const message = `${props.editing ? "수정에" : "등록에"} 성공 하였습니다`;
						triggerToast(message);
						if (!props.editing) {
							router.push({
								name: "Todos",
							});
						} else {
							originalTodo.value = { ...res.data };
						}
					})
					.catch((error) => {
						console.log(error);
						triggerToast("일시적으로 오류가 발생하였습니다 잠시후 다시 이용해주세요", "danger");
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
			const todoUpdated = computed(() => {
				return !_.isEqual(todo.value, originalTodo.value);
			});

			return {
				subjectError,
				toastAlertType,
				todoUpdated,
				todo,
				loading,
				toggleTodoStatus,
				moveToTodoListPage,
				onSave,
				showToast,
				toastMessage,
			};
		},
	};
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}

	.fade-enter-to,
	.fade-leave-from {
		opacity: 1;
		transform: translateY(0px);
	}
</style>
