import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from '../actions/actions';

const contacts = [];
const filteredContacts = [];
const filter = '';
const user = '';

const contactsReducer = createReducer(contacts, {
  [actions.getAllContactsSuccess]: (state, action) => action.payload,
  [actions.addContactSuccess]: (state, action) => [action.payload, ...state],
  [actions.deleteContactSuccess]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
});

const filterReducer = createReducer(filter, {
  [actions.handleFilter]: (state, action) => action.payload,
});

const filteredContactsReducer = createReducer(filteredContacts, {
  [actions.filterContacts]: (state, action) => action.payload,
  [actions.setFilteredContactsEmpty]: (state, action) => action.payload,
});

const authUserReducer = createReducer(user, {
  [actions.registerSuccess]: (state, action) => action.payload.user,
  [actions.loginSuccess]: (state, action) => action.payload.user,
  [actions.getCurrentUserSuccess]: (state, action) => action.payload,
  [actions.logoutSuccess]: () => user,
});

const isAuthed = createReducer(false, {
  [actions.registerSuccess]: () => true,
  [actions.registerError]: () => false,
  [actions.getCurrentUserSuccess]: () => true,
  [actions.getCurrentUserError]: () => false,
  [actions.loginError]: () => false,
  [actions.loginSuccess]: () => true,
  [actions.logoutSuccess]: () => false,
});

const tokenReducer = createReducer('', {
  [actions.getCurrentUserRequest]: (state, action) => action.payload,
  [actions.loginSuccess]: (state, action) => action.payload.token,
  [actions.logoutSuccess]: (state, action) => '',
});

const loader = createReducer(false, {
  [actions.getAllContactsRequest]: () => true,
  [actions.getAllContactsSuccess]: () => false,
  // [actions.getAllContactsError]: () => true,
  [actions.addContactRequest]: () => true,
  [actions.addContactSuccess]: () => false,
  // [actions.addContactError]: () => true,
  [actions.deleteContactRequest]: () => true,
  [actions.deleteContactSuccess]: () => false,
  // [actions.deleteContactError]: () => true,
});

export default combineReducers({
  contactsReducer,
  filterReducer,
  filteredContactsReducer,
  loader,
  authUserReducer,
  isAuthed,
  tokenReducer,
});
