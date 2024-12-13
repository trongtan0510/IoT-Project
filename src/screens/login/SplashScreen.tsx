import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';

const SplashScreen = ({ navigation }: any) => {
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                if (email !== null) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: NAVIGATIONS_ROUTE.Drawer_NAVIGATION }],
                        })
                    );
                } else {
                    console.log("User chưa đăng nhập");
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }],
                        })
                    ); 
                }
            } catch (error) {
                console.log("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
            }
        };

        checkLoginStatus();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={'#00e0ff'} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default SplashScreen;
