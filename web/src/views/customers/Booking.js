import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useStore, useDispatch, useSelector } from "react-redux";
import { updateHeaderFooter } from "../../redux/users/actions";
import "../../styles/customers/booking/booking.scss";
import { postBookingInfo } from "../../redux/films/actions";
import { getToken } from "../../redux/users/selector";

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
  return (
    <span className="seat-wrapper" onClick={() => selectSeat(props.seat)}>
      <span className={`seat ${status ? "seat--selected" : ""}`}>
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
      {props.rows.map((row) => (
        <SeatEl key={`${row}`} seat={row} seats={props.seats} onSelect={(seat) => selectSeat(seat)} />
      ))}
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
  const listSeat = [
    {
      name: "A",
      rows: ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14"],
    },
    {
      name: "B",
      rows: ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12", "B13", "B14"],
    },
    {
      name: "C",
      rows: ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12", "C13", "C14"],
    },
    {
      name: "D",
      rows: ["D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10", "D11", "D12", "D13", "D14"],
    },
    {
      name: "E",
      rows: ["E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09", "E10", "E11", "E12", "E13", "E14"],
    },
    {
      name: "F",
      rows: ["F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10", "F11", "F12", "F13", "F14"],
    },
    {
      name: "G",
      rows: ["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12", "G13", "G14"],
    },
    {
      name: "H",
      rows: ["H01", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09", "H10", "H11", "H12", "H13", "H14"],
    },
    {
      name: "I",
      rows: ["I01", "I02", "I03", "I04", "I05", "I06", "I07", "I08", "I09", "I10", "I11", "I12", "I13", "I14"],
    },
    {
      name: "J",
      rows: ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09", "J10", "J11", "J12", "J13", "J14"],
    },
  ];
  const { users } = useStore().getState();

  const [disabledBtn, setDisabledBtn] = useState(false);

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
      film_schedule_id: movies.scheduleId,
      seat_ids: seats,
      email,
      phone_number: phone,
      payment,
    };
    dispatch(postBookingInfo(bookingInfo, history));
    setDisabledBtn(true);
  };

  useEffect(() => {
    dispatch(
      updateHeaderFooter({
        header: true,
        footer: true,
      })
    );

    const token = getToken(users);
    if (!token) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="booking">
      <div className="booking-content">
        <div className="booking-content__header">
          <img src="/assets/ic_bhd.png" alt="" />
          <div className="booking-content__threater">
            <div className="booking-content__threater__name">{movies && movies.threater}</div>
            <div className="booking-content__threater__room">{`${movies.day} - ${movies.date} - ${movies.timeStart} - ${movies.room}`}</div>
          </div>
        </div>
        <div className="booking-content__screen">
          <img src="/assets/screen.png" alt="" />
        </div>
        <div className="booking-content__list-seats">
          {listSeat.map((row, index) => (
            <RowSeatEl key={index} seats={seats} {...row} onSelectSeat={(seat) => selectSeat(seat)} />
          ))}
        </div>
        <div className="booking-content__des">
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
        </div>
      </div>
      <div className="booking-form">
        <div className="booking-form__input booking-form__total">
          <p> {formatMoney(seats.length * 80000)}đ</p>
        </div>
        <div className="booking-form__input booking-form__film-name">
          <div className="booking-form__name">{movies.name}</div>
          <div className="booking-form__threater">{movies.threater}</div>
          <div className="booking-form__address">{`${movies.day} - ${movies.date} - ${movies.timeStart} - ${movies.room}`}</div>
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
            <div className="radio-form">
              <input
                id="zalopay"
                name="payment"
                value="zalopay"
                onChange={(e) => setPayment(e.target.value)}
                type="radio"
              />
              <label htmlFor="zalopay">
                <img src="/assets/ic-zalopay.png" alt="" /> <span>Thanh toán Zalopay</span>
              </label>
            </div>
            <div className="radio-form">
              <div className="">
                <input
                  id="noidia"
                  name="payment"
                  value="noi dia"
                  onChange={(e) => setPayment(e.target.value)}
                  type="radio"
                />
                <label htmlFor="noidia">
                  <img src="/assets/ic-noidia.png" alt="" />
                  <span>Thanh Toán Nội Địa</span>
                </label>
              </div>
            </div>
            <div className="radio-form">
              <input id="visa" name="payment" value="visa" onChange={(e) => setPayment(e.target.value)} type="radio" />
              <label htmlFor="visa">
                <img src="/assets/ic-visa.png" alt="" /> <span>Thanh Toán Visa, Jcb, master card</span>
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
