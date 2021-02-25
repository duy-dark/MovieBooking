import React from 'react';
import '../../styles/customers/news/news.scss';

export default function CardLucky(props) {
  return (
    <div className="card-new">
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/km1.jpg`} alt=""/>
        </div>
        <div className="thumbnail__title">BHD 59K/VÉ CẢ TUẦN !!!</div>
        <div className="thumbnail__content">
        Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.
        </div>
      </div>
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/km2.jpg`} alt=""/>
        </div>
        <div className="thumbnail__title">TIX 1K/VÉ NGẠI CHI GIÁ VÉ</div>
        <div className="thumbnail__content">
        Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02 voucher thanh toán ZaloPay thả ga
        </div>
      </div>
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/km3.png`} alt=""/>
        </div>
        <div className="thumbnail__title">ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX </div>
        <div className="thumbnail__content">
        ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX Hành trình tìm Ròm và Phúc chỉ với 1k cả tuần + nhận thêm 02 voucher khi đặt vé qua TIX.
        </div>
      </div>
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/km4.jpg`} alt=""/>
        </div>
        <div className="thumbnail__title">BHD STAR VÉ CHỈ 59.000Đ CẢ TUẦN!</div>
        <div className="thumbnail__content">
        Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX và thanh toán bằng ZaloPay hoặc Mục Vé Phim trên ZaloPay.
        </div>
      </div>
    </div>
  )
}
