import Vue from "vue";
import App from "./App.vue";

// Just setting this b/c I don't want the production tip at startup.
Vue.config.productionTip = false;

function createApp(el, data) {
    // This is using Vue 2.x.
    const app = new Vue({
        render: (h) =>
            h(App, {
                props: {
                    ...data // It is key to pass the data as props at component init.
                }
            }),
        el
    });
    return app;
}

export default createApp;
