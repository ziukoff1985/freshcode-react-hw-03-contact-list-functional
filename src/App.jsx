import { Component } from 'react';
import { nanoid } from 'nanoid';

import styles from './App.module.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';

export class App extends Component {
    state = {
        contacts: [],
        contactForEdit: this.createEmptyContact(),
    };

    createEmptyContact() {
        return {
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
    }

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        if (!contacts) {
            this.setState({ contacts: [] });
        } else {
            this.setState({ contacts: contacts });
        }
    }

    deleteContact = (contactId) => {
        this.setState((prevState) => {
            const contacts = prevState.contacts.filter(
                (contact) => contact.id !== contactId
            );
            const isContactUpdating = prevState.contactForEdit.id === contactId;
            this.saveContactsToLocalStorage(contacts);
            return {
                contacts: contacts,
                contactForEdit: isContactUpdating
                    ? this.createEmptyContact()
                    : prevState.contactForEdit,
            };
        });
    };

    saveContact = (contact) => {
        if (!contact.id) {
            this.createContact(contact);
        } else {
            this.updateContact(contact);
        }
    };

    addNewContact = () => {
        this.setState({
            contactForEdit: this.createEmptyContact(),
        });
    };

    editContact = (contact) => {
        this.setState({
            contactForEdit: { ...contact },
        });
    };

    createContact = (contact) => {
        contact.id = nanoid();
        this.setState((prevState) => {
            const contacts = [...prevState.contacts, contact];
            this.saveContactsToLocalStorage(contacts);
            return {
                contacts: contacts,
                contactForEdit: this.createEmptyContact(),
            };
        });
    };

    updateContact = (contact) => {
        this.setState((prevState) => {
            const contacts = prevState.contacts.map((item) =>
                item.id === contact.id ? contact : item
            );
            this.saveContactsToLocalStorage(contacts);
            return {
                contacts: contacts,
                contactForEdit: contact,
            };
        });
    };

    saveContactsToLocalStorage = (contacts) => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    render() {
        return (
            <>
                <h1>Contact List</h1>
                <div className={styles.container}>
                    <ContactList
                        contacts={this.state.contacts}
                        onDeleteContact={this.deleteContact}
                        onAddNewContact={this.addNewContact}
                        onEditContact={this.editContact}
                        contactForEdit={this.state.contactForEdit}
                    />
                    <ContactForm
                        contactForEdit={this.state.contactForEdit}
                        onSubmit={this.saveContact}
                        onDeleteContact={this.deleteContact}
                    />
                </div>
            </>
        );
    }
}

export default App;
