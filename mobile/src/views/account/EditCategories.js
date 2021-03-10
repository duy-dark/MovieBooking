import { useFocusEffect } from "@react-navigation/native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  postCategories
} from "../../redux/users/actions";

const EditCategories = (props) => {
  // const [state, setState] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
//   const categories_favorite = useSelector((state) => state.users.categories_favorite)
  const user = useSelector((state) => state.users.user)
  const categories_favorite = useSelector((state) => state.users.categories_favorite)

  const categories = useSelector((state) => state.users.categories);
  // categories_favorite.map(category_favorite => {
  //     let abc = categories.filter(( category ) => {
  //         return category._id !== category_favorite._id
  //     })
  //     setState([...state, abc])
  // }
  const [isDisaled, setIsDisaled] = useState(true);
  const [selectedItems, setSelectedItems] = useState(categories_favorite)

  useEffect(() => {
    setIsDisaled(!(selectedItems.length > 0));
  }, [selectedItems]);
  let multiSelectRef = useRef(null);
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  const onPress = () => {
    const userInfo = {
      id: user._id,
      favorite_ids: selectedItems,
    };
    dispatch(postCategories(userInfo, props.navigation, 0));
  };
  const indicator = useSelector((state) => state.users.loading);
  if (indicator)
    return (
      <ActivityIndicator
        style={{ alignSelf: "center", marginTop: 200 }}
        size="large"
        color="orangered"
      />
    );
  else
    return (
      <View style={{ padding: 15 }}>
        <MultiSelect
          styleInputGroup={{
            padding: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          styleSelectorContainer={{ borderRadius: 20 }}
          hideTags
          items={categories}
          uniqueKey="_id"
          ref={multiSelectRef}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Chọn loại phim yêu thích"
          searchInputPlaceholderText="Tìm kiếm..."
          tagRemoveIconColor="orangered"
          tagBorderColor="orangered"
          tagTextColor="orangered"
          selectedItemTextColor="orangered"
          selectedItemIconColor="orangered"
          itemTextColor="black"
          displayKey="name"
          searchInputStyle={{ color: "gray", fontSize: 15 }}
          hideSubmitButton
        />
        <View style={{ marginVertical: 15 }}>
          <Button
            title="Xác nhận"
            color="orangered"
            disabled={isDisaled}
            onPress={onPress}
          />
        </View>
        <View>
          {multiSelectRef && multiSelectRef.current &&
            multiSelectRef.current.getSelectedItemsExt &&
            multiSelectRef.current.getSelectedItemsExt(selectedItems)}
        </View>
      </View>
    );
};

export default EditCategories;
