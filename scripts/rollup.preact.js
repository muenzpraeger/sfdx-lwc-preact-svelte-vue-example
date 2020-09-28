import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
    input: "src/preact/main.js",
    treeshake: true,
    output: {
        name: "App",
        format: "esm",
        file: "force-app/main/default/lwc/preact/preact.js"
    },
    external: [/@salesforce/, /lightning\//],
    plugins: [babel(), resolve(), commonjs()]
};
