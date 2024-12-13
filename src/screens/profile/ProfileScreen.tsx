import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';  
import IconBack from '../../shared/icon/ic_back.svg';  
import Loading from '../../components/Loading';
import axios from 'axios';
import { API_URL } from '../../shared/util/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }: any) => {
  const [data, setData] = useState()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const email = await AsyncStorage.getItem('userEmail');  
        if (email) {
          const res = await axios.get(`${API_URL}/api/v1/get-user`, {
            params: { email: email }, 
          });

          if (res.data.status === 'success') {
            setData(res.data?.user);
            setEmail(res.data?.user?.email)
            setName(res.data?.user?.name)
            setPhone(res.data?.user?.phone)
            setAddress(res.data?.user?.address)
            
          } else {
            Alert.alert('Không thể tải dữ liệu người dùng');
          }
        } else {
          Alert.alert('Không tìm thấy email người dùng');
        }
      } catch (e) {
        Alert.alert('Đã xảy ra lỗi khi lấy dữ liệu');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);


  const handleSave = () => {
    Alert.alert('Thông báo', 'Thông tin đã được lưu thành công!');
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  



  return (
    isLoading? <Loading /> :
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconBack height={25} width={25}  />  
          </TouchableOpacity>
          <Text style={styles.title}>Thông tin cá nhân</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập email"
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Nhập địa chỉ"
            placeholderTextColor="#888"
          />
        </View>

        <LinearGradient
          colors={['#67E0D3', '#55AAFE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButton}
        >
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu thông tin</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f7f8fc',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,  
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f4f4f4',
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
