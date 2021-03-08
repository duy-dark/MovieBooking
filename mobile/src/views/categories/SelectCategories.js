import React, { useState, useRef, useEffect } from 'react'
import { View, ImageBackground, Button, ActivityIndicator } from 'react-native'
import MultiSelect from 'react-native-multiple-select';
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, postCategories } from '../../redux/users/actions';

const SelectCategories = (props) => {
    const imageBackground = { uri: "https://tix.vn/app/assets/img/icons/backapp.jpg" }
    const [selectedItems , setSelectedItems ] = useState([])
    const [isDisaled, setIsDisaled] = useState(true)
    const user = useSelector((state) => state.users.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getCategories())
    }, [])
    useEffect(() => {
        setIsDisaled(!(selectedItems.length > 0))
    }, [selectedItems])
    let multiSelectRef = useRef(null);
    const onSelectedItemsChange = selectedItems => {
        setSelectedItems( selectedItems );
    };
    const onPress = () => {
        const userInfo = {
          id: user._id,
          favorite_ids: selectedItems
        }
        dispatch(postCategories(userInfo, props.navigation, 1))
    }
    const categories = useSelector(state => state.users.categories)
    const indicator = useSelector(state => state.users.loading)
    if(indicator) return <ActivityIndicator style={{alignSelf: 'center', marginTop: 200}} size="large" color="orangered" /> 
    else return (
        <ImageBackground style={{justifyContent: "center" , flex: 1, paddingHorizontal: 50}} source={imageBackground}>
            <MultiSelect    
                styleInputGroup={{padding: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                styleSelectorContainer={{borderRadius: 20}}
                hideTags
                items={categories}
                uniqueKey="_id"
                ref={multiSelectRef}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Chọn loại phim yêu thích"
                searchInputPlaceholderText="Tìm kiếm..."
                tagRemoveIconColor="white"
                tagBorderColor="white"
                tagTextColor="white"
                selectedItemTextColor="orangered"
                selectedItemIconColor="orangered"
                itemTextColor="black"
                displayKey="name"
                searchInputStyle={{ color: "gray", fontSize: 15 }}
                hideSubmitButton
            />
            <View style={{marginVertical: 15}}>
            <Button title="Xác nhận" color="orangered" disabled={isDisaled} onPress={onPress} />
            </View>
            <View>
                {multiSelectRef.current && multiSelectRef.current.getSelectedItemsExt && 
                multiSelectRef.current.getSelectedItemsExt(selectedItems)}
            </View>
        </ImageBackground>
    )
}

export default SelectCategories
