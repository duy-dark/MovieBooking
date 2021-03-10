import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eeeeee"
    },
    user: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        margin: 10
    },
    name: {
        fontWeight: "bold",
        fontSize: 17
    },
    note: {
        fontSize: 13,
        color: "gray"
    },
    icon: {
        marginRight: 10
    },
    titleArea: {
        fontSize: 14,
        color: "gray",
        margin: 10
    },
    area: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "lightgray",
        marginHorizontal: 10,
        borderRadius: 5,
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        paddingVertical: 15
    },
    hotline: {
        padding: 10,
    },
    footer: {
       alignItems: "center",
       paddingHorizontal: 20
    },
    logoUni: {
        height: 60,
        width: 70,
        marginVertical: 20
    },
    contentFooter: {
        fontSize: 13,
        color: "gray",
        textAlign: "center"
    },
    logo: {
        height: 50,
        width: 130,
        marginVertical: 20
    },
    discount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "white",
        paddingHorizontal: 10, 
        marginTop: 15, 
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        
    },
    iconDiscount: {
        height: 20,
        width: 20,
        marginRight: 10
    }

});

export default styles