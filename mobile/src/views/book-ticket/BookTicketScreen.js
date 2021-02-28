import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TextInput, Image, Button, TouchableOpacity } from 'react-native'
import styles from '../../styles/views/book-ticket/book-ticket'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import SeatRow from '../../components/seat/SeatRow'
import { useSelector, useDispatch } from "react-redux";
import { getSeats } from '../../redux/films/actions'
import styles2 from '../../styles/components/seat/seat'

const BookTicketScreen = (props) => {
    const film = props.route.params.film
    const cinema = props.route.params.cinema
    const film_schedule = props.route.params.film_schedule
    const date = moment(film_schedule.time_start).format('DD/MM')
    const time_start = moment(film_schedule.time_start).format('hh:mm')
    const room = film_schedule.room
    
    const iconMomo = {uri: "https://static.mservice.io/img/logo-momo.png"}
    
    const [payment, setPayment] = useState("momo")
    const [seats, setSeats] = useState([])

    const formatMoney = (number) => {
        if (number === 0) return 0
        var number = number / 1000
        return number.toFixed(3)
    }
    const cost = formatMoney(seats.length * 80000)

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
    }
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSeats(film_schedule._id))
    }, [])
    const arrSeatsModel = useSelector((state) => state.films.seats)
    const arrSeatsSelected = useSelector((state) => state.films.seated)

    return (
        <ScrollView style={styles.container}>
            <ScrollView style={styles.areaSeats} contentContainerStyle={{padding: 15, flexDirection: "column"}} horizontal={true}>
                {arrSeatsModel.length > 0 && arrSeatsModel.map((seatRow, index) => 
                    <SeatRow key={index} {...seatRow} seats={seats} selected={seat => selectSeat(seat)} arrSeatsSelected={arrSeatsSelected}/>
                )}
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: 25}}>
                    <View style={{alignItems: "center", marginHorizontal: 10}}>
                        <View style={[styles2.seat, styles2.seatBuyed]}> 
                            <Text style={[styles2.seatImage, styles2.seatBuyedImage]}></Text>
                        </View>
                        <Text>Ghế đã mua</Text>
                    </View>
                    <View style={{alignItems: "center", marginHorizontal: 10}}>
                        <View style={styles2.seat}> 
                            <Text style={styles2.seatImage}></Text>
                        </View>
                        <Text>Ghế Thường</Text>
                    </View>
                    <View style={{alignItems: "center", marginHorizontal: 10}}>
                        <View style={[styles2.seat, styles2.seatVip]}> 
                            <Text style={[styles2.seatImage, styles2.seatVipImage]}></Text>
                        </View>
                        <Text>Ghế Vip</Text>
                    </View>
                    <View style={{alignItems: "center", marginHorizontal: 10}}>
                        <View style={[styles2.seat, styles2.seatTogether]}> 
                            <Text style={[styles2.seatImage, styles2.seatTogetherImage]}></Text>
                        </View>
                        <Text>Ghế Đôi</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.area}>
                <Text style={styles.nameFilm}>{film.name}</Text>
                <View style={styles.row}>
                    {/* <Text style={styles.age}>C16</Text> */}
                    <Text style={styles.textGray}>{film.long_time} phút - {film.digitals}</Text>
                </View>
                <Text style={styles.nameCinema}>{cinema.name}</Text>
                <View style={styles.row}>
                    <View style={{flex: 1}}>
                        <Text style={styles.textGray}>Ngày chiếu</Text>
                        <Text style={styles.bold}>{date}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <View style={{marginRight: 10}}>
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
                    <View style={{flex: 1}}>
                        <Text style={styles.textGray}>Số ghế</Text>
                        <View style={{flexDirection: "row"}}>
                            {seats.map((seat, index) => <Text key={index} style={styles.textSeat}>{seat}</Text>)}
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
                <TextInput style={styles.input} placeholder="Số điện thoại nhận vé" />
                <TextInput style={styles.input} placeholder="Email nhận mã vé" />
            </View>
            <View style={styles.area}>
                <TextInput placeholder="Mã khuyến mãi" />
            </View>
            <Text style={{marginLeft: 15, marginBottom: 5}}>Phương thức thanh toán</Text>
            <View style={styles.area}>
                <TouchableOpacity style={styles.row} onPress={() => setPayment("momo")}>
                    <Image style={styles.paymentIcon} source={iconMomo} />
                    <Text style={styles.payment}>Thanh toán qua Momo</Text>
                    { payment === "momo" &&
                        <Ionicons name="checkmark-circle-outline" size={20} color="green"/>
                    }
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.row} onPress={() => setPayment("mastercard")}>
                    <Image style={styles.paymentIcon} source={iconMasterCard}/>
                    <Text style={styles.payment}>Thanh toán qua MasterCard</Text>
                    { payment === "mastercard" &&
                        <Ionicons name="checkmark-circle-outline" size={20} color="green"/>
                    }
                </TouchableOpacity> */}
            </View>
            <View style={styles.areaNote}>
                <View style={styles.row}>
                    <Ionicons name="alert-circle-outline" color="red" size={15}/>
                    <Text style={{marginLeft: 2}}>Lưu ý</Text>
                </View>
                <Text style={styles.noteText}>Phim dành ho khán giả trên 16 tuổi</Text>
                <Text style={styles.noteText}>Vé đã mua không thể đổi hay trả lại</Text>
                <Text style={styles.noteText}>Khi được yêu cầu, vui lòng xuất trình giấy tờ tùy thân để chứng thực độ tuổi khi xem phim</Text> 
            </View>
            <View style={{padding: 10}}>
                <Button title="Mua vé" color="limegreen" onPress={() => alert("Mua vé")}/>
            </View>
        </ScrollView>
    )
}

export default BookTicketScreen
