import React, { useState } from "react";
import "../../styles/customers/navbar.scss";

export default function Navbar() {
  const [active, setActive] = useState();
  return (
    <div className="navbar">
      <div className={`narbar__item ${active === 1 ? 'navbar__item--active' : ''}`} onClick={() => setActive(1)}><a href="/#homeSchedule">Lịch Chiếu</a></div>
      <div className={`narbar__item ${active === 2 ? 'navbar__item--active' : ''}`} onClick={() => setActive(2)}><a href="/#listTheater">Cụm Rạp</a></div>
      <div className={`narbar__item ${active === 3 ? 'navbar__item--active' : ''}`} onClick={() => setActive(3)}><a href="/#listNews">Tin Tức</a></div>
    </div>
  );
}
