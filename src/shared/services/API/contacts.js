import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://62d3fc515112e98e484883a8.mockapi.io/contacts'
});

export async function postContact(contact) {
    const {data: result} = await instance.post('/', contact);
    return result;
}

export async function deleteContact(id) {
    const { data } = await instance.delete(`/${id}`);
    return data.id;
}

export async function fetchContactsList() {
    const { data } = await instance.get('/');
    return data;
}