import { LightningElement } from "lwc";
import createPreactApp from "c/preact";

export default class ContainerPreact extends LightningElement {
    // Class property to hold the instance of the framework
    preactApp;

    // Class property to hold the event value sent from the 3rd party framework
    eventValue;

    // Class property to hold the (inital) title value
    titleValue = "Preact App";

    // Private property to determine if the component rendered
    _isRendered;

    renderedCallback() {
        if (this._isRendered) return;

        // Preact all the things, where we call `createApp` from `src/preact/main.js`
        this.preactApp = createPreactApp(
            this.template.querySelector("div.preact"),
            { title: this.titleValue }
        );

        this._isRendered = true;
    }

    // Key up handler for the outer property input field
    handleKeyUp(event) {
        // It looks like we create a new Preact app instance, but we don't.
        // Preacts' diffing algo takes care of only updating what needs to
        // be updated.
        this.preactApp = createPreactApp(
            this.template.querySelector("div.preact"),
            { title: event.target.value }
        );
    }

    // Event handler for receiving the account Id from Preact
    handleSendAccount(event) {
        event.stopPropagation();
        this.eventValue = event.detail.accountId;
    }
}
