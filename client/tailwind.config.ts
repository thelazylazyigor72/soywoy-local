import type { Config } from "tailwindcss";
import { PluginCreator } from "tailwindcss/types/config";

const flexPlugin: PluginCreator = ({ matchUtilities, theme }) => {
	matchUtilities(
		{
			fx: (value) => ({
				display: "flex",
				flexDirection: "row",
				justifyContent: value[0],
				alignItems: value[1],
			}),
			fx_col: (value) => ({
				display: "flex",
				flexDirection: "column",
				justifyContent: value[0],
				alignItems: value[1],
			}),
			fx_re: (value) => ({
				display: `flex`,
				flexDirection: "row-reverse",
				justifyContent: value[0],
				alignItems: value[1],
			}),
			fx_re_col: (value) => ({
				display: "flex",
				flexDirection: "column-reverse",
				justifyContent: value[0],
				alignItems: value[1],
			}),
		},
		{ values: theme("flexScheme") },
	);
};

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {},
		flexScheme: {
			between_center: ["space-between", "center"],
			between_start: ["space-between", "flex-start"],
			between_end: ["space-between", "flex-end"],
			between_baseline: ["space-between", "baseline"],
			between_stretch: ["space-between", "stretch"],

			evenly_center: ["space-evenly", "center"],
			evenly_start: ["space-evenly", "flex-start"],
			evenly_end: ["space-evenly", "flex-end"],
			evenly_baseline: ["space-evenly", "baseline"],
			evenly_stretch: ["space-evenly", "stretch"],

			center_center: ["center", "center"],
			center_start: ["center", "flex-start"],
			center_end: ["center", "flex-end"],
			center_baseline: ["center", "baseline"],
			center_stretch: ["center", "stretch"],

			start_center: ["flex-start", "center"],
			start_start: ["flex-start", "flex-start"],
			start_end: ["flex-start", "flex-end"],
			start_baseline: ["flex-start", "baseline"],
			start_stretch: ["flex-start", "stretch"],

			end_center: ["flex-end", "center"],
			end_start: ["flex-end", "flex-start"],
			end_end: ["flex-end", "flex-end"],
			end_baseline: ["flex-end", "baseline"],
			end_stretch: ["flex-end", "stretch"],
		},
	},
	plugins: [flexPlugin],
} satisfies Config;
