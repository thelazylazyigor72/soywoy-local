import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: `${path.resolve(__dirname, "/src/components/")}`,
			data: `${path.resolve(__dirname, "/src/data/")}`,
			assets: `${path.resolve(__dirname, "/src/assets/")}`,
			pages: `${path.resolve(__dirname, "/src/pages/")}`,
			styles: `${path.resolve(__dirname, "/src/styles/")}`,
			utils: `${path.resolve(__dirname, "/src/utils/")}`,
		},
	},
});
