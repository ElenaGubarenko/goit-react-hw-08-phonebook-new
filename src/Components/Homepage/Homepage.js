import { Component } from 'react';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import operations from '../../redux/operations/operations';
import selectors from '../../redux/selectors/selectors';
import styles from './Homepage.module.css';

class Homepage extends Component {
  render() {
    return (
      <div>
        <div className={styles.HomeContainer}></div>
        {this.props.isAuthed ? (
          <div className={styles.HomeNav}>
            <div>
              <NavLink className={styles.Home} to={routes.homepage}>
                Home
              </NavLink>
              <NavLink className={styles.Home} to={routes.contacts}>
                My contacts
              </NavLink>
            </div>
            <div>
              <NavLink
                className={styles.Exit}
                onClick={this.props.logoutUser}
                to={routes.homepage}
              >
                Exit
              </NavLink>
            </div>
          </div>
        ) : (
          <div className={styles.Auth}>
            <NavLink className={styles.AuthLink} to={routes.login}>
              Enter
            </NavLink>
            <NavLink className={styles.AuthLink} to={routes.register}>
              Register
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: selectors.isAuthed(state),
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(operations.logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
