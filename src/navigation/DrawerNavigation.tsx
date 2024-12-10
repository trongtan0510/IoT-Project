import React, { useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/home/HomeScreen';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from './Routes';

const { width } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: any) => {
  const [activeItem, setActiveItem] = useState<string>('Trang chủ');

  const handlePress = (screen: string) => {
    setActiveItem(screen);
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }],
      })
  );
  };

  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity
        onPress={() => handlePress('Trang chủ')}
        style={[styles.menuItem, activeItem === 'Trang chủ' && styles.activeMenuItem]}
      >
        <Text style={styles.menuText}>Trang chủ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Thông tin cá nhân')}
        style={[styles.menuItem, activeItem === 'Thông tin cá nhân' && styles.activeMenuItem]}
      >
        <Text style={styles.menuText}>Thông tin cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Liên hệ')}
        style={[styles.menuItem, activeItem === 'Liên hệ' && styles.activeMenuItem]}
      >
        <Text style={styles.menuText}>Liên hệ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
        <Text style={[styles.logoutText, activeItem === 'Đăng xuất' && styles.activeMenuItem]}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Trang chủ"
      screenOptions={{
        drawerStyle: {
          width: width * 0.67,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Drawer.Screen
        name="Thông tin cá nhân"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Drawer.Screen
        name="Liên hệ"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Arial',
    color: '#000',
    marginLeft: 10
  },
  activeMenuItem: {
    backgroundColor: '#87CEFA',
    borderRadius: 10,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
