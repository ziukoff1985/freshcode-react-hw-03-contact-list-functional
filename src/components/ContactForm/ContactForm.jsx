import { useState } from 'react';

import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

function ContactForm(props) {
    const [contactData, setContactData] = useState({
        ...props.contactForEdit,
    });

    const { onDeleteContact, onSubmit } = props;

    function createEmptyContact() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
    }

    function onInputChange(event) {
        const { name, value } = event.target;
        setContactData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function onSubmitForm(event) {
        event.preventDefault();
        onSubmit({ ...contactData });
        if (!contactData.id) {
            setContactData({ ...createEmptyContact() });
        }
    }

    function onContactDelete() {
        onDeleteContact(props.contactForEdit.id);
        setContactData({ ...createEmptyContact() });
    }

    function onClearField(event) {
        const input = event.target.parentNode.firstChild;
        setContactData((prevState) => ({
            ...prevState,
            [input.name]: '',
        }));
    }

    return (
        <form onSubmit={onSubmitForm} className={styles.contactForm}>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.firstName}
                    className={styles.input}
                    name='firstName'
                    type='text'
                    placeholder='First name'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.lastName}
                    className={styles.input}
                    name='lastName'
                    type='text'
                    placeholder='Last name'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.email}
                    className={styles.input}
                    name='email'
                    type='email'
                    placeholder='Email'
                    autoComplete='on'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.inputWrapper}>
                <input
                    value={contactData.phone}
                    className={styles.input}
                    name='phone'
                    type='tel'
                    placeholder='Phone'
                    autoComplete='on'
                    onChange={onInputChange}
                />
                <button
                    className={styles.deleteButton}
                    type='button'
                    onClick={onClearField}
                >
                    ❌
                </button>
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.formButton} type='submit'>
                    Save
                </button>
                {contactData.id && (
                    <button
                        className={styles.formButton}
                        type='button'
                        onClick={onContactDelete}
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
}

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
