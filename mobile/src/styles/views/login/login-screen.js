import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 200,
        height: 100
    },
    buttonFacebook: {
        flexDirection: "row",
        width: 250,
        borderRadius: 10,
        backgroundColor: "#4267B2",
        padding: 15,
        marginVertical: 10
    },
    textFacebook: {
        color: "white",
        marginLeft: 15,
        fontSize: 15
    },
    buttonGoogle: {
        flexDirection: "row",
        width: 250,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 15,
        marginVertical: 10
    },
    iconGoogle: {
        height: 20,
        width: 20,
    },
    textGoogle: {
        marginLeft: 10,
        fontSize: 15,
        color: "black"
    }
});

export default styles