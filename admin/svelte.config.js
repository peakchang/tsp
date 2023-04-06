// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({}),
		alias: {
			// this will match a file
			$lib: path.resolve("./src/lib"),
			$src: path.resolve("./src"),
			$components: path.resolve("./src/components"),
			$node_modules: path.resolve("./node_modules"),
			$front_lib: path.resolve("../lib/front_lib"),
		},
	},

	preprocess: vitePreprocess()
};

export default config;
