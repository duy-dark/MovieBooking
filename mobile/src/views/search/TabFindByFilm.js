import React, { useState } from 'react'
import { View, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
const TabFindByFilm = () => {
    const [film, setFilm] = useState('')
    return (
        <View style={{paddingHorizontal: 30}}>
            <DropDownPicker
                items={[
                    {label: 'Item 1', value: 'item 1'},
                    {label: 'Item 2', value: 'item 2'},
                ]}
                defaultValue={film}
                containerStyle={{height: 40, marginTop: 20}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setFilm(item.value)}
                placeholder={"Chọn phim"}
            />

            <DropDownPicker
                containerStyle={{height: 40, marginTop: 20}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                placeholder={"Chọn rạp"}
            />

            <DropDownPicker
                containerStyle={{height: 40, marginTop: 20}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                placeholder={"Chọn ngày"}
            />

            <DropDownPicker
                containerStyle={{height: 40, marginVertical: 20}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa', zIndex: 10}}
                placeholder={"Chọn suất"}
            />
            <View style={{zIndex: -1}}>
                <Button title="Mua vé" color="orangered" onPress={() => alert("Mua vé")}/>
            </View>

        </View>
    )
}

export default TabFindByFilm
