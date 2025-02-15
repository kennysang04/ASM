import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator.tsx";
import DetailsScreen from "./src/screens/DetailsScreen.tsx";
import PaymentScreen from "./src/screens/PaymentScreen.tsx";
import SignIn from "./src/access/SignIn.js"
import SignUp from "./src/access/SignUp.js";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Tab" component={TabNavigator} options={{animation: "slide_from_bottom"}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{animation: "slide_from_bottom"}} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{animation: "slide_from_bottom"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App


