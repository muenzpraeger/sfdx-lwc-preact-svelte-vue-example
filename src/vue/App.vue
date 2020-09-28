<template>
    <div id="app">
        Data from outer property: {{ title }}
        <br />
        <br />
        <!-- Setting the ref on the account list is the key part for using native event dispatching. -->
        <ul ref="accountList">
            <li
                v-for="account in accounts"
                :key="account.Id"
                v-on:click="handleClick(account.Id)"
            >
                {{ account.Id }} - {{ account.Name }}
            </li>
        </ul>
    </div>
</template>

<script>
import getAccounts from "@salesforce/apex/AccountController.getAccounts";

export default {
    name: "App",
    props: {
        accounts: Array,
        title: String
    },
    methods: {
        handleClick: function (accountId) {
            const evt = new CustomEvent("sendaccount", {
                detail: { accountId },
                bubbles: true,
                composed: true
            });
            // Here we reference the `accountList` ref to dispatch the native event.
            this.$refs.accountList.dispatchEvent(evt);
        }
    },
    mounted: function () {
        getAccounts()
            .then((result) => (this.accounts = result))
            .catch((error) => console.log(error));
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 6px;
}

li {
    cursor: pointer;
}
</style>
