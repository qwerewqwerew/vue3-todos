<template>
	<h1 v-if="editing">일정상세페이지</h1>
	<div v-if="loading">Loading..</div>
	<form v-else @submit.prevent="onSave">
		<div class="row">
			<div class="col-6">
				<div class="form-group">
					<label>일정명: </label>
					<input type="text" class="form-control" v-model="todo.subject" />
				</div>
				<div v-if="subjectError" style="color: red">
					{{ subjectError }}
				</div>
			</div>
			<div v-if="editing" class="col-6">
				<div class="form-group">
					<label>완료상태: </label>
					<div>
						<button class="btn" type="button" :class="todo.completed ? ' btn-success ' : 'btn-danger'" @click="toggleTodoStatus">
							{{ todo.completed ? "완료" : "미완료" }}
						</button>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group"><label>일정내용:</label><textarea class="form-control" v-model="todo.body" cols="30" rows="10"></textarea></div>
			</div>
		</div>
		<button type="submit" class="btn btn-primary m-2" :disabled="!todoUpdated">{{ editing ? "수정" : "등록" }}</button>
		<button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">취소</button>
	</form>
	<Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>
<script>
	import { useRoute, useRouter } from "vue-router";
	import axios from "axios";
	import { computed } from "vue";
	import { ref } from "@vue/reactivity";
	import Toast from "@/components/Toast.vue";
	import { useToast } from "@/composables/toast";
	import _ from "lodash";
	export default {
		components: {
			Toast,
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
			const url = "http://localhost:3000/todos/";
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
						triggerToast("일시적으로 오류가 발생하였습니다 잠시후 다시 이용해주세요", "danger");
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
				let res;
				const data = {
					subject: todo.value.subject,
					completed: todo.value.completed,
					body: todo.value.body,
				};
				if (props.editing) {
					axios
						.put(`http://localhost:3000/todos/${todoId}`, data)
						.then((response) => {
							res = response;
							originalTodo.value = { ...res.data };
							const message = "수정에 성공 하였습니다!";
							triggerToast(message);
						})
						.catch((error) => {
							console.log(error);
							triggerToast("일시적으로 오류가 발생하였습니다 잠시후 다시 이용해주세요", "danger");
						});
				} else {
					axios
						.post(`http://localhost:3000/todos`, data)
						.then((response) => {
							res = response;
							todo.value.subject = "";
							todo.value.body = "";
							const message = "등록에 성공 하였습니다!";
							triggerToast(message);
						})
						.catch((error) => {
							console.log(error);
							triggerToast("일시적으로 오류가 발생하였습니다 잠시후 다시 이용해주세요", "danger");
						});
				}
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
				triggerToast,
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
	.red {
		color: red;
	}
</style>
