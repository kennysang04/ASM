import React from "react";
import { StyleSheet,Text, View } from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme.ts";
import { BlurView } from "@react-native-community/blur";
import HomeScreen from "../screens/HomeScreen.tsx";
import CartScreen from "../screens/CartScreen.tsx";
import FavoritesScreen from "../screens/FavoritesScreen.tsx";
import OrderHistoryScreen from "../screens/OrderHistoryScreen.tsx";


import CustomIcon from "../components/CustomIcon.ts";


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}/>
        )
    }}>
      
      <Tab.Screen name="Home" component={HomeScreen} options={
        {
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name="home" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
          )
        }
      }/>
      <Tab.Screen name="Cart" component={CartScreen} options={
        {
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name="cart" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
          )
        }
      }/>
      <Tab.Screen name="Favorite" component={FavoritesScreen} options={
        {
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name="like" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
          )
        }
      }/>
      <Tab.Screen name="History" component={OrderHistoryScreen} options={
        {
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name="bell" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
          )
        }
      }/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: "absolute",
    backgroundColor:COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})

export default TabNavigator
