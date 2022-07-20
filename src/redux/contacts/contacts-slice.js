import { createSlice } from "@reduxjs/toolkit";
import {addContact, fetchContacts, removeContact } from './contacts-operations';

const initialState = {
    items: [],
    loading: false,
    error: null,
}

const pending = (store) => ({ ...store, loading: true, error: null });
const rejected = (store, { payload }) => ({ ...store, error: payload });


const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: {
        [addContact.pending]: pending,
        [fetchContacts.pending]: pending,
        [removeContact.pending]: pending,
        
        [addContact.fulfilled]: (store, { payload }) => ({ ...store, loading: false, error: null, items: [...store.items, payload] }),
        
        [fetchContacts.fulfilled]: (store, {payload}) => ({...store, loading: false, error: null, items: payload, }),

        [removeContact.fulfilled]: (store, { payload }) => ({
            ...store, loading: false, items: [...store.items.filter(el => el.id !== payload)]}),

        [addContact.rejected]: rejected,
        [fetchContacts.rejected]: rejected,
        [removeContact.rejected]: rejected,
    },
})


export default contactsSlice.reducer;