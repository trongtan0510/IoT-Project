import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const UpdateScreen = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.goBack(); 
  };

  const handleNotify = () => {
    Alert.alert('Thông báo', 'Các tính năng mới sẽ được cập nhật trong thời gian tới!');
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>
          Chúng tôi đang làm việc để đưa ra các tính năng mới cho ứng dụng. Hãy kiên nhẫn và theo dõi để nhận thông báo về các cập nhật sắp tới.
        </Text>
        <TouchableOpacity style={styles.notifyButton} onPress={handleNotify}>
          <Text style={styles.notifyButtonText}>Thông báo khi có cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#f7f8fc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  notifyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#67E0D3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default UpdateScreen;
