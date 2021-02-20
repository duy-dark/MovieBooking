import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    areaSeats: {
        height: 350,
        backgroundColor: "black",
        marginBottom: 15
    },
    area: {
        margin: 15,
        marginTop: 0,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10
    },
    nameFilm: {
        fontSize: 15
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    age: {
        backgroundColor: "orangered",
        color: "white",
        borderRadius: 2,
        fontSize: 11,
        padding: 2,
        marginRight: 2
    },
    textGray: {
        color: "darkgray",
        fontSize: 13,
    },
    nameCinema: {
        color: "green",
        fontSize: 15,
        fontWeight: "bold"
    },
    bold: {
        fontSize: 15,
        fontWeight: "bold"
    },
    areaDisplaySeats: {
        flexDirection: "row",
        marginBottom: 5,
    },
    seatsText: {
        color: "lightgray", 
        fontSize: 15
    },
    seatsSelected: {
        fontWeight: "bold"
    },
    areaSumMoney: {
        flexDirection: "row",
        paddingTop: 10,
        borderTopWidth: 0.5, 
        borderTopColor: "lightgray",
        justifyContent: "space-between",
        alignItems: "center"
    },
    sumText: {
        fontSize: 15,
        color: "gray"
    },
    moneyText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    input: {
        paddingVertical: 5,
    },
    paymentIcon: {
        width: 30,
        height: 30
    },
    payment: {
        flex: 1,
        fontSize:  15,
        marginLeft: 10,
    },
    areaNote: {
        margin: 15,
        marginTop: 0
    },
    noteText: {
        color: "gray",
        fontSize: 12
    }

});

export default styles