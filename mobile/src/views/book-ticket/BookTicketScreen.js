import React from 'react'
import { ScrollView, View, Text, TextInput, Image, Button } from 'react-native'
import styles from '../../styles/views/book-ticket/book-ticket'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BookTicketScreen = () => {
    const iconZalo = {uri: "https://play-lh.googleusercontent.com/F8cUV5oOLjCTMSvSRymK1154MwKalnvkepN4xGrfWBC_tcXvNTq_sEStiwCYV61lRdI"}
    const iconMasterCard = {uri: "https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Master-Card-Blue-icon.png"}
    return (
        <ScrollView style={styles.container}>
            <View style={styles.areaSeats}></View>
            <View style={styles.area}>
                <Text style={styles.nameFilm}>Lừa Đểu Gặp Lừa Đảo</Text>
                <View style={styles.row}>
                    <Text style={styles.age}>C16</Text>
                    <Text style={styles.textGray}>128 phút - 2D - Phụ đề</Text>
                </View>
                <Text style={styles.nameCinema}>BHD Star - Bitexco</Text>
                <View style={styles.row}>
                    <View style={{flex: 1}}>
                        <Text style={styles.textGray}>Ngày chiếu</Text>
                        <Text style={styles.bold}>Hôm nay, 05/02</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <View style={{marginRight: 10}}>
                            <Text style={styles.textGray}>Suất chiếu</Text>
                            <Text style={styles.bold}>16:35</Text>
                        </View>
                        <View>
                            <Text style={styles.textGray}>Rạp/Phòng</Text>
                            <Text style={styles.bold}>Rạp 2</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.areaDisplaySeats}>
                    <View style={{flex: 1}}>
                        <Text style={styles.textGray}>Số ghế</Text>
                        <Text style={styles.seatsText}>Vui lòng chọn ghế</Text>
                    </View>
                    <Text style={[styles.textGray, {flex: 1}]}>Combo</Text>
                </View>
                <View style={styles.areaSumMoney}>
                    <Text style={styles.sumText}>Tổng tiền: </Text>
                    <Text style={styles.moneyText}>0đ</Text>
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
                <View style={styles.row}>
                    <Image style={styles.paymentIcon} source={iconZalo} />
                    <Text style={styles.payment}>Thanh toán qua Zalo</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.paymentIcon} source={iconMasterCard}/>
                    <Text style={styles.payment}>Thanh toán qua MasterCard</Text>
                </View>
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
                <Button title="Mua vé" color="limegreen" onPress={()=>alert("Mua vé")}/>
            </View>
        </ScrollView>
    )
}

export default BookTicketScreen
