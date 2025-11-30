import { Component } from 'react';
import styles from './ContactItem.module.css';

export class ContactItem extends Component {
    onContactDelete = () => {
        this.props.onDeleteContact(this.props.contact.id);
    };

    onContactEdit = () => {
        this.props.onEditContact(this.props.contact);
    };

    render() {
        const { contact, contactForEdit } = this.props;
        return (
            <li
                className={`${styles.contactItem} ${
                    contactForEdit?.id === contact.id && styles.updating
                }`}
                onDoubleClick={this.onContactEdit}
            >
                <div className={styles.contactName}>
                    {contact.firstName} {contact.lastName}
                </div>
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={this.onContactDelete}
                >
                    ❌
                </button>
            </li>
        );
    }
}

export default ContactItem;
