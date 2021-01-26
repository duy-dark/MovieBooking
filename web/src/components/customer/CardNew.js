import React from 'react';
import '../../styles/customers/news/news.scss';

export default function CardNew(props) {
  return (
    <div className="card-new">
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/new1.jpg`} alt=""/>
        </div>
        <div className="thumbnail__title">Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</div>
        <div className="thumbnail__content">
          Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!
        </div>
      </div>
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/new2.jpg`} alt=""/>
        </div>
        <div className="thumbnail__title">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</div>
        <div className="thumbnail__content">
          Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống ảo độc-lạ-chill nhất từ trước đến giờ sẽ chính thức khai trương tại 360 Giải Phóng!
        </div>
      </div>
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/new3.png`} alt=""/>
        </div>
        <div className="thumbnail__title">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công chiếu </div>
        <div className="thumbnail__content">
          Sau 2 tuần ra mắt, Tiệc Trăng Máu chính thức gia nhập câu lạc bộ phim điện ảnh đạt 100 tỷ đồng doanh thu phòng vé. Dàn ngôi sao “bạc tỷ” của phim cũng lần đầu tiên hội tụ đầy đủ trong một khung hình để ăn mừng thành tích ấn tượng của tác phẩm.
        </div>
      </div>
      <div className="card-new__thumbnail">
        <div className="thumbnail__image">
          <img src={`/assets/news/new4.jpg`} alt=""/>
        </div>
        <div className="thumbnail__title">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ TRANG PHỤC CHO SIÊU ANH HÙNG ĐẦU TIÊN CỦA VIỆT NAM – VINAMAN</div>
        <div className="thumbnail__content">
        Chiều tối ngày 30-10-2020, Ngô Thanh Vân và Studio68 đã chính thức phát động cuộc thi thiết kế trang phục cho siêu anh hùng VINAMAN với tổng giá trị giải thưởng lên đến 60 triệu đồng.
        </div>
      </div>
    </div>
  )
}
