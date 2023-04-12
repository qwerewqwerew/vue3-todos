<template>
	<div class="modal-wrapper" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Modal title</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onClose"></button>
				</div>
				<div class="modal-body">
					<p>일정을 삭제합니다</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onClose">취소</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="onDelete">확인</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		setup(props, { emit }) {
			const onClose = () => {
				emit("close");
			};
			const onDelete = () => {
				emit("delete");
			};
			return {
				onDelete,
				onClose,
			};
		},
	};
</script>
<style scoped>
	.modal-wrapper {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
