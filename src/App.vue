<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<router-link
				class="navbar-brand"
				:to="{ name: 'Home' }"
				>망고노트</router-link
			>
			<div
				class="navbar-collapse"
				id="navbarNavAltMarkup">
				<div class="navbar-nav">
					<router-link
						class="nav-link active"
						:to="{ name: 'Todos' }"
						>일정보기</router-link
					>
				</div>
			</div>
		</div>
	</nav>
	<div class="container">
		<router-view />
	</div>
	<Toast
		v-if="showToast"
		:message="toastMessage"
		:type="toastAlertType" />
</template>

<script>
	import Toast from "@/components/Toast.vue";
	import { useToast } from "@/composables/toast";

	export default {
		components: {
			Toast,
		},
		setup() {
			const { toastMessage, toastAlertType, showToast, triggerToast } = useToast();

			return {
				toastMessage,
				toastAlertType,
				showToast,
				triggerToast,
			};
		},
	};
</script>

<style>

</style>
