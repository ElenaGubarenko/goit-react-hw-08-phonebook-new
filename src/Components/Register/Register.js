import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import selectors from '../../redux/selectors/selectors';
import operations from '../../redux/operations/operations';
import routes from '../../routes';
import styles from './Register.module.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  changeState = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createUserToRegistrate = e => {
    e.preventDefault();
    const userToRegistrate = this.state;
    this.props.registerUser(userToRegistrate);
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  };

  render() {
    return (
      <form className={styles.Form} onSubmit={this.createUserToRegistrate}>
        <div className={styles.Inputs}>
          <label className={styles.Label}>
            Name
            <input
              className={styles.Input}
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.registerName}
              onChange={this.changeState}
            ></input>
          </label>
          <label className={styles.Label}>
            Mail
            <input
              className={styles.Input}
              type="mail"
              name="email"
              placeholder="YuorMail@mail.com"
              value={this.state.registerMail}
              onChange={this.changeState}
            ></input>
          </label>
          <label className={styles.Label}>
            Password
            <input
              className={styles.Input}
              type="password"
              name="password"
              placeholder="Password at least 7 characters"
              value={this.state.registerPassword}
              onChange={this.changeState}
            ></input>
          </label>
        </div>
        <button className={`button ${styles.FormButton}`} type="submit">
          Register
        </button>
        <NavLink className="button" to={routes.homepage}>
          Home
        </NavLink>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  registerUser: selectors.getRegisterUser(state),
});

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(operations.registerUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register;
