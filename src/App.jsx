import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import styles from './App.module.css';

function App() {
    const [contacts, setContacts] = useState(() => getDataFromLocalStorage());
    const [contactForEdit, setContactForEdit] = useState(() =>
        createEmptyContact()
    );

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    function getDataFromLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem('contacts'));
        return savedData ?? [];
    }

    function createEmptyContact() {
        return {
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
    }

    function deleteContact(contactId) {
        setContacts((prevState) =>
            prevState.filter((contact) => contact.id !== contactId)
        );
        const isContactNowUpdating = contactForEdit.id === contactId;
        setContactForEdit(
            isContactNowUpdating ? createEmptyContact() : contactForEdit
        );
    }

    function saveContact(contact) {
        if (!contact.id) {
            createContact(contact);
        } else {
            updateContact(contact);
        }
    }

    function addNewContact() {
        setContactForEdit(createEmptyContact);
    }

    function editContact(contact) {
        setContactForEdit({ ...contact });
    }

    function createContact(contact) {
        const newContact = { ...contact, id: nanoid() };
        setContacts((prevState) => [...prevState, newContact]);
        setContactForEdit(createEmptyContact);
    }

    function updateContact(contact) {
        setContacts((prevState) =>
            prevState.map((item) => (item.id === contact.id ? contact : item))
        );
        setContactForEdit({ ...contact });
    }

    return (
        <>
            <h1>Contact List</h1>
            <div className={styles.container}>
                <ContactList
                    contacts={contacts}
                    onDeleteContact={deleteContact}
                    onAddNewContact={addNewContact}
                    onEditContact={editContact}
                    contactForEdit={contactForEdit}
                />
                <ContactForm
                    key={contactForEdit.id}
                    contactForEdit={contactForEdit}
                    onSubmit={saveContact}
                    onDeleteContact={deleteContact}
                />
            </div>
        </>
    );
}

export default App;
