<script>
    import { onMount, createEventDispatcher } from "svelte";
    import getAccounts from "@salesforce/apex/AccountController.getAccounts";

    export let title;
    const dispatch = createEventDispatcher();

    let el; // We need this el variable to store later the ul ref for event dispatching.

    let accounts = [];

    onMount(() => {
        getAccounts()
            .then(result => (accounts = result))
            .catch(error => console.log(error));
    });

    // Events
    function sendAccount(accountId) {
        const evt = new CustomEvent("sendaccount", {
            detail: { accountId },
            bubbles: true,
            composed: true
        });
        el.dispatchEvent(evt);
    }
</script>

<style>
    main {
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    li {
        cursor: pointer;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <!-- Binding the el is the key part to leverage native event dispatching. -->
    <div class="slds-p-around_medium" bind:this={el}>
        Data from outer property: {title}
        <br />
        <br />
        <ul>
            {#each accounts as account}
                <li on:click={sendAccount(account.Id)}>
                    {account.Id} - {account.Name}
                </li>
            {/each}
        </ul>
    </div>

</main>
