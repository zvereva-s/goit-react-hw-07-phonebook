import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

function ContactList({ items, onClick }) {
  const elements = items.map(({ id, name, number }) => (
    <li key={id} className={styles.item}>
      {name}: {number}
      <button
        className={styles.button}
        type="button"
        onClick={() => onClick(id)}
      >
        Delete
      </button>
    </li>
  ));
  return <ul>{elements}</ul>;
}

ContactList.defaultProps = {
  contacts: [],
  onClick: () => {},
};
ContactList.propTypes = {
  onClick: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default memo(ContactList);