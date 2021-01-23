import React from 'react'

export default function ContentFilm(props) {
  return (
    <div className="detail-info">
      <div className="detail-info__left">
        <table>
          <tbody>
            <tr>
              <th>Ngày công chiếu</th>
              <td>11</td>
            </tr>
            <tr>
              <th>Đạo diễn</th>
              <td>1</td>
            </tr>
            <tr>
              <th>Diễn viên</th>
              <td>11</td>
            </tr>
            <tr>
              <th>Thể Loại</th>
              <td>11</td>
            </tr>
            <tr>
              <th>Định dạng</th>
              <td>11</td>
            </tr>
            <tr>
              <th>Quốc Gia SX</th>
              <td>11</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="detail-info__right">
          <p className="detail-info__content__title">Nội dung</p>
          <p>Sám Hối kể về câu chuyện cuộc đời của một võ sĩ tên Long (Bình Minh). Là một nhà vô địch bất bại trên sàn đấu khiến Long trở nên tự mãn và coi thường người khác. Nhưng từ sự ngạo mạn đó đã kéo theo nhiều rắc rối khiến gia đình anh tan nát. Long phải đánh đổi lòng tự trọng, danh dự của một võ sĩ, cúi đầu trước những kẻ mà anh đã từng khinh khi để cứu lấy gia đình.</p>
        </div>
    </div>
  )
}
