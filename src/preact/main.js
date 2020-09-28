import App from "./components/app";
// `h` doesn't seemed to be used, but it is key for the Babel transform.
import { h, render } from "preact";

function createApp(el, data) {
    const app = <App title={data.title} />; // We're using a component with lifecycles for this example.
    render(app, el);
    return app;
}

export default createApp;
