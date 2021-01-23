import React from 'react';
import { useHistory } from 'react-router-dom'

export default function CardTime(props) {
  let history = useHistory();

  const clickTime = () => {

  }
  return (
    <div className="card-time" onClick={clickTime}>
      <span className="card-time__highlight">19:00</span>~<span>20:45</span>
    </div>
  )
}
