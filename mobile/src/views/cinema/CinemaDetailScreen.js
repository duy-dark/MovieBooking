import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabScheduleCinema from './TabScheduleCinema'
import TabInfoCinema from './TabInfoCinema'
import { useSelector, useDispatch } from "react-redux";
import { getCinemaDetails } from '../../redux/cinemas/action'

const Tab = createMaterialTopTabNavigator();

const CinemaDetailScreen = (props) => {
  const idCinema = props.route.params.idCinema
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getCinemaDetails(idCinema))
  }, [])

  const cinema = useSelector((state) => state.cinemas.cinemaDetails);
  const dayOfWeeks = useSelector((state) => state.cinemas.dayOfWeeks);
  
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: "orangered",
        inactiveTintColor: "darkgray",
        labelStyle: { fontSize: 11 },
        indicatorStyle: { backgroundColor: "orangered" },
      }}
    >
      <Tab.Screen name="TabScheduleCinema" options={{title: "Lịch Chiếu"}}>
        {() => <TabScheduleCinema cinema={cinema} dayOfWeeks={dayOfWeeks} navigation={props.navigation} />}
      </Tab.Screen>
      <Tab.Screen name="TabInfoCinema" options={{title: "Thông Tin"}}>
        {() => <TabInfoCinema cinema={cinema} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default CinemaDetailScreen
