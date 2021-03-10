import React, { useState, useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStack from "../home/HomeStack";
import CinemaStack from "../cinema/CinemaStack";
import NewsStack from "../news/NewsStack";
import SearchStack from "../search/SearchStack";
import AccountStack from "../account/AccountStack";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../../redux/users/actions";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const io = require("socket.io-client");

const SocketEndpoint = "https://servermoviebooking.herokuapp.com";
// const SocketEndpoint = "https://b4a3cfe22d32.ngrok.io";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(noti) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bạn có thông báo mới 📬",
      body: noti.content,
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SocketEndpoint, {
      transports: ["websocket"],
    });
    dispatch(setSocket(socket));

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    socket.emit("get_notifications", user._id);
    socket.on("revice_data", (res) => {
      res.forEach( async (noti) => 
      await schedulePushNotification(noti)
      )
      console.log("resssssss",res)
    });
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "CinemaStack") {
            iconName = focused ? "videocam" : "videocam-outline";
          } else if (route.name === "NewsStack") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "SearchStack") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "AccountStack") {
            iconName = focused ? "person" : "person-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Khám phá" }}
      />
      <Tab.Screen
        name="CinemaStack"
        component={CinemaStack}
        options={{ title: "Rạp" }}
      />
      <Tab.Screen
        name="NewsStack"
        component={NewsStack}
        options={{ title: "Tin tức" }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{ title: "Tìm kiếm" }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{ title: "Tài khoản" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
