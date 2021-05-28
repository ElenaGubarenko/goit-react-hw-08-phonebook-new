import { createAction } from '@reduxjs/toolkit';

const getAllContactsRequest = createAction('getAllContactsRequest');
const getAllContactsSuccess = createAction('getAllContactsSuccess');
const getAllContactsError = createAction('getAllContactsError');

const addContactRequest = createAction('addContactRequest');
const addContactSuccess = createAction('addContactSuccess');
const addContactError = createAction('addContactError');

const deleteContactRequest = createAction('deleteContactRequest');
const deleteContactSuccess = createAction('deleteContactSuccess');
const deleteContactError = createAction('deleteContactError');

const registerRequest = createAction('registerRequest');
const registerSuccess = createAction('registerSuccess');
const registerError = createAction('registerError');

const loginRequest = createAction('loginRequest');
const loginSuccess = createAction('loginSuccess');
const loginError = createAction('loginError');

const logoutRequest = createAction('logoutRequest');
const logoutSuccess = createAction('logoutSuccess');
const logoutError = createAction('logoutError');

const getCurrentUserRequest = createAction('getCurrentUserRequest');
const getCurrentUserSuccess = createAction('getCurrentUserSuccess');
const getCurrentUserError = createAction('getCurrentUserError');

const filterContacts = createAction('filterContacts');
const setFilteredContactsEmpty = createAction(
  'setFilteredContactsEmpty',
  () => ({
    payload: [],
  }),
);
const updateState = createAction('updateState');
const handleFilter = createAction('handleFilter');

export default {
  getAllContactsRequest,
  getAllContactsSuccess,
  getAllContactsError,

  addContactRequest,
  addContactSuccess,
  addContactError,

  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,

  filterContacts,
  setFilteredContactsEmpty,
  updateState,
  handleFilter,

  registerRequest,
  registerSuccess,
  registerError,

  loginRequest,
  loginSuccess,
  loginError,

  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,

  logoutRequest,
  logoutSuccess,
  logoutError,
};
