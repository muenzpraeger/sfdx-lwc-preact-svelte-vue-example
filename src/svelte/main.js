import App from "./App.svelte";

function createApp(target, props) {
    return new App({
        target,
        props
    });
}

export default createApp;
