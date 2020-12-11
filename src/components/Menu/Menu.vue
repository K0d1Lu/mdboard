<template>
	<ul role="menu">
		<MenuItem v-for="item in this.items" :key="item.id" :item="item" :level="0"></MenuItem>
	</ul>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
	name: "Menu",
	components: {
		MenuItem,
	},
	props: ["items"],
};
</script>

<style scoped></style>
