import React from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../styles/views/account/tab-account'

const TabAccount = () => {
    const avatar = { uri: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/132855827_3327445237361772_7305091957233836118_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=s4r_8MOLOXUAX8g3h5y&_nc_ht=scontent.fsgn5-3.fna&oh=8893babdf97583fefc92305155f30638&oe=603880DE" }
    const logoUni = { uri: "https://truyenthongdaiphuc.files.wordpress.com/2015/09/dai_hoc_khoa_hoc_tu_nhien_dhqg-hcm.png" }
    const logo = { uri: "https://s3img.vcdn.vn/123phim/2020/03/d1e6bd560daa9e20131ea8a0f62e87f8.png" }
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.user}>
                <Image style={styles.avatar} source={avatar} />
                <View style={{flex: 1}}>
                    <Text style={styles.name}>Sơn Hứa</Text>
                    <Text style={styles.note}>Chạm để thêm số điện thoại</Text>
                </View>
                <Ionicons style={styles.icon} name="chevron-forward-outline" size={15} color="black"/>
            </TouchableOpacity>
            <View>
                <Text style={styles.titleArea}>Về Ứng Dụng</Text>
                <View style={styles.area}>
                    <TouchableOpacity style={styles.row}>
                        <Text>Thỏa thuận sử dụng</Text>
                        <Ionicons style={styles.icon} name="chevron-forward-outline" size={15} color="gray"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text>Chính sách bảo mật</Text>
                        <Ionicons style={styles.icon} name="chevron-forward-outline" size={15} color="gray"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text>Những câu hỏi thường gặp</Text>
                        <Ionicons style={styles.icon} name="chevron-forward-outline" size={15} color="gray"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.hotline}>
                        <Text style={{ color: "darkgray", fontSize: 13 }}>Hotline</Text>
                        <Text>1900 1900</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <Image style={styles.logoUni} source={logoUni}/>
                <Text style={{ marginBottom: 10 }}>SẢN PHẨM CỦA SINH VIÊN ĐH KHTN TP HCM</Text>
                <Text style={styles.contentFooter}>Địa chỉ: 227 Nguyễn Văn Cừ, Quận 5, Thành phố Hồ Chí Minh</Text>
                <Text style={styles.contentFooter}>Số điện thoại (Hotline): 1900 1900</Text>
                <Text style={styles.contentFooter}>Email: support@svkhtn.vn</Text>
                <Image style={styles.logo} source={logo} />
            </View>
        </ScrollView>
    )
}

export default TabAccount
