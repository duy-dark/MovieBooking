import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateHeaderFooter } from "../../redux/users/actions";
import '../../styles/customers/complete/complete.scss';
import { useLocation } from 'react-router-dom';

export default function Completed(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formBooking, setFormBooking] = useState();
  useEffect(() => {
    dispatch(updateHeaderFooter({
      header: true,
      footer: true
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="complete">
      <img src={`/assets/complete-bg.png`} alt="" className="complete-bg"/>
      <div className="complete-content">
        <h1>Đặt vé thành công</h1>
        {/* <h3>Xin kiểm tra email {formBooking.email}</h3>
        <h3>Xin kiểm tra tin nhắn {formBooking.phone_number} </h3> */}
        <h3>Xin kiểm tra</h3>
        <h3>email email</h3>
        <h3>tin nhắn số điện thoại email</h3>
        <h3>Cám ơn bạn đã sử dụng dịch vụ của chúng tôi</h3>
      </div>
    </div>
  )
}
