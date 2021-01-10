import React, { Component } from "react";
import "../../styles/customers/navbar.scss";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="narbar__item">Lịch Chiếu</div>
        <div className="narbar__item">Cụm Rạp</div>
        <div className="narbar__item">Tin Tức</div>
        <div className="narbar__item">Ứng Dụng</div>
      </div>
    );
  }
}
