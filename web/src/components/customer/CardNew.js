import React from 'react';
import "../../styles/customers/news/card-new.scss"
export default function CardNew(props) {
  return (
    <div className="card-new column">
      <div className="card-new__image">
        <img src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16111317082644.jpg" alt="">
        </img>
      </div>
      <div className="card-new__title">
        <a>
          <p>Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</p>
        </a>
      </div>
      <div className="card-new__content">
        <p>
        Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!
        </p>
      </div>
      <div className="card-new__other">
        <a className="card-new__other__icon">
          <img src="/assets/img/icons/like.png" alt="" />
          <p>0</p>
        </a>
        <a className="card-new__other__icon">
          <img src="/assets/img/icons/comment.png" alt="" />
          <p>0</p>
        </a>
      </div>
    </div>
  )
}
