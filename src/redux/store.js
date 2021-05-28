import contactsReducer from './reducers/PhoneBookReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: contactsReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
