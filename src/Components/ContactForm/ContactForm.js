import { v4 as uuidv4 } from 'uuid';
import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { connect } from 'react-redux';
// import actions from '../redux/actions/actions';
import operations from '../../redux/operations/operations';
import selectors from '../../redux/selectors/selectors';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  resetInput = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleChangeInState = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  addContact = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      number: this.state.number,
      // id: uuidv4(),
    };

    const ifThereIsSuchContact = this.props.contacts.filter(contact => {
      return contact.name.toLowerCase() === this.state.name.toLowerCase();
    });

    if (ifThereIsSuchContact.length !== 0) {
      return alert(`${this.state.name} already exists`);
    }

    this.props.addContact(user);
    this.resetInput();
  };

  render() {
    return (
      <form onSubmit={this.addContact} className={styles.ContactForm}>
        <h1 className={styles.Title}>Add new contact</h1>
        <div className={styles.InputsDiv}>
          <label className={styles.LabelContactForm}>
            Name
            <input
              className={styles.Input}
              onChange={this.handleChangeInState}
              value={this.state.name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              placeholder="Name Surname"
            />
          </label>
          <label className={styles.LabelContactForm}>
            Number
            <input
              className={styles.Input}
              onChange={this.handleChangeInState}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              placeholder="+111-11-111-111"
            />
          </label>
        </div>
        <button className="button" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const mapStateToProps = state => ({
  contacts: selectors.getContacts(state),
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => dispatch(operations.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
