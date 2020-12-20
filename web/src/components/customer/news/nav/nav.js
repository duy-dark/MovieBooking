import React from "react";
import "../../../../styles/customers/news/nav.scss";
export default function Nav(props) {
  return (
    <>
      <div className="nav">
        <ul className="nav_title">
          <li className="nav_content active">Điện Ảnh 24h</li>
          <li className="nav_content">Review</li>
          <li className="nav_content">Khuyến mãi</li>
        </ul>
      </div>
    </>
  );
}
