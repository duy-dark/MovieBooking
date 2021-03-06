import React, { useEffect, useState } from "react";
import "../../styles/customers/profile/profile.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchTicketsInfo } from "../../redux/users/actions";
import moment from "moment";

export default function Profile(props) {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.users.user);
  let tickets = useSelector((state) => state.users.tickets);
  let [limit, setLimit] = useState(1);

  useEffect(() => {
    if (user) dispatch(fetchTicketsInfo({ ...user, limit }));
  }, [limit]);

  //restrict onlyfetch tickets info after got user info
  useEffect(() => {
    if (user) dispatch(fetchTicketsInfo({ ...user, limit }));
  }, [user]);

  let [ticketsView, setTicketsView] = useState(createFirstTickets(tickets));

  //re-render tickets view after tickets change
  useEffect(() => {
    setTicketsView(createFirstTickets(tickets));
  }, [tickets]);

  return (
    <div className="profile">
      <div className="profile__main">
        <div className="profile__main__top-banner">
          <img className="top-banner__image-banner" src={`/assets/profile/profile4.jpg`} alt="" />
          <img className="top-banner__image-avatar" src={user ? user.avatar : "/assets/avatar.png"} alt="" />
        </div>
        <div className="top-banner__username">{user ? user.name : ""}</div>
        <hr />

        <div className="profile__main__tickets">
          <div className="tickets__container-title">
            <img className="tittle__image" src={`/assets/profile/ticket.png`} alt="" />
            <span className="title__text">Vé phim đã đặt:</span>
          </div>

          <div className="tickets__container-list">{ticketsView}</div>
          <div className="see-more">
            <button type="button" class="btn btn-light" onClick={() => setLimit(limit + 1)}>
              Xem thêm...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function createFirstTickets(tickets) {
  let view = [];
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i]) view.push(createCard(tickets[i]));
  }
  return view;
}

function createCard(ticket) {
  return (
    <div className="tickets_card" key={ticket._id}>
      <div className="tickets_card_line">
        <span className="tickets_card_line_left">
          <span className="tickets_card_attr-label">Mã vé:</span>
          <span className="tickets_card_attr-text">{ticket.code}</span>
        </span>

        <span className="tickets_card_line_right">
          <span className="tickets_card_attr-label">Ngày mua:</span>
          <span className="tickets_card_attr-text">{moment(ticket.created_at).format("DD-MM-YYYY HH:mm")}</span>
        </span>
      </div>

      <div className="tickets_card_line">
        <span className="tickets_card_line_left">
          <span className="tickets_card_attr-label">Giá:</span>
          <span className="tickets_card_attr-text">{ticket.cost} VNĐ</span>
        </span>

        <span className="tickets_card_line_right">
          <span className="tickets_card_attr-label">Ghế:</span>
          <span className="tickets_card_attr-text">{ticket.seats.join(",")}</span>
        </span>
      </div>

      <div className="tickets_card_line">
        <span className="tickets_card_line_left">
          <span className="tickets_card_attr-label">Phương thức thanh toán:</span>
          <span className="tickets_card_attr-text">
            <img className="tickets_card_payment-logo" src={"assets/logo-momo.jpg"}></img>
          </span>
        </span>

        <span className="tickets_card_line_right">
          <span className="tickets_card_attr-label">Trạng thái:</span>
          <span
            className="tickets_card_attr-text"
            style={{ color: ticket.is_paid ? "#05CA05" : "red", fontStyle: "italic" }}
          >
            {ticket.is_paid ? "Thành công" : "Thất bại"}
          </span>
        </span>
      </div>

      <div className="tickets_card_line">
        <span className="tickets_card_line_left">
          <span className="tickets_card_attr-label">Phim:</span>
          <span className="tickets_card_attr-text">{ticket.film_schedules.films.name}</span>
        </span>

        <span className="tickets_card_line_right">
          <span className="tickets_card_attr-label">Giờ chiếu:</span>
          <span className="tickets_card_attr-time">
            {moment(ticket.film_schedules.time_start).format("HH:mm")}~
            {moment(ticket.film_schedules.time_end).format("HH:mm") + "  "}
            {moment(ticket.film_schedules.time_start).format("DD/MM/YYYY")}
          </span>
        </span>
      </div>

      <div className="tickets_card_line">
        <span className="tickets_card_line_left">
          <span className="tickets_card_attr-label">Rạp phim:</span>
          <span className="tickets_card_attr-text">{ticket.film_schedules.theaters.name}</span>
        </span>

        <span className="tickets_card_line_right">
          <span className="tickets_card_attr-label">Phòng:</span>
          <span className="tickets_card_attr-text">{ticket.film_schedules.rooms.name}</span>
        </span>
      </div>

      <div className="tickets_card_line">
        <span className="tickets_card_attr-label">Địa chỉ:</span>
        <span className="tickets_card_attr-text">{ticket.film_schedules.theaters.address}</span>
      </div>
    </div>
  );
}
