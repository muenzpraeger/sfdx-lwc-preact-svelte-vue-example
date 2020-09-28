import { LightningElement } from "lwc";
import createSvelteApp from "c/svelte";

export default class ContainerSvelte extends LightningElement {
    // Class property to hold the instance of the framework
    svelteApp;

    // Class property to hold the event value sent from the 3rd party framework
    eventValue;

    // Class property to hold the (inital) title value
    titleValue = "Svelte App";

    // Private property to determine if the component rendered
    _isRendered;

    renderedCallback() {
        if (this._isRendered) return;

        // Svelte all the things, where we call `createApp` from `src/svelte/main.js`
        this.svelteApp = createSvelteApp(
            this.template.querySelector("div.svelte"),
            { title: this.titleValue }
        );

        this._isRendered = true;
    }

    // Key up handler for the outer property input field
    handleKeyUp(event) {
        // As we have a handle to the Svelte instance we can use the standard
        // $set method to set the prop value.
        // https://svelte.dev/docs#$set
        this.svelteApp.$set({
            title: event.target.value
        });
    }

    // Event handler for receiving the account Id from Svelte
    handleSendAccount(event) {
        event.stopPropagation();
        this.eventValue = event.detail.accountId;
    }
}
