import React from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment'

export default function CardTime(props) {
  let history = useHistory();
  const formatDate = (date) => {
    return moment(date).format("hh:mm")
  }
  const clickTime = () => {
    history.push({
      pathname: `/${props.film._id}/booking`,
      state: {
        schedule_id: props.schedule._id,
        schedule: props.schedule,
        theater_name: props.theater_name,
        theater_url_image: props.theater_url_image,
        name: props.name
      }
    })
  }
  return (
    <div className="time-film" onClick={clickTime}>
      <span>{formatDate(props.schedule.time_start)}</span>~<span>{formatDate(props.schedule.time_end)}</span>
    </div>
  )
}
