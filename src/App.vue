<template>
	<div class="hi">안녕하세요{{ name }}</div>
</template>

<script>
	export default {
		setup() {
			const name = "Manao";
			return {
				name,
			};
		},
	};
</script>

<style>
	body {
		background: yellow;
	}
	.hi {
		color: green;
	}
</style>
