import React from 'react';
import css from './ContactItem.module.css'

export default function ContactItem({id, name, number, onDelete}) {
  return (
    <li className={css.item}>
        {name}: {number}
        <button className={css.button} onClick={() => onDelete(id)}>Delete</button>
    </li>
  )
}
