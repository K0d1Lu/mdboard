<template>
	<ul v-if="this.item.children.length" class="flex-col"  v-bind:class="lvl">
		{{
			item.title
		}}
		<MenuItem
			v-for="(item, index) in this.item.children"
			:key="item.id"
			:item="this.item.children[index]"
			:level="this.level + 1"
		></MenuItem>
	</ul>
	<li v-else v-on:click="propagate" class='mr-6 hover:text-blue-800' v-bind:class="lvl">
		<p class="text-blue-500 ">{{ item.title }}</p>
	</li>
</template>

<script>
export default {
	name: "MenuItem",
	props: ["item", "level"],
	data() {
		return {
			lvl: `level-${this.level}`
		};
	},
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

.level-1 {
	margin-left: 5px;
}

.level-2 {
	margin-left: 10px;
}

.level-3 {
	margin-left: 15px;
}

.level-4 {
	margin-left: 20px;
}

.level-5 {
	margin-left: 25px;
}
</style>
