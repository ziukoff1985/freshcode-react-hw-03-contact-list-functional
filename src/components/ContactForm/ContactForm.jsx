import { Component } from 'react';
import styles from './ContactForm.module.css';

export class ContactForm extends Component {
    state = {
        ...this.props.contactForEdit,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.contactForEdit.id !== state.id) {
            return {
                ...props.contactForEdit,
            };
        }
        return null;
    }

    createEmptyContact = () => {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
    };

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onSubmit({ ...this.state });
        if (!this.state.id) {
            this.setState({ ...this.createEmptyContact() });
        }
    };

    onContactDelete = () => {
        this.props.onDeleteContact(this.props.contactForEdit.id);
        this.setState({ ...this.createEmptyContact() });
    };

    onClearField = (event) => {
        const input = event.target.parentNode.firstChild;
        this.setState({ [input.name]: '' });
    };

    render() {
        return (
            <form onSubmit={this.onSubmitForm} className={styles.contactForm}>
                <div className={styles.inputWrapper}>
                    <input
                        value={this.state.firstName}
                        className={styles.input}
                        name='firstName'
                        type='text'
                        placeholder='First name'
                        onChange={this.onInputChange}
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={this.onClearField}
                    >
                        ❌
                    </button>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        value={this.state.lastName}
                        className={styles.input}
                        name='lastName'
                        type='text'
                        placeholder='Last name'
                        onChange={this.onInputChange}
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={this.onClearField}
                    >
                        ❌
                    </button>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        value={this.state.email}
                        className={styles.input}
                        name='email'
                        type='email'
                        placeholder='Email'
                        autoComplete='on'
                        onChange={this.onInputChange}
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={this.onClearField}
                    >
                        ❌
                    </button>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        value={this.state.phone}
                        className={styles.input}
                        name='phone'
                        type='tel'
                        placeholder='Phone'
                        autoComplete='on'
                        onChange={this.onInputChange}
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={this.onClearField}
                    >
                        ❌
                    </button>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.formButton} type='submit'>
                        Save
                    </button>
                    {this.state.id && (
                        <button
                            className={styles.formButton}
                            type='button'
                            onClick={this.onContactDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        );
    }
}

export default ContactForm;
