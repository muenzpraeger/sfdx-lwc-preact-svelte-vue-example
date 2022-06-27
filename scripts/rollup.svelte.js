import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";

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
            emitCss: false
        }),
        HACK_THE_OUTPUT(),
        resolve({
            browser: true,
            dedupe: ["svelte"]
        })
    ],
    watch: {
        clearScreen: false
    }
};

function HACK_THE_OUTPUT() {
    return {
        renderChunk: (code, chunk, options) => {
            return {
                code: code.replace(
                    "!append_styles_to.getElementById(style_sheet_id)",
                    "!append_styles_to.querySelector(`#${style_sheet_id}`)"
                ),
                map: null
            };
        }
    };
}
