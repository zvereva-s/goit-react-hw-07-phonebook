import { createAsyncThunk } from "@reduxjs/toolkit";
import {postContact, deleteContact, fetchContactsList} from '../../shared/services/API/contacts';

const createOperation = (name, request, condition) => {
    return createAsyncThunk(
        name,
        async (data, { rejectWithValue }) => {
            try {
                return await request(data)
            }
            catch (error) {
                rejectWithValue(error)
            }
        },
        {condition}
    )
}

export const fetchContacts = createOperation('contacts/fetch', fetchContactsList);
export const removeContact = createOperation('contact/remove', deleteContact);
export const addContact = createOperation('contact/add', postContact, (contact, { getState }) => {
    const { contacts } = getState();
    const { items } = contacts;
    const copy = items.find(el => el.name === contact.name);
    if (copy) {
        alert(`${contact.name} you have already in your contacts`);
        return false;
    }
});


// export const addContact = createAsyncThunk(
//     'add/contact',
//     async (contact, { rejectWithValue}) => {
//         try {
//             const newContact = await contactsApi.postContact(contact);
//             return newContact;
//         }
//         catch (error) {
//             rejectWithValue(error)
//         }
//     },
//     {
    //     condition: (contact, { getState }) => {
    //         const { contacts } = getState();
    //         const { items } = contacts;
    //         const copy = items.find(el => el.name === contact.name);
    //         if (copy) {
    //             alert(`${contact.name} you have already in your contacts`);
    //             return false;
    //         }
    //     }
    // }
// )

// export const fetchContacts = createAsyncThunk(
//     'fetch/contacts',
//     async (_, { rejectWithValue }) => {
//         try {
//             const contacts = await contactsApi.getContactsList();
//             return contacts;
//          }
//         catch (error) {
//             rejectWithValue(error)
//         }
//     }
// )

// export const removeContact = createAsyncThunk(
//     'remove/contact',
//     async (id, {rejectWithValue }) => {
//         try {
//             const response = await contactsApi.deleteContact(id);
//             return response;
//          }
//         catch (error) {
//             rejectWithValue(error)
//         }
//     }
// )