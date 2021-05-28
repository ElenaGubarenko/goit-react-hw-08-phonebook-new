import { Component } from 'react';
import { connect } from 'react-redux';
import selectors from '../../redux/selectors/selectors';
import operations from '../../redux/operations/operations';
import routes from '../../routes';
import styles from './Login.module.css';
import { Route, NavLink } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  changeState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createUserToLogin = e => {
    e.preventDefault();
    const userToLogin = this.state;
    this.props.loginUser(userToLogin);
  };

  render() {
    return (
      <form className={styles.Form} onSubmit={this.createUserToLogin}>
        <div className={styles.Inputs}>
          <label className={styles.Label}>
            Mail
            <input
              className={styles.Input}
              type="input"
              name="email"
              placeholder="Your mail"
              value={this.state.loginMail}
              onChange={this.changeState}
            ></input>
          </label>
          <label className={styles.Label}>
            Password
            <input
              className={styles.Input}
              type="input"
              name="password"
              placeholder="Your password"
              value={this.state.loginPassword}
              onChange={this.changeState}
            ></input>
          </label>
        </div>
        <button className={`button ${styles.FormButton}`} type="submit">
          Login
        </button>
        <NavLink className="button" to={routes.homepage}>
          Home
        </NavLink>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(operations.loginUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
