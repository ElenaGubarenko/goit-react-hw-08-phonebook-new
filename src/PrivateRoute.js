import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import selectors from './redux/selectors/selectors';

const PrivateRoute = ({
  component: Component,
  isAuthed,
  redirectTo,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthed ? <Component {...props} /> : <Redirect to={redirectTo} />
    }
  />
);

const mapStateToProps = state => ({
  isAuthed: selectors.isAuthed(state),
});

export default connect(mapStateToProps)(PrivateRoute);
