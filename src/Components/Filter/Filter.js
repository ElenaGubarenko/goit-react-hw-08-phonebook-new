import { Component } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import selectors from '../../redux/selectors/selectors';

class Filter extends Component {
  filterContactsByName = e => {
    this.props.handleFilter(e.target.value);

    if (this.props.filter !== '') {
      this.props.filterContacts(this.props.filterStateContacts);
      return;
    }
    // this.props.setFilteredContactsEmpty();
  };

  render() {
    return (
      <div className={styles.FilterDiv}>
        <h1 className={styles.FindTitle}>Find contact by name</h1>
        <input
          className={styles.Input}
          onChange={this.filterContactsByName}
          value={this.props.filter}
          name="filter"
          required
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filterContactsByName: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
};

const mapStateToProps = state => ({
  filterStateContacts: selectors.filterStateContacts(state),
  contacts: selectors.getContacts(state),
  filter: selectors.getFilter(state),
  filteredContacts: selectors.getFilteredContacts(state),
});

const mapDispatchToProps = dispatch => ({
  filterContacts: value => dispatch(actions.filterContacts(value)),
  setFilteredContactsEmpty: () => dispatch(actions.setFilteredContactsEmpty()),
  handleFilter: value => dispatch(actions.handleFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
