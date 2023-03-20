<template>
	<button class="btn btn-primary" v-on:click="consoleLog">Click</button>

	<div class="name">
		{{ name }}
	</div>
	<button class="btn btn-primary" v-on:click="updateName">Click</button>
	<div class="name">
		{{ cats }}
	</div>
	<button class="btn btn-primary" v-on:click="updateCats">Click</button>
</template>

<script>
import { ref,reactive  } from "vue";
export default {
  setup() {
		const consoleLog=()=>{
		console.log("dddd")
		}
    let name = ref('망고');
    let cats = reactive ({
			name:"나초",
			age:8,
			weight:10
		});
    const updateName = () => {
      name.value = '딴딴이';
    };
    const updateCats = () => {
      cats.name = '나기',
      cats.age = 5,
      cats.weight = 5
    };

    return {
      name,
      updateName,
			consoleLog,
			cats,
			updateCats,
    };
  }
}
</script>