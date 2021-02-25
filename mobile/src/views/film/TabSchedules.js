import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from '../../styles/views/schedule/tab-schedules'
import CardCinema from '../../components/cinema/CardCinema'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cinema 1',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Cinema 2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Cinema 3',
    },
];

const TabSchedules = (props) => {
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
    
    const renderListCinemas = ({ item }) => <CardCinema navigation={props.navigation} title={item.title} />
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
                renderItem={renderListCinemas}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default TabSchedules
