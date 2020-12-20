import React from "react";
export default function PostItem(props) {
  return (
    <>
      <div className="post_item">
        <img
          className="img"
          src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043752411629.png"
        />
        <div className="newsTitle">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công chiếu </div>
        <div className="newsDescription">
          Sau 2 tuần ra mắt, Tiệc Trăng Máu chính thức gia nhập câu lạc bộ phim điện ảnh đạt 100 tỷ đồng doanh thu phòng
          vé. Dàn ngôi sao “bạc tỷ” của phim cũng lần đầu tiên hội tụ đầy đủ trong một khung hình để ăn mừng thành tích
          ấn tượng của tác phẩm.
        </div>
      </div>
    </>
  );
}
