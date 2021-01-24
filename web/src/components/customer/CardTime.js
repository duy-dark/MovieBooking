import React from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment'

export default function CardTime(props) {
  let history = useHistory();
  const formatDate = (date) => {
    return moment(date).format("hh:mm")
  }
  const clickTime = () => {

  }
  return (
    <div className="time-film" onClick={clickTime}>
      <span>{formatDate(props.schedule.time_start)}</span>~<span>{formatDate(props.schedule.time_end)}</span>
    </div>
  )
}
