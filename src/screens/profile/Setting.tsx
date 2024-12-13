import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { CommonActions } from '@react-navigation/native';

const GuideScreen = ({ navigation }: any) => {
  const handleNext = () => {
    navigation.dispatch(CommonActions.goBack)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hướng dẫn sử dụng</Text>
      <Text style={styles.description}>Ứng dụng này giúp bạn theo dõi độ ẩm đất và tự động điều khiển máy bơm tưới tiêu.</Text>
      
      <Text style={styles.stepTitle}>Bước 1: Theo dõi độ ẩm</Text>
      <Text style={styles.description}>Kiểm tra độ ẩm đất theo thời gian thực. Khi độ ẩm giảm xuống dưới mức cài đặt, máy bơm sẽ tự động kích hoạt.</Text>
      
      <Text style={styles.stepTitle}>Bước 2: Điều khiển máy bơm</Text>
      <Text style={styles.description}>Bạn có thể điều chỉnh mức độ tưới tiêu hoặc bật/tắt máy bơm theo nhu cầu.</Text>

      <LinearGradient
        colors={['#67E0D3', '#55AAFE']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} 
        style={styles.button}
      >
        <TouchableOpacity onPress={handleNext} style={styles.buttonContent}>
          <Text style={styles.buttonText}>Bắt đầu sử dụng</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f8fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GuideScreen;
