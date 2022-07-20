import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts} from 'redux/contacts/contacts-selectors';
import {fetchContacts,addContact, removeContact } from '../../redux/contacts/contacts-operations';

import ContactForm from 'shared/components/ContactForm';
import Filter from 'module/Filter';
import ContactList from 'module/ContactList';

function Contacts() {
  const [filter, setFilter] = useState('');
  const contacts = useSelector(getContacts);
  const {items, loading, error } = contacts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])


    const onAddContact = (data)=> {
        dispatch(addContact(data));
    }
  
    const onRemoveContact = (id) => {
        dispatch(removeContact(id));
    }
  
    const onFilter = (e)=>{
      const { value } = e.target;
      setFilter(value);
    }
    const getFilteredItems = () => {
    if (!filter) {
      return items;
    }
    return items.filter(el => el.name.toLowerCase().includes(filter.toLowerCase()));
    }

    const filteredItems = getFilteredItems();
  
  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter filter={onFilter} />
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <ContactList items={filteredItems} onClick={onRemoveContact} />
    </>
  );
}
export default Contacts;