import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import selectors from './redux/selectors/selectors';

const PublicRoute = ({
  component: Component,
  isAuthed,
  redirectTo,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthed && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthed: selectors.isAuthed(state),
});

export default connect(mapStateToProps)(PublicRoute);
