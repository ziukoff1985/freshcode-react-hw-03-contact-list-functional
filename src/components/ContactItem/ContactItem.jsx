import { Component } from 'react';
import styles from './ContactItem.module.css';

function ContactItem(props) {
    const { contact, contactForEdit, onDeleteContact, onEditContact } = props;
    const onContactDelete = () => {
        onDeleteContact(contact.id);
    };

    const onContactEdit = () => {
        onEditContact(contact);
    };

    return (
        <li
            className={`${styles.contactItem} ${
                contactForEdit?.id === contact.id && styles.updating
            }`}
            onDoubleClick={onContactEdit}
        >
            <div className={styles.contactName}>
                {contact.firstName} {contact.lastName}
            </div>
            <button
                className={styles.deleteButton}
                type='button'
                onClick={onContactDelete}
            >
                ❌
            </button>
        </li>
    );
}

export default ContactItem;
