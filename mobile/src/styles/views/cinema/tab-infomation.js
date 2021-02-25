import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    image: {
        width: "100%",
        height: 400,
        resizeMode: 'cover'
    },
    nameCinema: {
        fontSize: 20,
        marginVertical: 15,
        paddingHorizontal: 10,
        color: "green"
    },
    areaInfo: {
        padding: 10,
        borderTopWidth: 0.5,
        borderTopColor: 'lightgray'
    },
    row: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 10
    },
    content: {
        color: "darkgray",
        fontSize: 15,
        marginLeft: 5
    }
});

export default styles