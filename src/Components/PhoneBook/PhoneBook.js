// import { v4 as uuidv4 } from 'uuid';
import React, { lazy, Suspense, Component } from 'react';
// import ContactsList from '../ContactsList';
// import ContactForm from '../ContactForm';
import Container from '../Container';
// import Homepage from '../Homepage';
// import Header from '../Header';
import routes from '../../routes';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import operations from '../../redux/operations/operations';
import selectors from '../../redux/selectors/selectors';
// import { Route } from 'react-router-dom';
import PrivateRoute from '../../PrivateRoute';
import PublicRoute from '../../PublicRoute';
// import Register from '../Register';
// import Login from '../Login';

const AsyncContactsList = lazy(() =>
  import('../ContactsList' /* webpackChunkName: "ContactsList" */),
);
const AsyncRegister = lazy(() =>
  import('../Register' /* webpackChunkName: "Register" */),
);
const AsyncLogin = lazy(() =>
  import('../Login' /* webpackChunkName: "Login" */),
);
const AsyncHomepage = lazy(() =>
  import('../Homepage' /* webpackChunkName: "Homepage" */),
);

class PhoneBook extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Container>
        <Suspense fallback={<h1 className="loading">Loading...</h1>}>
          <PublicRoute exact path={routes.homepage} component={AsyncHomepage} />
          <PrivateRoute
            path={routes.contacts}
            redirectTo={routes.login}
            component={AsyncContactsList}
          />
          <PublicRoute
            exact
            restricted
            path={routes.register}
            redirectTo={routes.login}
            component={AsyncRegister}
          />
          <PublicRoute
            exact
            restricted
            path={routes.login}
            redirectTo={routes.contacts}
            component={AsyncLogin}
          />
        </Suspense>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  contacts: selectors.getContacts(state),
  filter: selectors.getFilter(state),
  filteredContacts: selectors.getFilteredContacts(state),
  loader: selectors.getLoader(state),
  isRegistrated: selectors.getRegisterUser(state),
  isAuthed: selectors.isAuthed(state),
});

const mapDispatchToProps = dispatch => ({
  // fetchContacts: () => dispatch(operations.getAllContacts()),
  filterContacts: value => dispatch(actions.filterContacts(value)),
  setFilteredContactsEmpty: () => dispatch(actions.setFilteredContactsEmpty()),
  handleFilter: value => dispatch(actions.handleFilter(value)),
  getCurrentUser: () => dispatch(operations.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);

// render() {
//   return (
//     <Container>
//       <PublicRoute exact path={routes.homepage} component={Homepage} />
//       <PrivateRoute
//         path={routes.contacts}
//         redirectTo={routes.login}
//         component={ContactsList}
//       />

//       <PublicRoute
//         exact
//         restricted
//         path={routes.register}
//         redirectTo={routes.login}
//         component={Register}
//       />
//       <PublicRoute
//         exact
//         restricted
//         path={routes.login}
//         redirectTo={routes.contacts}
//         component={Login}
//       />
//     </Container>
//   );
// }
