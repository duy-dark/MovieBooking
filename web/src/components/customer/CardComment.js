import React from "react";

export default function CardComment(props) {
  return (
    <div className="card-comment">
      <div className="card-comment__header">
        <div className="card-comment__user">
          <img src="https://tix.vn/app/assets/img/avatar.png" alt="" />
          <span>Phạm Quang Duy</span>
        </div>
        <div className="card-comment__rate">
          <img src="https://tix.vn/app/assets/img/icons/star1.png" alt="star" />
        </div>
      </div>
      <div className="card-comment__content">
        <p>Tiếp theo là nhân vật Thuyền trưởng răng kiếm, tạo hình cũng rất đạt, vừa độc áo nhưng lại siêu ngu ngốc</p>
      </div>
    </div>
  );
}
