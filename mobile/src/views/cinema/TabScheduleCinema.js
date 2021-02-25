import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import CardFilmSchedule from '../../components/film/CardFilmSchedule'
import styles from '../../styles/views/schedule/tab-schedules'
const DATA = [  
    {id: '1', key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
    time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},
    {id: '2', key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
    time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},
    {id: '3', key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
    time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},
    {id: '4', key1: 'Lừa Đểu Gặp Lừa Đảo',key2:'C18',key3:'128 phút',key4:'2D - Phụ Đề',
    time:[{start:'21:45',end:'23:15'},{start:'21:45',end:'23:15'}]},                  
]

const TabScheduleCinema = (props) => {
    const arrayDefault = [
        {
            day: "Hôm nay",
            dayNumber: 4,
            selected: true
        },
        {
            day: "Th 6",
            dayNumber: 5,
            selected: false
        },
        {
            day: "Th 7",
            dayNumber: 6,
            selected: false
        },
        {
            day: "CN",
            dayNumber: 7,
            selected: false
        },
        {
            day: "Th 2",
            dayNumber: 8,
            selected: false
        },
        {
            day: "Th 3",
            dayNumber: 9,
            selected: false
        },

    ]
    const [schedules, setSchedules] = useState(arrayDefault)
    const selectDate = (index) => {
        let updateSchedules = schedules.map((schedule, i) => {
            if(schedule.selected) schedule.selected = false
            else if(i === index) schedule.selected = true 
            return schedule
        })
        setSchedules(updateSchedules)
    }  
    useEffect(() => {
        // DATA = []
        // update DATA
    }, [schedules])
    const renderListFilms = ({ item }) => <CardFilmSchedule navigation={props.navigation} item={item} /> 
    const schedulesHeader = (
        <View style={styles.schedules}>
            <View style={{flexDirection: "row"}}>
                {schedules.map((schedule, index) => {
                    if(schedule.selected) {
                        return (
                            <View style={styles.date} key={index}>
                                <Text style={styles.today}>{schedule.day}</Text>
                                <Text style={styles.todayNumber}>{schedule.dayNumber}</Text>
                            </View>
                        )
                    }
                    else {
                        return (
                            <TouchableOpacity style={styles.date} key={index} onPress={() => selectDate(index)}>
                                <Text style={styles.day}>{schedule.day}</Text>
                                <Text style={styles.number}>{schedule.dayNumber}</Text>
                            </TouchableOpacity>
                        )
                    }
                })}
            </View>
            <Text style={styles.fullToday}>Hôm nay, 4 tháng 2, 2021</Text>
        </View>
    )
    return (
        <SafeAreaView>
           <FlatList
                ListHeaderComponent={schedulesHeader}
                data={DATA}
                renderItem={renderListFilms}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default TabScheduleCinema
