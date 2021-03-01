import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { updateHeaderFooter } from "../../redux/users/actions";
import "../../styles/customers/booking/booking.scss";
import { getFilmDetails, getSeats, postBookingInfo, paymentGateway } from "../../redux/films/actions";
// import { getToken } from "../../redux/users/selector";
import * as moment from "moment"
import { getUserInfo } from "../../redux/users/actions";
import MyCountdownTimer from '../../components/MyCountdownTimer';

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
    if (props.seats.includes(props.seat)) {
      str += " seat--selected"
      console.log('run here')
    }
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
        <span className="s-img">{ props.seats.includes(props.seat) ? formatSeat(props.seat) : formatSeat(status)}</span>
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

const words = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const Completionist = () => <span>You are good to go!</span>;
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
  const [isSelectBug, setIsSelectBug] = useState(false);
  const listSeatsSelected = useSelector((state) => state.films.seated)
  const arrSeats = useSelector((state) => state.films.seats)
  const roomBooking = useSelector((state) => state.films.roomBooking)
  // const data = useSelector((state) => state.films.filmDetail)
  const [disabledBtn, setDisabledBtn] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    setDisabledBtn(!(seats.length > 0 && !isSelectBug && validateEmail(email) && phone && payment));
  }, [seats, email, phone, payment, isSelectBug]);

  const selectSeat = (seat) => {
    if (seats.length <= 10) {
      if (seats.includes(seat)) {
        const arr = [...seats];
        const index = arr.indexOf(seat);
        arr.splice(index, 1);

        let nameRow = seat.slice(0, 1)
        let indexRowItem = words.indexOf(nameRow)
        let indexValueItem = arrSeats[indexRowItem].rows.indexOf(seat)
        if (arrSeats[indexRowItem].types[indexValueItem] === "2-1") {
          let number = +seat.substr(seat.length - 1)
          let name = seat.slice(0, seat.length - 1)
          let numberNext = ++number
          const index1 = arr.indexOf(name + numberNext);
          arr.splice(index1, 1);

        } else if (arrSeats[indexRowItem].types[indexValueItem] === "2-2") {
          let number = +seat.substr(seat.length - 1)
          let name = seat.slice(0, seat.length - 1)
          let numberPrev = --number
          const index1 = arr.indexOf(name + numberPrev);
          arr.splice(index1, 1);
        }
        setSeats([...arr]);
      } else {
        let nameRow = seat.slice(0, 1)
        let indexRowItem = words.indexOf(nameRow)
        let indexValueItem = arrSeats[indexRowItem].rows.indexOf(seat)
        if (arrSeats[indexRowItem].types[indexValueItem] === "2-1") {
          let number = +seat.substr(seat.length - 1)
          let name = seat.slice(0, seat.length - 1)
          let numberNext = ++number
          setSeats([...seats, seat, name + numberNext])
        } else if (arrSeats[indexRowItem].types[indexValueItem] === "2-2") {
          let number = +seat.substr(seat.length - 1)
          let name = seat.slice(0, seat.length - 1)
          let numberPrev = --number
          setSeats([...seats, seat, name + numberPrev])
        } else {
          setSeats([...seats, seat]);
        }
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
      seats: seats,
      email: email,
      phone_number: phone,
      payment: "momo",
      voucher_id: ""
    };
    dispatch(paymentGateway({ params: bookingInfo, history: window}));
    setDisabledBtn(true);
  };
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (showError) {
      alert('không thể chừa trống 1 ghế')
      setShowError(false)
    }
  }, [showError])
  useEffect(() => {
    seats.map(item => {
      let nameRow = item.slice(0, 1)
      let indexRowItem = words.indexOf(nameRow)
      let indexValueItem = arrSeats[indexRowItem].rows.indexOf(item)
      if (arrSeats[indexRowItem].types[indexValueItem] !== "2-1" && arrSeats[indexRowItem].types[indexValueItem] !== "2-2") {
        let valueNearL1 = arrSeats[indexRowItem].rows[indexValueItem - 1]
        let valueNearL2 = arrSeats[indexRowItem].rows[indexValueItem - 2]
        let valueNearR1 = arrSeats[indexRowItem].rows[indexValueItem + 1]
        let valueNearR2 = arrSeats[indexRowItem].rows[indexValueItem + 2]
        if (valueNearL1 && !listSeatsSelected.includes(valueNearL1) && !seats.includes(valueNearL1) && (valueNearL2 === "0" || valueNearL2 === undefined)) {
          setIsSelectBug(true)
          setShowError(true)
        } else if (valueNearR1 && !listSeatsSelected.includes(valueNearR1) && !seats.includes(valueNearR1) && (valueNearR2 === "0" || valueNearR2 === undefined)) {
          setIsSelectBug(true)
          setShowError(true)
        } else {
          setIsSelectBug(false)
          setShowError(false)
        }
      }
    })
  }, [seats])

  useEffect(() => {
    const info = {
      id: id
    };
    dispatch(getFilmDetails(info));
    dispatch(getSeats(movies.schedule_id));
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (token && userID) {
      dispatch(getUserInfo({ token, userID }));
    } else {
      history.push("/login")
    }
  }, [])

  const formatDate = (date) => {
    return moment(date).format('dddd DD/MM/YYYY hh:mm');
  }

  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     // Render a completed state
  //     setSeats([])
  //     alert('quá thời gian quy định')
  //     return <span>You are good to go!</span>;
  //     // console.log("Completed")
  //   } else {
  //     // Render a countdown
  //     return <span> {"0" +minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>;
  //   }
  // };

  return (
    <div className="booking">
      <div className="booking-content">
        <div className="booking-content__header">
          <div className="booking-content__threater">
            <img src={movies.theater_url_image} alt="" />
            <div className="booking-content__content">
              <div className="booking-content__threater__name">{movies && movies.theater_name}</div>
              <div className="booking-content__threater__room">{`${formatDate(movies.schedule.time_start)} - ${roomBooking}`}</div>
            </div>
          </div>
          <div className="booking-content__countdown">

          </div>
        </div>
        <div className="booking-content__screen">
          <img src="/assets/screen.png" alt="" />
        </div>
        <div id="" className="booking-content__list-seats">
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
