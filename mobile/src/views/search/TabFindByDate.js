import React, { useEffect, useState } from 'react'
import { View, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from "react-redux"
import moment from "moment"


const days = ['chủ nhật', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7']


const TabFindByDate = (props) => {

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
        console.log('qwfiquwgfqwgfqw', isDisabled)
    }, [isDisabled])

    useEffect(() => {
        setIsDisabled(!(selectFilm && selectThreater && selectDate && selectTime));
    }, [selectFilm, selectThreater, selectDate, selectTime])

    useEffect(() => {
        if (search) {
            let arr = [];
            // eslint-disable-next-line
            search.dayOfWeek.map(val => {
                val.schedules.map(schedule => arr.push(schedule))
            })
            if (selectFilm) {
                let arrTemp = selectDate.schedules.filter(val => val.film_id === selectFilm._id)
                let arrTemp1 = arrTemp.map(val => val.theater_id)
                let arrTheater = arrTemp1.filter((item, index) => arrTemp1.indexOf(item) === index)
                let option = search.theaters.filter(val => arrTheater.includes(val._id))
                setOptionTheater(option.map(val => ({ ...val, label: val.name, value: val._id })))
                // setSelectFilm()
                setSelectThreater()
                setSelectTime()

            }
        }
    }, [selectFilm])
    useEffect(() => {
        if (selectDate && selectThreater) {
            let arrTime = selectDate?.schedules.filter(schedule => schedule.film_id === selectFilm._id && schedule.theater_id === selectThreater._id)
            setOptionTime(arrTime.map(val => ({ ...val, label: formatTime(val.time_start) + '~' + formatTime(val.time_end), value: val._id })))
            setSelectTime()
        }
    }, [selectThreater])

    useEffect(() => {
        if (selectDate) {
            let arrTemp = selectDate.schedules.map(val => val.film_id)
            let arrFilm = arrTemp.filter((item, index) => arrTemp.indexOf(item) === index)
            let option = search.films.filter(val => arrFilm.includes(val._id))
            setOptionFilm(option.map(val => ({ ...val, label: val.name, value: val._id })))
            setSelectFilm()
            setSelectThreater()
            // eslint-disable-next-line
            setSelectTime()
        }
    }, [selectDate])

    useEffect(() => {
        if (search) {
            setOptionDate(search.dayOfWeek.map((val, index) => ({ ...val, label: days[moment(val.date).day()], value: index })))
        }
    }, [search])

    return (
        <View style={{ paddingHorizontal: 30 }}>
            <DropDownPicker
                items={optionDate}
                //defaultValue={selectDate}
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
                items={optionFilm}
                //controller={instance => controllerFilm = instance}
                value={selectFilm}
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
                items={optionTheater}
                //value={selectThreater}
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
                items={optionTime}
                //value={selectTime}
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

export default TabFindByDate
