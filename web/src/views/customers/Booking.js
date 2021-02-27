import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useStore, useDispatch, useSelector } from "react-redux";
// import { updateHeaderFooter } from "../../redux/users/actions";
import "../../styles/customers/booking/booking.scss";
import { getFilmDetails, getSeats, postBookingInfo } from "../../redux/films/actions";
// import { getToken } from "../../redux/users/selector";
import * as moment from "moment"

const SeatEl = (props) => {
  const [status, setStatus] = useState();
  const selectSeat = (seat) => {
    if (props.seats.length < 10) {
      !status ? setStatus(seat) : setStatus("");
      props.onSelect(seat);
    } else if (props.seats.includes(seat)) {
      !status ? setStatus(seat) : setStatus("");
      props.onSelect(seat);
    } else {
      alert("không được mua quá 10 vé");
    }
  };
  const formatSeat = (seat) => seat && seat.slice(-2);
  let classSeatPar = () => {
    let str = "seat-wrapper"
    if (props.seatsSelected.includes(props.seat)) str += " seat-wrapper--hide"
    if (props.type === "2-1") str += " seat-wrapper--two1"
    if (props.type === "2-2") str += " seat-wrapper--two2"
    if (props.isBuy === "1") str += " seat-wrapper--isBuy"

    return str
  }
  let classSeatChil = () => {
    let str = "seat"
    if (props.seatsSelected.includes(props.seat)) str += " seat--hide"
    if (status) str += " seat--selected"
    if (props.vip === "1") str += " seat--vip"
    if (props.type === "2-1") str += " seat--together seat--two-1"
    if (props.type === "2-2") str += " seat--together seat--two-2"
    return str
  }

  let clickSeat = (value) => {
    if (value.isBuy === "1") {
      alert("ghế này không được mua")
    } else {
      selectSeat(value.seat)
    }
  }
  return (
    <span className={classSeatPar()} onClick={() => clickSeat(props)}>
      <span className={classSeatChil()}>
        <span className="s-img">{formatSeat(status)}</span>
      </span>
    </span>
  );
};

const RowSeatEl = (props) => {
  const selectSeat = (seat) => {
    props.onSelectSeat(seat);
  };
  return (
    <div className="row-seat">
      <span className="seat-wrapper">
        <span className="seat seat--name">{props.name}</span>
      </span>
      {props.rows.map((row, index) => {
        if (row !== "0") {
          return <SeatEl key={`${row}`} seat={row} vip={props.vips[index]} isBuy={props.buys[index]} type={props.types[index]} seatsSelected={props.seatsSelected} seats={props.seats} onSelect={(seat) => selectSeat(seat)} />
        }
        return <span key={index} className="seat-wrapper seat-wrapper--none"></span>
      })}
    </div>
  );
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function Booking(props) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [movies, setMovies] = useState(location.state);
  const [seats, setSeats] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const { users } = useStore().getState();

  const [disabledBtn, setDisabledBtn] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    setDisabledBtn(!(seats.length > 0 && validateEmail(email) && phone && payment));
  }, [seats, email, phone, payment]);
  const selectSeat = (seat) => {
    if (seats.length <= 10) {
      if (seats.includes(seat)) {
        const arr = [...seats];
        const index = arr.indexOf(seat);
        arr.splice(index, 1);
        setSeats([...arr]);
      } else {
        setSeats([...seats, seat]);
      }
    }
  };
  const formatMoney = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  const bookingTicket = () => {
    const bookingInfo = {
      count: seats.length,
      cost: seats.length * 80000,
      customer_id: user._id,
      film_schedule_id: movies.schedule_id,
      seat_ids: seats,
      email,
      phone_number: phone,
      payment,
    };
    dispatch(postBookingInfo(bookingInfo, history));
    setDisabledBtn(true);
  };

      // useEffect(() => {
      //   dispatch(
      //     updateHeaderFooter({
      //       header: true,
      //       footer: true,
      //     })
      //   );

      //   const token = getToken(users);
      //   if (!token) {
      //     history.push("/login");
      //   }
      //   // eslint-disable-next-line react-hooks/exhaustive-deps
      // }, []);
  useEffect(() => {
    const info = {
      id: id
    };
    dispatch(getFilmDetails(info));
    dispatch(getSeats(movies.schedule_id));
  }, [])
  // const data = useSelector((state) => state.films.filmDetail)
  const listSeatsSelected = useSelector((state) => state.films.seated)
  const arrSeats = useSelector((state) => state.films.seats)
  const roomBooking = useSelector((state) => state.films.roomBooking)

  const formatDate = (date) => {
    return moment(date).format('dddd DD/MM/YYYY hh:mm');
  }

  return (
    <div className="booking">
      <div className="booking-content">
        <div className="booking-content__header">
          <img src={movies.theater_url_image} alt="" />
          <div className="booking-content__threater">
            <div className="booking-content__threater__name">{movies && movies.theater_name}</div>
            <div className="booking-content__threater__room">{`${formatDate(movies.schedule.time_start)} - ${roomBooking}`}</div>
          </div>
        </div>
        <div className="booking-content__screen">
          <img src="/assets/screen.png" alt="" />
        </div>
        <div className="booking-content__list-seats">
          {arrSeats.map((row, index) => (
            <RowSeatEl key={index} seats={seats} seatsSelected={listSeatsSelected} {...row} onSelectSeat={(seat) => selectSeat(seat)} />
          ))}
        </div>
        <div className="booking-content__des">
          <div className="type-seat">
            <span className="seat-wrapper">
              <span className="seat seat--hide">
                <span className="s-img" />
              </span>
            </span>
            <span>Ghế đã đặt</span>
          </div>
          <div className="type-seat">
            <span className="seat-wrapper">
              <span className="seat">
                <span className="s-img" />
              </span>
            </span>
            <span>Ghế thường</span>
          </div>
          <div className="type-seat">
            <span className="seat-wrapper">
              <span className="seat seat--vip">
                <span className="s-img" />
              </span>
            </span>
            <span>Ghế vip</span>
          </div>
          <div className="type-seat">
            <span className="seat-wrapper">
              <span className="seat seat--together">
                <span className="s-img" />
              </span>
            </span>
            <span>Ghế đôi</span>
          </div>
        </div>
      </div>
      <div className="booking-form">
        <div className="booking-form__input booking-form__total">
          <p> {formatMoney(seats.length * 80000)}đ</p>
        </div>
        <div className="booking-form__input booking-form__film-name">
          <div className="booking-form__name">{movies.name}</div>
          <div className="booking-form__threater">{movies.theater_name}</div>
          <div className="booking-form__address">{`${formatDate(movies.schedule.time_start)} - ${roomBooking}`}</div>
        </div>
        <div className="booking-form__input booking-form__seats">
          Ghế{" "}
          {seats.map((seat, index) => {
            return (
              <span key={index}>
                {index > 0 ? ", " : ""}
                {seat}
              </span>
            );
          })}
        </div>
        <div className="booking-form__input booking-form__email">
          <p>Email</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div />
        </div>

        <div className="booking-form__input booking-form__phone">
          <p>Phone</p>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="booking-form__input booking-form__payment">
          <p>Hình thức thanh toán</p>
          <div className="group-radio">
            <div className="radio-form">
              <input id="momo" name="payment" value="momo" onChange={(e) => setPayment(e.target.value)} type="radio" />
              <label htmlFor="momo">
                <img src="/assets/logo-momo.jpg" alt="" /> <span>Thanh toán Momo</span>
              </label>
            </div>
          </div>
        </div>
        <button
          className={`booking-form-btn ${disabledBtn ? "booking-form-btn--disabled" : ""}`}
          onClick={bookingTicket}
        >
          Đặt Vé
        </button>
      </div>
    </div>
  );
}
