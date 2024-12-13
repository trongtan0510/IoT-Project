import React, { useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/home/HomeScreen';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from './Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../screens/profile/ProfileScreen';
import UpdateScreen from '../screens/profile/IntroScreen';
import GuideScreen from '../screens/profile/Setting';

const { width } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: any) => {
  const [activeItem, setActiveItem] = useState<string>('Trang chủ');

  const handlePress = (screen: string) => {
    setActiveItem(screen);
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }],
        })
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
        onPress={() => handlePress('Giới thiệu')}
        style={[styles.menuItem, activeItem === 'Giới thiệu' && styles.activeMenuItem]}
      >
        <Text style={styles.menuText}>Giới thiệu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Hướng dẫn sử dụng')}
        style={[styles.menuItem, activeItem === 'Hướng dẫn sử dụng' && styles.activeMenuItem]}
      >
        <Text style={styles.menuText}>Hướng dẫn sử dụng</Text>
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
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Giới thiệu"
        component={UpdateScreen}
        options={{ headerShown: true}}
      />
      <Drawer.Screen
        name="Hướng dẫn sử dụng"
        component={GuideScreen}
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
