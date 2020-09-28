import { LightningElement } from "lwc";
import createVueApp from "c/vue";

export default class ContainerVue extends LightningElement {
    // Class property to hold the instance of the framework
    vueApp;

    // Class property to hold the event value sent from the 3rd party framework
    eventValue;

    // Class property to hold the (inital) title value
    titleValue = "Vue App";

    // Private property to determine if the component rendered
    _isRendered;

    renderedCallback() {
        if (this._isRendered) return;

        // Vue all the things - three steps are needed
        // 1. We create a new div.
        const divEl = document.createElement("div");
        // 2. Then we append it to our lwc:dom=manual div.
        this.template.querySelector("div.vue").appendChild(divEl);
        // 3. We call `createApp` from `src/vue/main.js`
        this.vueApp = createVueApp(divEl, { title: this.titleValue });

        this._isRendered = true;
    }

    // Key up handler for the outer property input field
    handleKeyUp(event) {
        // This looks a bit hacky, and it is. We can set the reactive
        // property on the Vue component, but first we have to get the
        // handle on the first (and only) child element.
        this.vueApp.$children[0].title = event.target.value;
    }

    // Event handler for receiving the account Id from Vue
    handleSendAccount(event) {
        event.stopPropagation();
        this.eventValue = event.detail.accountId;
    }
}
