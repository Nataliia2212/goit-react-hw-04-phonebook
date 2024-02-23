import React from 'react';
import css from './Filter.module.css'

export default function Filter ({filter, onChange}) {
  return (
    <div className={css.wrap}>
        <p>Find contacts by name</p>
        <input className={css.input} type="text" value={filter} name="filter" onChange={onChange}/>
    </div>
  )
}
