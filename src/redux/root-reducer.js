import { combineReducers } from "@reduxjs/toolkit";
import contactsReducer from 'redux/contacts/contacts-slice';

const rootReducer = combineReducers({
    contacts: contactsReducer, 
})

export default rootReducer;