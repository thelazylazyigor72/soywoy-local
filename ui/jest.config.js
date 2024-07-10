export default {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
	},
	moduleNameMapper: {
		"\\.(css|less)$": "<rootDir>/test/__mocks__/styleMock.js",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
