import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import CardFilmSchedule from '../../components/film/CardFilmSchedule'
import styles from '../../styles/views/schedule/tab-schedules'
import moment from 'moment'

const days = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7']

const TabScheduleCinema = (props) => {
    const arr = []
    for(let i = 0; i < 7; i++) {
        let date = moment().add(i, 'day')
        if (i == 0) {
            arr.push({
                name: days[date.day()],
                date: date.format('DD-MM-YYYY'),
                day: date.format('DD'),
                dayofweek: date.day(),
                selected: true,
            })
        }
        else {
            arr.push({
                name: days[date.day()],
                date: date.format('DD-MM-YYYY'),
                day: date.format('DD'),
                dayofweek: date.day(),
                selected: false,
            })
        }
    }

    const [schedules, setSchedules] = useState(arr)
    const [DATA, setDATA] = useState(props.dayOfWeeks[0])
    const selectDate = (index) => {
        let updateSchedules = schedules.map((schedule, i) => {
            if(schedule.selected) schedule.selected = false
            else if(i === index) schedule.selected = true 
            return schedule
        })
        setSchedules(updateSchedules)
        setDATA(props.dayOfWeeks[index])
    }  

    const renderListFilms = ({ item }) => <CardFilmSchedule navigation={props.navigation} cinema={props.cinema}film={item} /> 
    const schedulesHeader = (
        <View style={styles.schedules}>
            <View style={{flexDirection: "row"}}>
                {schedules.map((schedule, index) => {
                    if(schedule.selected) {
                        return (
                            <View style={styles.date} key={index}>
                                <Text style={styles.today}>{schedule.name}</Text>
                                <Text style={styles.todayNumber}>{schedule.day}</Text>
                            </View>
                        )
                    }
                    else {
                        return (
                            <TouchableOpacity style={styles.date} key={index} onPress={() => selectDate(index)}>
                                <Text style={styles.day}>{schedule.name}</Text>
                                <Text style={styles.number}>{schedule.day}</Text>
                            </TouchableOpacity>
                        )
                    }
                })}
            </View>
            <Text style={styles.fullToday}>{schedules[0].name}, {schedules[0].date}</Text>
        </View>
    )
    return (
        <SafeAreaView>
           <FlatList
                ListHeaderComponent={schedulesHeader}
                data={DATA}
                renderItem={renderListFilms}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    )
}

export default TabScheduleCinema
