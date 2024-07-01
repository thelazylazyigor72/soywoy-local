/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AUTH_QUESTION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
