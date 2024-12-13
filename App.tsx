import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { NAVIGATIONS_ROUTE } from "./src/navigation/Routes";
import LoginScreen from "./src/screens/login/LoginScreen";
import { DrawerNavigation } from "./src/navigation/DrawerNavigation";
import RegisterScreen from "./src/screens/register/RegisterScreen";
import SplashScreen from "./src/screens/login/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATIONS_ROUTE.SCREEN_SPLASH} screenOptions={{ headerShown: false}}>
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_LOGIN} component={LoginScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SPLASH} component={SplashScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_REGISTER} component={RegisterScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.Drawer_NAVIGATION} component={DrawerNavigation} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

