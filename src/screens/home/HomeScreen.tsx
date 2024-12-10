import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import IconWater from '../../shared/icon/ic_water.svg';
import IconMenu from '../../shared/icon/ic_menu.svg';
import IconRed from '../../shared/icon/ic_powerRed.svg';
import IconBlue from '../../shared/icon/ic_powerBlue.svg';
import LinearGradient from 'react-native-linear-gradient';
import HumidityModal from './component/HumidityModal';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [humidity, setHumidity] = useState(60);
  const [isOn, setIsOn] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const togglePower = () => {
    setIsOn(!isOn);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleSaveHumidity = (newHumidity: number) => {
    setHumidity(newHumidity);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconMenu} onPress={openDrawer}>
        <IconMenu width={50} height={50} />
      </TouchableOpacity>

      <View style={styles.progressWrapper}>
        <AnimatedCircularProgress
          size={220}
          width={15}
          fill={humidity}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          padding={10}
          style={styles.progressCircle}
        />
        <View style={styles.humidityWrapper}>
          <View style={{ alignItems: 'center', marginBottom: 5 }}>
            <IconWater width={20} height={20} />
            <Text style={styles.textHumi}>Độ ẩm</Text>
          </View>
          <Text style={styles.humidityText}>{humidity}%</Text>
        </View>
      </View>

      <View style={styles.statusWrapper}>
        <Text style={styles.statusText}>
          {!isOn ? 'Máy bơm đang hoạt động' : 'Máy bơm tắt'}
        </Text>
      </View>

      <TouchableOpacity onPress={togglePower} style={styles.powerButton}>
        {isOn ? <IconBlue width={40} height={40} /> : <IconRed width={40} height={40} />}
      </TouchableOpacity>

      <LinearGradient
        colors={['#67E0D3', '#55AAFE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.setButton}
      >
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.setButtonText}>Cài đặt độ ẩm</Text>
        </TouchableOpacity>
      </LinearGradient>

      <HumidityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveHumidity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    position: 'relative',
  },
  iconMenu: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1,
  },
  progressWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  progressCircle: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  humidityWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 80,
    width: 160,
    height: 160,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  humidityText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  powerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  setButton: {
    height: 50,
    borderRadius: 25,
    marginTop: 80,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  touchableButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  setButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusWrapper: {
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  textHumi: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 1,
  },
});

export default HomeScreen;
