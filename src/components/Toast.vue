<template>
	<transition name="fade">
		<div class="alert toast-box" :class="`alert-${type}`">
			{{ message }}
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				required: true,
			},
			type: {
				type: String,
				default: "info",
			},
		},
	};
</script>

<style>
	.toast-box {
		position: fixed;
		top: 10px;
		right: 10px;
		z-index: 999;
	}
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
