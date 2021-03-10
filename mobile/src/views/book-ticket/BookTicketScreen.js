import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/views/book-ticket/book-ticket";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import SeatRow from "../../components/seat/SeatRow";
import { useSelector, useDispatch } from "react-redux";
import {
  getSeats,
  getTicketDetail,
  paymentGateway,
} from "../../redux/films/actions";
import styles2 from "../../styles/components/seat/seat";
import CountDown from "react-native-countdown-component";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

const words = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const validatePhone = (phone) => {
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phone.match(phoneno)
}
const formatMoney = (number) => {
  if (number === 0) return 0;
  var number = number / 1000;
  return number.toFixed(3);
};
let trigger = false;
const BookTicketScreen = (props) => {
  const film = props.route.params.film;
  const cinema = props.route.params.cinema;
  const film_schedule = props.route.params.film_schedule;
  const date = moment(film_schedule.time_start).format("DD/MM");
  const time_start = moment(film_schedule.time_start).format("hh:mm");

  const arrSeatsModel = useSelector((state) => state.films.seats);
  const arrSeatsSelected = useSelector((state) => state.films.seated);
  const room = useSelector((state) => state.films.roomBooking);
  
  // console.log("film_schedule", film_schedule)
  // console.log("iddddd", film_schedule._id);
  const iconMomo = { uri: "https://static.mservice.io/img/logo-momo.png" };

  const [payment, setPayment] = useState("momo");
  const [seats, setSeats] = useState([]);
  const [isSelectBug, setIsSelectBug] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showError, setShowError] = useState(false);

  const [seatHide, setSeatHide] = useState([]);
  // const socket = useSelector((state) => state.users.socket);

  const dispatch = useDispatch();
  useEffect(() => {
    // if (film_schedule && film_schedule.id) {
      // socket.emit("john_room", {
      //   name: film_schedule._id,
      // });
    // }

    dispatch(getSeats(film_schedule._id));
  }, []);
  // if (!trigger) {
  //   socket.emit("john_room", {
  //     name: film_schedule._id,
  //   });
  //   trigger = true;
  // }

  // socket.on("seats_existed", (res) => {
  //   console.log("res", res);
  // alert(res)

  //   setSeatHide([...arrSeatsSelected, ...res]);
  // });

  useEffect(() => {
    setSeatHide([...arrSeatsSelected]);
  }, [arrSeatsSelected]);

  const cost = formatMoney(seats.length * 80000);

  const selectSeat = (seat) => {
    let arrSeat = [...seats];
    if (seats.length <= 10) {
      if (seats.includes(seat)) {
        const arr = [...seats];
        const index = arr.indexOf(seat);
        arr.splice(index, 1);
        arrSeat = [...arr];
        let nameRow = seat.slice(0, 1);
        let indexRowItem = words.indexOf(nameRow);
        let indexValueItem = arrSeatsModel[indexRowItem].rows.indexOf(seat);
        // xoa arrSeat
        if (arrSeatsModel[indexRowItem].types[indexValueItem] === "2-1") {
          let number = +seat.substr(seat.length - 1);
          let name = seat.slice(0, seat.length - 1);
          let numberNext = ++number;
          const index1 = arr.indexOf(name + numberNext);
          arr.splice(index1, 1);
          arrSeat = [...arr];
        } else if (
          arrSeatsModel[indexRowItem].types[indexValueItem] === "2-2"
        ) {
          let number = +seat.substr(seat.length - 1);
          let name = seat.slice(0, seat.length - 1);
          let numberPrev = --number;
          const index1 = arr.indexOf(name + numberPrev);
          arr.splice(index1, 1);
          arrSeat = [...arr];
        }

        setSeats([...arr]);
      } else {
        let nameRow = seat.slice(0, 1);
        let indexRowItem = words.indexOf(nameRow);
        let indexValueItem = arrSeatsModel[indexRowItem].rows.indexOf(seat);
        if (arrSeatsModel[indexRowItem].types[indexValueItem] === "2-1") {
          let number = +seat.substr(seat.length - 1);
          let name = seat.slice(0, seat.length - 1);
          let numberNext = ++number;
          setSeats([...seats, seat, name + numberNext]);
          arrSeat = [...arrSeat, seat, name + numberNext];
        } else if (
          arrSeatsModel[indexRowItem].types[indexValueItem] === "2-2"
        ) {
          let number = +seat.substr(seat.length - 1);
          let name = seat.slice(0, seat.length - 1);
          let numberPrev = --number;
          setSeats([...seats, seat, name + numberPrev]);
          arrSeat = [...arrSeat, seat, name + numberPrev];
        } else {
          setSeats([...seats, seat]);
          arrSeat = [...arrSeat, seat];
        }
      }
    }
    // socket.emit(
    //   "sellect_seat",
    //   {
    //     name: film_schedule._id,
    //   },
    //   arrSeat
    // );
  };

  useEffect(() => {
    if (showError) {
      alert("Không thể chừa trống 1 ghế");
      setShowError(false);
    }
  }, [showError]);
  useEffect(() => {
    let rows={}
    function getRowId(chair){
      return ""+chair.slice(1,chair.length)
    }
    seats.forEach(seat=>{
      const rowName=seat[0]
      rows[rowName]=rows[rowName]?[...rows[rowName],getRowId(seat)]:[getRowId(seat)]
    })
    let invalidChair=false
    const rowNames=Object.keys(rows)
    for(let i=0;i<rowNames.length;i++){
      let rowName=rowNames[i]
      let row=rows[rowName]
      row.sort((a,b)=>(+a)-(+b))
      for(let j=0;j<row.length-1;j++){
        if(+row[j+1]-(+row[j])==2){invalidChair=true;break}
      }
    }

    if(invalidChair) {
      alert("ghe "+seats[seats.length-1]+ " ko hop le")
      setIsSelectBug(true)
    } else {
      setIsSelectBug(false)
    }
  }, [seats]);
  useEffect(() => {
    setDisabledBtn(
      !(
        seats.length > 0 &&
        !isSelectBug &&
        validateEmail(email) &&
        validatePhone(phone) &&
        payment
      )
    );
  }, [seats, email, phone, payment, isSelectBug]);

  const user = useSelector((state) => state.users.user);
  const bookingTicket = (navigation) => {
    const bookingInfo = {
      count: seats.length,
      cost: seats.length * 80000,
      customer_id: user._id,
      film_schedule_id: film_schedule._id,
      seats: seats,
      email: email,
      phone_number: phone,
      payment: "momo",
      voucher_id: null,
      is_mobile: 1,
      film_id: film._id,
      theater_id: cinema._id,
      room_id: film_schedule.room_id
    };
    dispatch(paymentGateway({ params: bookingInfo, Linking, navigation }));
    setDisabledBtn(true);
  };

  const indicator = useSelector((state) => state.films.loading);
  if (indicator)
    return (
      <ActivityIndicator
        style={{ alignSelf: "center", marginTop: 200 }}
        size="large"
        color="orangered"
      />
    );
  else
    return (
      <ScrollView style={styles.container}>
        <ScrollView
          style={styles.areaSeats}
          contentContainerStyle={{ padding: 15, flexDirection: "column" }}
          horizontal={true}
        >
          {arrSeatsModel.length > 0 &&
            arrSeatsModel.map((seatRow, index) => (
              <SeatRow
                key={index}
                {...seatRow}
                seats={seats}
                selected={(seat) => selectSeat(seat)}
                arrSeatsSelected={arrSeatsSelected}
              />
            ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 25,
            }}
          >
            <View style={{ alignItems: "center", marginHorizontal: 10 }}>
              <View style={[styles2.seat, styles2.seatBuyed]}>
                <Text
                  style={[styles2.seatImage, styles2.seatBuyedImage]}
                ></Text>
              </View>
              <Text>Ghế đã mua</Text>
            </View>
            <View style={{ alignItems: "center", marginHorizontal: 10 }}>
              <View style={styles2.seat}>
                <Text style={styles2.seatImage}></Text>
              </View>
              <Text>Ghế Thường</Text>
            </View>
            <View style={{ alignItems: "center", marginHorizontal: 10 }}>
              <View style={[styles2.seat, styles2.seatVip]}>
                <Text style={[styles2.seatImage, styles2.seatVipImage]}></Text>
              </View>
              <Text>Ghế Vip</Text>
            </View>
            <View style={{ alignItems: "center", marginHorizontal: 10 }}>
              <View style={[styles2.seat, styles2.seatTogether]}>
                <Text
                  style={[styles2.seatImage, styles2.seatTogetherImage]}
                ></Text>
              </View>
              <Text>Ghế Đôi</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.area}>
          <Text style={styles.nameFilm}>{film.name}</Text>
          <View style={styles.row}>
            {/* <Text style={styles.age}>C16</Text> */}
            <Text style={styles.textGray}>
              {film.long_time} phút - {film.digitals}
            </Text>
            <View style={{ marginLeft: 30 }}>
              <CountDown
                until={60 * 5}
                size={25}
                onFinish={() => {
                  // socket.emit(
                  //   "sellect_seat",
                  //   {
                  //     name: film_schedule._id,
                  //   },
                  //   []
                  // );
                  props.navigation.goBack();
                }}
                digitStyle={{
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "green",
                  height: 50,
                }}
                digitTxtStyle={{ color: "#1CC625" }}
                timeToShow={["M", "S"]}
                timeLabels={{ m: "MM", s: "SS" }}
              />
            </View>
          </View>
          <Text style={styles.nameCinema}>{cinema.name}</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textGray}>Ngày chiếu</Text>
              <Text style={styles.bold}>{date}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ marginRight: 10 }}>
                <Text style={styles.textGray}>Suất chiếu</Text>
                <Text style={styles.bold}>{time_start}</Text>
              </View>
              <View>
                <Text style={styles.textGray}>Rạp/Phòng</Text>
                <Text style={styles.bold}>{room}</Text>
              </View>
            </View>
          </View>
          <View style={styles.areaDisplaySeats}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textGray}>Số ghế</Text>
              <View style={{ flexDirection: "row" }}>
                {seats.map((seat, index) => (
                  <Text key={index} style={styles.textSeat}>
                    {seat}
                  </Text>
                ))}
              </View>
            </View>
            {/* <Text style={[styles.textGray, {flex: 1}]}>Combo</Text> */}
          </View>
          <View style={styles.areaSumMoney}>
            <Text style={styles.sumText}>Tổng tiền: </Text>
            <Text style={styles.moneyText}>{cost} đ</Text>
          </View>
        </View>
        <View style={styles.area}>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại nhận vé"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email nhận mã vé"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.area}>
          <TextInput placeholder="Mã khuyến mãi" />
        </View>
        <Text style={{ marginLeft: 15, marginBottom: 5 }}>
          Phương thức thanh toán
        </Text>
        <View style={styles.area}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setPayment("momo")}
          >
            <Image style={styles.paymentIcon} source={iconMomo} />
            <Text style={styles.payment}>Thanh toán qua Momo</Text>
            {payment === "momo" && (
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="green"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.areaNote}>
          <View style={styles.row}>
            <Ionicons name="alert-circle-outline" color="red" size={15} />
            <Text style={{ marginLeft: 2 }}>Lưu ý</Text>
          </View>
          <Text style={styles.noteText}>
            Phim dành ho khán giả trên 16 tuổi
          </Text>
          <Text style={styles.noteText}>
            Vé đã mua không thể đổi hay trả lại
          </Text>
          <Text style={styles.noteText}>
            Khi được yêu cầu, vui lòng xuất trình giấy tờ tùy thân để chứng thực
            độ tuổi khi xem phim
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Button
            disabled={disabledBtn}
            title="Mua vé"
            color="limegreen"
            onPress={() => bookingTicket(props.navigation)}
          />
        </View>
      </ScrollView>
    );
};

export default BookTicketScreen;
