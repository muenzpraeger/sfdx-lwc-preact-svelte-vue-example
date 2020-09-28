import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";

const production = !process.env.ROLLUP_WATCH;

export default {
    input: "src/svelte/main.js",
    output: {
        name: "App",
        format: "esm",
        file: "force-app/main/default/lwc/svelte/svelte.js"
    },
    external: [/@salesforce/, /lightning\//],
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production
        }),
        resolve({
            browser: true,
            dedupe: ["svelte"]
        })
    ],
    watch: {
        clearScreen: false
    }
};
