import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { NAVIGATIONS_ROUTE } from "./src/navigation/Routes";
import LoginScreen from "./src/screens/login/LoginScreen";
import { DrawerNavigation } from "./src/navigation/DrawerNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATIONS_ROUTE.SCREEN_LOGIN} screenOptions={{ headerShown: false}}>
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_LOGIN} component={LoginScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.Drawer_NAVIGATION} component={DrawerNavigation} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

