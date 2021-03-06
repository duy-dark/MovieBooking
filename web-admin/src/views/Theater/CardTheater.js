import React, { useState } from 'react';

export default function CardTheater(props) {
  const [name, setName] = useState();
  return (
    <div className={`card-theater ${props.isEdit ? 'card-theater--edit' : ''}`}>
      <div className="form-control">
        <label>name</label>
        {props.isEdit ? (<input type="text" onChange={e => setName(e.target.value)}/>) : (<span>{name}</span>)}
        
      </div>
      <div className="form-control">
        <label>name</label>
        <input type="text" onChange={e => setName(e.target.value)}/>
      </div>
    </div>
  )
}