<template>
	<ul v-if="this.item.children.length">
		{{
			item.title
		}}
		<MenuItem
			v-for="(item, index) in this.item.children"
			:key="item.id"
			:item="this.item.children[index]"
		></MenuItem>
	</ul>
	<li v-else v-on:click="propagate">
		{{ item.title }}
	</li>
</template>

<script>
export default {
	name: "MenuItem",
	props: ["item"],
	methods: {
		propagate: function(e) {
			const evt = document.createEvent("CustomEvent");
			// evt.initCustomEvent(type, canBubble, cancelable, detail)
			evt.initCustomEvent("mdclick", true, true, { path: this.item.path });
			e.target.dispatchEvent(evt);
		},
	},
};
</script>

<style scoped>
li:hover {
	cursor: pointer;
}

li {
	color: blue;
	text-decoration: underline;
}
</style>
