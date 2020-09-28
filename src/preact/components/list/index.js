// `h` doesn't seemed to be used, but it is key for the Babel transform.
import { h, Component, createRef } from "preact";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";

export default class List extends Component {
    // Using a ref is the important element for event dispatching,
    // as this allows us to send a native CustomEvent from a list
    // entry.
    ref = createRef();

    state = {
        accounts: []
    };

    componentDidMount() {
        getAccounts().then((result) => {
            this.setState({ accounts: result });
        });
    }

    sendAccount(accountId) {
        const evt = new CustomEvent("sendaccount", {
            detail: {
                accountId
            },
            bubbles: true,
            composed: true
        });
        this.ref.current.dispatchEvent(evt);
    }

    render() {
        if (this.state.accounts) {
            const listItems = this.state.accounts.map((account) => (
                <li
                    style={{ cursor: "pointer" }}
                    key={account.Id.toString()}
                    onClick={() => {
                        this.sendAccount(account.Id);
                    }}
                >
                    {account.Id} - {account.Name}
                </li>
            ));
            return (
                <div>
                    {this.props.title}
                    <ul ref={this.ref}>{listItems}</ul>
                </div>
            );
        }
        return <div />;
    }
}
