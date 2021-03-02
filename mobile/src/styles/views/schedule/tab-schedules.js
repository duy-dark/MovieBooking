import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    schedules: {
        backgroundColor: "white",
        alignItems: "center",
        paddingVertical: 10
    },
    date: {
        alignItems: "center",
        paddingHorizontal: 13,
    },
    today: {
        color: "orangered",
        fontSize: 13
    },
    todayNumber: {
        backgroundColor: "orangered",
        width: 20,
        height: 20,
        borderRadius: 50,
        textAlign: "center",
        color: "white",
        marginTop: 5
    },
    day: {
        color: "gray"
    },
    number: {
        marginTop: 5
    },
    fullToday: {
        marginTop: 5,
        color: "darkgray"
    }
});

export default styles