import React, { useEffect, useState } from 'react'
import { View, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from "react-redux"
import moment from "moment"

const days = ['chủ nhật', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7']


const TabFindByCinema = (props) => {
    const search = useSelector((state) => state.films.search);
    const formatTime = (time) => {
        return moment(time).format('hh-mm')
    }
    const [selectFilm, setSelectFilm] = useState();
    const [selectThreater, setSelectThreater] = useState();
    const [selectDate, setSelectDate] = useState();
    const [selectTime, setSelectTime] = useState();

    const [optionFilm, setOptionFilm] = useState([]);
    const [optionTheater, setOptionTheater] = useState([]);
    const [optionDate, setOptionDate] = useState([]);
    const [optionTime, setOptionTime] = useState([]);

    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setIsDisabled(!(selectFilm && selectThreater && selectDate && selectTime));
    }, [selectFilm, selectThreater, selectDate, selectTime])

    useEffect(() => {
        if (search) {
            if (selectFilm) {
                let arrDate = search.dayOfWeek.filter(val => {
                    if (val.schedules.filter(schedule => schedule.film_id === selectFilm._id && schedule.theater_id === selectThreater._id).length > 0) return val
                })
                setOptionDate(arrDate.map((val, index) => ({ ...val, label: days[moment(val.date).day()], value: index })))
                setSelectDate()
                setSelectTime()
            }
        }
    }, [selectFilm])

    useEffect(() => {
        if (search) {
            let arr = [];
            // eslint-disable-next-line
            search.dayOfWeek.map(val => {
                val.schedules.map(schedule => arr.push(schedule))
            })
            if (selectThreater) {
                let arrFilm = arr.filter(val => val.theater_id === selectThreater._id)
                let option = search.films.filter(val => arrFilm.filter(o => o.film_id === val._id).length > 0)
                setOptionFilm(option.map(val => ({ ...val, label: val.name, value: val._id })))
                setSelectFilm()
                setSelectDate()
                setSelectTime()
            }
        }
    }, [selectThreater])

    useEffect(() => {
        if (selectDate) {
            let arrTime = selectDate.schedules.filter(schedule => schedule.film_id === selectFilm._id && schedule.theater_id === selectThreater._id)
            setOptionTime(arrTime.map(val => ({ ...val, label: formatTime(val.time_start) + '~' + formatTime(val.time_end), value: val._id })))
            setSelectTime()
        }
    }, [selectDate])

    useEffect(() => {
        if (search) {
            setOptionTheater(search.theaters.map(val => ({ ...val, label: val.name, value: val._id })))
        }
    }, [search])

    return (
        <View style={{ paddingHorizontal: 30 }}>
            <DropDownPicker
                items={optionTheater}
                //defaultValue={optionFilm[0]}
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownMaxHeight={300}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => setSelectThreater(item)}
                placeholder={"Chọn rạp"}
            />
            <DropDownPicker
                items={optionFilm}
                //defaultValue={optionFilm[0]}
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownMaxHeight={300}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => setSelectFilm(item)}
                placeholder={"Chọn phim"}
                selectedLabelLength={35}
            />



            <DropDownPicker
                items={optionDate}
                //defaultValue={optionFilm[0]}
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownMaxHeight={300}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => setSelectDate(item)}
                placeholder={"Chọn ngày"}
            />

            <DropDownPicker
                items={optionTime}
                //defaultValue={optionFilm[0]}
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownMaxHeight={300}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => setSelectTime(item)}
                placeholder={"Chọn suất"}
            />
            <View style={{ zIndex: -1, marginTop: 50 }}>
                <Button disabled={isDisabled} title="Mua vé" color="orangered" onPress={() => 
                    props.navigation.navigate("BookTicketScreen", {
                        film: selectFilm,
                        cinema: selectThreater,
                        film_schedule: selectTime
                    })} />
            </View>

        </View>
    )
}

export default TabFindByCinema
