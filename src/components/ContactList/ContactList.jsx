import { Component } from 'react';
import ContactItem from '../ContactItem/ContactItem';

import styles from './ContactList.module.css';

export class ContactList extends Component {
    render() {
        const { contacts, onAddNewContact } = this.props;

        return (
            <div className={styles.contactListWrapper}>
                <ul className={styles.contactList}>
                    {contacts.length === 0
                        ? 'No contacts yet'
                        : contacts.map((contact) => (
                              <ContactItem
                                  key={contact.id}
                                  contact={contact}
                                  onDeleteContact={this.props.onDeleteContact}
                                  onEditContact={this.props.onEditContact}
                                  contactForEdit={this.props.contactForEdit}
                              />
                          ))}
                </ul>
                <button
                    className={styles.addButton}
                    type='button'
                    onClick={onAddNewContact}
                >
                    New
                </button>
            </div>
        );
    }
}

export default ContactList;
