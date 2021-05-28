import actions from '../actions/actions';
import axios from 'axios';

let storageToken = '';

const getAllContacts = () => dispatch => {
  dispatch(actions.getAllContactsRequest());
  axios
    .get('https://connections-api.herokuapp.com/contacts', {
      headers: {
        Authorization: storageToken,
      },
    })
    .then(answer => dispatch(actions.getAllContactsSuccess(answer.data)))
    .catch(error => dispatch(actions.getAllContactsError(error)));
};

const addContact = contact => dispatch => {
  dispatch(actions.addContactRequest());
  axios
    .post('https://connections-api.herokuapp.com/contacts', contact, {
      headers: {
        Authorization: storageToken,
      },
    })
    .then(answer => dispatch(actions.addContactSuccess(answer.data)))
    .catch(error => dispatch(actions.addContactError(error)));
};

const deleteContact = id => dispatch => {
  dispatch(actions.deleteContactRequest());
  axios
    .delete(`https://connections-api.herokuapp.com/contacts/${id}`, {
      headers: {
        Authorization: storageToken,
      },
    })
    .then(() => dispatch(actions.deleteContactSuccess(id)))
    .catch(error => dispatch(actions.deleteContactError(error)));
};

const registerUser = user => dispatch => {
  axios
    .post('https://connections-api.herokuapp.com/users/signup', user)
    .then(answer =>
      dispatch(
        actions.registerSuccess(answer.data),
        (storageToken = answer.data.token),
        localStorage.setItem('token', storageToken),
      ),
    )
    .catch(error => dispatch(actions.registerError(error)));
};

const getCurrentUser = () => dispatch => {
  storageToken = localStorage.getItem('token');
  if (!storageToken) {
    return;
  }
  dispatch(actions.getCurrentUserRequest(storageToken));
  axios
    .get('https://connections-api.herokuapp.com/users/current', {
      headers: {
        Authorization: storageToken,
      },
    })
    .then(answer => dispatch(actions.getCurrentUserSuccess(answer.data)))
    .catch(error => dispatch(actions.getCurrentUserError(error)));
};

const loginUser = user => dispatch => {
  axios
    .post('https://connections-api.herokuapp.com/users/login', user)
    .then(answer =>
      dispatch(
        actions.loginSuccess(answer.data),
        (storageToken = answer.data.token),
        localStorage.setItem('token', storageToken),
      ),
    )
    .catch(error => dispatch(actions.loginError(error)));
};

const logoutUser = () => dispatch => {
  if (!storageToken) {
    return;
  }
  dispatch(actions.logoutRequest());
  axios({
    method: 'post',
    url: 'https://connections-api.herokuapp.com/users/logout',
    headers: {
      Authorization: storageToken,
    },
  })
    .then(
      () => dispatch(actions.logoutSuccess()),
      localStorage.removeItem('token'),
      (storageToken = ''),
    )
    .catch(error => dispatch(actions.logoutError(error)));
};

export default {
  getAllContacts,
  addContact,
  deleteContact,
  registerUser,
  getCurrentUser,
  loginUser,
  logoutUser,
};
