import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { updateHeaderFooter } from "../../redux/users/actions";
import "../../styles/customers/booking/booking.scss";
import { getFilmDetails, getSeats, paymentGateway } from "../../redux/films/actions";
// import { getToken } from "../../redux/users/selector";
import * as moment from "moment"
import { getUserInfo } from "../../redux/users/actions";
import io from 'socket.io-client';
import Countdown from 'react-countdown';
import xor from 'lodash/xor';

const POINT = 'https://servermoviebooking.herokuapp.com/';

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
  let arr = xor(props.seatsSelected, props.seats)
  console.log(arr);
  const formatSeat = (seat) => seat && seat.slice(-2);
  let classSeatPar = () => {
    let str = "seat-wrapper"
    if (props.seatsSelected .includes(props.seat)) str += " seat-wrapper--hide"
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
        <span className="s-img">{ props.seats.includes(props.seat) ? formatSeat(props.seat) : ''}</span>
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
const Completionist = () => <span>Bạn đã hết thời gian!</span>;
export default function Booking(props) {
  const socket = io(POINT);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [movies, setMovies] = useState(location.state);
  const [seats, setSeats] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const listSeatsSelected = useSelector((state) => state.films.seated)
  const [selectedSS, setSelectSS] = useState();
  const arrSeats = useSelector((state) => state.films.seats)
  const roomBooking = useSelector((state) => state.films.roomBooking)
  // const data = useSelector((state) => state.films.filmDetail)
  const [disabledBtn, setDisabledBtn] = useState(false);
  let { id } = useParams();
  const [isSelectBug, setIsSelectBug] = useState(false);
  useEffect(() => {
    setDisabledBtn(!(seats.length > 0 && !isSelectBug && validateEmail(email) && phone && payment));
  }, [seats, email, phone, payment, isSelectBug]);

  const selectSeat = (seat) => {
    let arrSeatAll = [...seats]
    if (seats.length <= 10) {
      if (seats.includes(seat)) {
        const arr = [...seats];
        const index = arr.indexOf(seat);
        arr.splice(index, 1);
        arrSeatAll = [...arr]
        let nameRow = seat.slice(0, 1)
        let indexRowItem = words.indexOf(nameRow)
        let indexValueItem = arrSeats[indexRowItem].rows.indexOf(seat)
        if (arrSeats[indexRowItem].types[indexValueItem] === "2-1") {
          let number = +seat.substr(seat.length - 1)
          let name = seat.slice(0, seat.length - 1)
          let numberNext = ++number
          const index1 = arr.indexOf(name + numberNext);
          arr.splice(index1, 1);
          arrSeatAll = [...arr]

        } else if (arrSeats[indexRowItem].types[indexValueItem] === "2-2") {
          let number = +seat.substr(seat.length - 1)
          let name = seat.slice(0, seat.length - 1)
          let numberPrev = --number
          const index1 = arr.indexOf(name + numberPrev);
          arr.splice(index1, 1);
          arrSeatAll = [...arr]
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
          arrSeatAll = [...seats, seat, name + numberNext]
        } else if (arrSeats[indexRowItem].types[indexValueItem] === "2-2") {
          let number = +seat.substr(seat.length - 1)
          let name = seat.slice(0, seat.length - 1)
          let numberPrev = --number
          setSeats([...seats, seat, name + numberPrev])
          arrSeatAll = [...seats, seat, name + numberPrev]
        } else {
          setSeats([...seats, seat]);
          arrSeatAll = [...seats, seat]
        }
      }
    }

    socket.emit("sellect_seat", { name: movies.schedule_id }, arrSeatAll);
  };

  useEffect(() => {
    setSelectSS([...listSeatsSelected])
  }, [listSeatsSelected])

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
      voucher_id: null
    };
    dispatch(paymentGateway({ params: bookingInfo, history: window}));
    setDisabledBtn(true);
  };

  useEffect(() => {
    let invalid=0
    for(let i=0;i<seats.length-1;i++){
      for(let j=i+1;j<seats.length;j++){
        if(seats[i][0]!=seats[j][0])continue;
        function getRowId(chair){
          console.log(+chair.slice(1,chair.length))
          return +chair.slice(1,chair.length)
        }
        if(Math.abs(getRowId(seats[i])-getRowId(seats[j]))==2){
          invalid=seats[j]
          break
        }
      }
    }
    if(invalid) {
      alert("ghe "+invalid+ " ko hop le")
      setIsSelectBug(true)
    } else {
      setIsSelectBug(false)
    }
  }, [seats])

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      socket.emit("sellect_seat", { name: movies.schedule_id }, []);
      history.push(`/${id}/detail/`)
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div style={{display: "flex", flexDirection: "column"}}>
          <span style={{fontSize: 10, color: '#9b9b9b'}}>thời gian giữ ghế</span>
          <div style={{fontSize: 29, color: '#fb4226', fontWeight: 'bold'}}>
            <span>{'0' + minutes}</span>:<span>{seconds < 10 ? '0' + seconds : seconds}</span>
          </div>
        </div>
      );
    }
  };

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
    
    socket.emit('john_room', { name: movies.schedule_id })

    socket.on('seats_existed', res => {
      // setSelectSS([...listSeatsSelected, ...res])
    })
  }, [])

  const formatDate = (date) => {
    return moment(date).format('dddd DD/MM/YYYY hh:mm');
  }
  const [timeLimit, setTimeLimit] = useState(Date.now() + 300000)

  return (
    <div className="booking">
      {movies && (
        <>
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
              <Countdown
                date={timeLimit}
                renderer={renderer}
              />
            </div>
          </div>
          <div className="booking-content__screen">
            <img src="/assets/screen.png" alt="" />
          </div>
          <div id="" className="booking-content__list-seats">
            {arrSeats.map((row, index) => (
              <RowSeatEl key={index} seats={seats} seatsSelected={selectedSS} {...row} onSelectSeat={(seat) => selectSeat(seat)} />
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

        </>
      )}
    </div>
  );
}
