<template>
	<div class="hi">안녕하세요{{ name }}</div>
	<div class="hi">안녕하세요{{ name }}</div>
	<div class="hi">안녕하세요{{ name }}</div>
	<div class="hi">안녕하세요{{ name }}</div>
	<h1>{{ greeting("Vue") }}</h1>
</template>

<script>
	export default {
		setup() {
			const name = "Manao";
			const greeting = (name) => {
				return "정말쉽다" + name;
			};
			return {
				name,
				greeting,
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
