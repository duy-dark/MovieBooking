import React from "react";

export default function CardComment(props) {
  let rate1 = Math.floor(props.rate / 2)
  let rate2 = props.rate % 2
  return (
    <div className="card-comment">
      <div className="card-comment__header">
        <div className="card-comment__user">
          <img src="https://tix.vn/app/assets/img/avatar.png" alt="" />
          <span>{props.username}</span>
        </div>
        <div className="card-comment__rate">
          { rate1 >= 1 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 >= 2 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 >= 3 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 >= 4 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate1 === 5 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
          { rate2 !== 0 && (<img src={`https://tix.vn/app/assets/img/icons/star1.2.png`} alt="star"/>)}
        </div>
      </div>
      <div className="card-comment__content">
        <p>{props.content}</p>
      </div>
    </div>
  );
}
