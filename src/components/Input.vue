<template>
	<div class="form-group">
		<label>{{ label }}</label>
		<input type="text" class="form-control" :value="subject" @input="onInput" />
	</div>
	<div v-if="subjectError" style="color: red">{{ error }}</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				required: true,
			},
			error: {
				type: String,
				required: true,
			},
			subject: {
				type: String,
				required: true,
			},
		},
		setup(props, { emit }) {
			const onInput = (e) => {
				console.log(e.target.value);
				emit("update:subject", e.target.value);
			};
			return {
				onInput,
			};
		},
	};
</script>

<style>
	.red {
		color: red;
	}
</style>
