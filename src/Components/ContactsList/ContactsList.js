import { v4 as uuidv4 } from 'uuid';
import { Component } from 'react';
import Filter from '../Filter';
import Header from '../Header';
import PropTypes from 'prop-types';
import styles from './ContactsList.module.css';
import { connect } from 'react-redux';
import operations from '../../redux/operations/operations';
import selectors from '../../redux/selectors/selectors';
import ContactForm from '../ContactForm';

class ContactsList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div>
        {/* <div className={styles.Logo}></div> */}
        <Header />
        <ContactForm />
        <h1 className={styles.Title}>All contacts</h1>
        <Filter />
        <ul className={styles.ContactsList}>
          <div className={styles.Logo}></div>
          {(this.props.filter !== ''
            ? this.props.filteredContacts
            : this.props.contacts
          ).map(contact => {
            return (
              <li className={styles.ContactListItem} key={uuidv4()}>
                <div className={styles.NameNumber}>
                  <div>{contact.name}:</div>
                  <div>{contact.number}</div>
                </div>
                <button
                  className="button"
                  onClick={() => this.props.deleteContact(contact.id)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        {/* <div className={styles.Logo}></div> */}
      </div>
    );
  }
}

// ContactsList.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   deleteContact: PropTypes.func,
// };

const mapStateToProps = state => ({
  contacts: selectors.getContacts(state),
  filter: selectors.getFilter(state),
  filteredContacts: selectors.getFilteredContacts(state),
  isAuthed: selectors.isAuthed(state),
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(operations.deleteContact(id)),
  fetchContacts: () => dispatch(operations.getAllContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
