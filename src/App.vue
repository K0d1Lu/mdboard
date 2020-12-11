<template>
	<div class="main">
		<Navbar />
		<section>
			<div class="menu" v-on:mdclick="showContent">
				<Menu :items="getMenuItems"></Menu>
			</div>
			<div class="content" v-html="html"></div>
		</section>
	</div>
</template>

<script>
import Navbar from './components/Navbar'
import Menu from "./components/Menu/Menu.vue";

import fs from "fs";
import marked from "marked";

export default {
	name: "App",
	components: {
		Navbar,
		Menu,
	},
	data() {
		return {
			html: "",
		};
	},
	computed: {
		getMenuItems() {
			/**
			 * On load we look for markdown folders :
			 * - in this repo
			 * - in node_modules/pbete-* /markdowns
			 * - in a folder given in an input inside the ui
			 *
			 * This allow users to create npm package or local
			 * folder with their own cheatsheets
			 */
			let menu = {
				files: [],
			};

			const getAllFiles = function(dirPath, fpath = "") {
				const files = fs.readdirSync(dirPath);

				files.forEach(function(file) {
					const properties = fpath ? `${fpath}`.split(".") : [file];
					let obj = menu;
					if (fs.statSync(dirPath + "/" + file).isDirectory()) {
						properties.push(file);
						properties.forEach((property) => {
							if (obj[property]) {
								obj = obj[property];
							} else {
								obj[property] = {
									files: [],
									title: file,
								};
							}
						});

						getAllFiles(
							dirPath + "/" + file,
							fpath ? `${fpath}.${file}` : file
						);
					} else {
						properties.forEach((property, i) => {
							if (!properties[i + 1]) {
								obj[property].files.push({
									name: `${file.split(".")[0].replace("_", " ")}`,
									path: `${properties.join("/")}/${file}`,
								});
							} else {
								obj = obj[property];
							}
						});
					}
				});
			};
			getAllFiles("./src/markdowns");

			let computedMenu = [];

			const constructMenu = function(entr, obj = computedMenu) {
				const files = entr.files;
				files.forEach((file, i) => {
					obj.push({
						id: Date.now() + i,
						title: file.name,
						path: file.path,
						children: [],
					});
				});

				const children = Object.keys(entr).filter(
					(e) => e !== "files" && e !== "title"
				);
				children.forEach((child, i) => {
					const item = {
						id: Date.now() + i,
						title: child.replace("_", " "),
						path: "",
						children: [],
					};
					obj.push(item);

					constructMenu(entr[child], item.children);
				});
			};
			constructMenu(menu);

			return computedMenu;
		},
	},
	methods: {
		compiledMarkdown: function(input) {
			this.html = marked(input);
		},
		showContent: function(e) {
			const data = fs.readFileSync("./src/markdowns/" + e.detail.path, {
				encoding: "utf8",
				flag: "r",
			});

			this.compiledMarkdown(data);
		},
	},
};
</script>

<style>
section {
	padding: 15px;
	display: flex;
}

.menu {
	width: 20%;
}

.content {
	width: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
