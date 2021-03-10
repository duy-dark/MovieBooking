import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import '../../styles/customers/complete/complete.scss';
import { updateHeaderFooter, getUserInfo } from "../../redux/users/actions";

export default function Completed(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateHeaderFooter({
      header: true,
      footer: true
    }))

    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (token && userID) {
      dispatch(getUserInfo({ token, userID }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('errorCode');
  const email = urlParams.get('email');
  if (email) {
    urlParams.set("email", "myValue");
    window.history.replaceState(null, null, "?"+urlParams.toString());
  }
  return (
    <div className="complete">
      <img src={`/assets/complete-bg.png`} alt="" className="complete-bg"/>
      <div className="complete-content">
      { myParam != 0 ? (<h1>Đặt vé không thành công</h1>) : (
        <>
        <h1>Đặt vé thành công</h1>
        <h3>Xin kiểm tra</h3>
        <h3>email {email} và lưu mã QR Code để tới rạp xác nhận</h3>
        <h3>Cám ơn bạn đã sử dụng dịch vụ của chúng tôi</h3>
        </>
      ) }
      </div>
    </div>
  )
}
