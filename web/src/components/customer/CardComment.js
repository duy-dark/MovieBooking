import React from "react";
import * as moment from "moment"

export default function CardComment(props) {
  let rate1 = Math.floor(props.rate / 2)
  let rate2 = props.rate % 2
  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY')
  }

  return (
    <div className="card-comment">
      <div className="card-comment__header">
        <div className="card-comment__user">
          <img src={`${props.customers.avatar ? props.customers.avatar : '/assets/avatar.png'}`} alt="" />
          <div className="card-comment__user__content">
          <span>{props.username}</span>
          <span>{formatDate(props.created_at)}</span>

          </div>
        </div>
        <div className="card-comment__rate">
          { rate1 >= 1 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 >= 2 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 >= 3 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 >= 4 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 === 5 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate2 !== 0 && (<img className="image-half" src={`https://tix.vn/app/assets/img/icons/star1.2.png`} alt="star"/>)}
        </div>
      </div>
      <div className="card-comment__content">
        <p>{props.content}</p>
      </div>
    </div>
  );
}
