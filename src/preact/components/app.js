// `h` doesn't seemed to be used, but it is key for the Babel transform.
import { h, Component } from "preact";

import List from "./list";

export default class App extends Component {
    render(props) {
        return (
            <div id="app">
                Data from outer property: {props.title}
                <br />
                <br />
                <List />
            </div>
        );
    }
}
