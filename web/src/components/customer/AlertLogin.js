import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'

export default function AlertLogin(props) {
  return (
    <Modal
      {...props}
      className="modal--login"
      centered
    >
      <Link to="/login">Đăng Nhập</Link>
    </Modal>
  )
}
