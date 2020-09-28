# LWC, Preact, Svelte, and Vue in Salesforce Example

This repository showcases how you can embed 3rd party frameworks within Lightning Web Components in a Salesforce org - without using static resources or `lightning:container`.

## Setup instructions

You will get the best experience by using this repository in [combination with LWC Local Development](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_local_dev_setup).

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground or Developer Edition
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension (this is more or less optional, it gives you a better dev experience in VS Code though)

1. If you haven't already done so, authorize your Dev Hub org and provide it with an alias (**myhuborg** in the command below):

    ```zsh
    sfdx force:auth:web:login -d -a myhuborg
    ```

1. Clone this repository (yup, this one, with the real long name):

    ```zsh
    git clone https://github.com/muenzpraeger/sfdx-lwc-preact-svelte-vue-example
    cd sfdx-lwc-preact-svelte-vue-example
    ```

1. Create a scratch org and provide it with an alias (**frameworks-example** in the command below):

    ```zsh
    sfdx force:org:create -s -f config/project-scratch-def.json -a frameworks-example
    ```

1. Push the Salesforce org metadata to the scratch org. This will also deploy an Apex class that will be used to retrieve org data locally:

    ```zsh
    sfdx force:source:push
    ```

1. Install the LWC Local Development Server plugin:

    ```zsh
    sfdx plugins:install @salesforce/lwc-dev-server
    ```

1. Install the project dependencies:

    ```zsh
    npm install
    ```

1. Start Rollup in `watch` mode:

    ```zsh
    npm run dev
    ```

1. Start the LWC Local Development server (in another terminal):

    ```zsh
    sfdx force:lightning:lwc:start
    ```

Now you can experience the different components in LWC Local Development. For all frameworks Rollup runs in `watch` mode, so any changes to the frameworks also result in instant updates for LWC Local Development.

In case you want to see everything within a Salesforce org, run this command:

```zsh
sfdx force:org:open -p /lightning/n/Examples
```

## Project structure

All examples follow the same pattern. Just replace `<framework>` with the framework name. All code is documented to highlight the different implementation requirements and patterns.

`force-app/main/default/lwc/container<framework>` - LWC that consumes the generated ES6 module

`force-app/main/default/lwc/<framework>` - generated ES6 module

`scripts/rollup.<framework>.js` - Rollup configuration file

`src/<framework>` - source folder for every framework
