import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Switch } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import IconWater from '../../shared/icon/ic_water.svg';
import IconMenu from '../../shared/icon/ic_menu.svg';
import IconRed from '../../shared/icon/ic_powerRed.svg';
import IconBlue from '../../shared/icon/ic_powerBlue.svg';
import LinearGradient from 'react-native-linear-gradient';
import HumidityModal from './component/HumidityModal';
import EventSource from 'react-native-sse';
import axios from 'axios';
import Loading from '../../components/Loading';
import { formatHumidity } from '../../shared/util/format';
import { API_URL } from '../../shared/util/type';
import CustomSwitch from './component/CustomSwitch';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [humidity, setHumidity] = useState(60);
  const [isOn, setIsOn] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const togglePower = () => {
    if (!isAuto) {
      postStatusData();
      setIsOn(!isOn);
    } else {
      Alert.alert("Vui lòng chọn chế độ thủ công để điều khiển!");
    }
  };

  const toggleAutoManual = () => {
    postStatusSwitch();
    setIsAuto(!isAuto);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleSaveHumidity = async (newHumidity: number) => {
    const res = await axios.post(`${API_URL}/api/v1/create-humidity`, { message: newHumidity });
  };

  useEffect(() => {
    const eventSource = new EventSource(`https://iot-server-2dex.onrender.com/api/v1/events`);
    eventSource.addEventListener("open", () => {
      console.log("Open SSE connection.");
    });

    eventSource.addEventListener("message", (event: any) => {
      if (event.data) {
        try {
          const data = JSON.parse(event.data);
          const humidityValue = parseFloat(data.humidity);
          if (!isNaN(humidityValue)) {
            setHumidity(humidityValue);
          } else {
            Alert.alert("Cảnh báo", "Dữ liệu độ ẩm không hợp lệ!");
          }
          setIsLoading(false);
        } catch (err) {
          Alert.alert("Cảnh báo", "Dữ liệu không hợp lệ!");
          setIsLoading(false);
        }
      } else {
        console.warn("Received empty or null data");
        setIsLoading(false);
      }
    });

    eventSource.addEventListener("error", (event: any) => {
      if (event.type === "error") {
        console.error("Lỗi SSE:", event.message);
        Alert.alert("Không thể kết nối tới server!");
        setIsLoading(false);
        eventSource.close();
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    });
    eventSource.addEventListener("close", () => {
      console.log("Close SSE connection.");
    });
    return () => {
      eventSource.close();
    };
  }, []);

  const postStatusData = async () => {
    try {
      setIsRequesting(true)
      if (typeof isOn !== "boolean") {
        throw new Error("Invalid value for 'isOn'. Expected a boolean.");
      }
      const res = await axios.post(`${API_URL}/api/v1/send-mqtt/`, { message: !isOn });
      if (res.data.status == 'error') {
        throw new Error(res.data.message || "Lỗi không xác định từ server.");
      }
      setIsRequesting(false)
    } catch (error: any) {
      Alert.alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsRequesting(false)
    }
  };

  const postStatusSwitch = async () => {
    try {
      setIsRequesting(true)
      if (typeof isAuto !== 'boolean') {
        throw new Error("Invalid value for 'isAuto'. Expected a boolean.");
      }
      const res = await axios.post(`${API_URL}/api/v1/send-status/`, { message: isAuto });
      if (res.data.status === 'error') {
        throw new Error(res.data.message || "Lỗi không xác định từ server.");
      }
      setIsRequesting(false)
    } catch (error: any) {
      Alert.alert("Đã xảy ra lỗi. Vui lòng thử lại.");
      console.error("Error:", error.message || error);
    } finally {
      setIsRequesting(false)
    }
  };

  return (
    isLoading ? <Loading /> :
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconMenu} onPress={openDrawer}>
          <IconMenu width={20} height={20} />
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
            <Text style={styles.humidityText}>{formatHumidity(humidity)}%</Text>
          </View>
        </View>
        <View style={styles.switchWrapper}>
          <TouchableOpacity onPress={togglePower} style={styles.statusBox} disabled={isRequesting}>
            {!isOn ? <IconBlue width={40} height={40} /> : <IconRed width={40} height={40} />}
            <Text style={styles.statusText}>
              {isOn ? 'Máy bơm bật' : 'Máy bơm tắt'}
            </Text>
          </TouchableOpacity>
          <View style={styles.statusBox}>
            <CustomSwitch
              value={isAuto}
              onValueChange={toggleAutoManual}
              disabled={isRequesting}
            />
            <Text style={styles.statusText}>
              {isAuto ? 'Tự động' : 'Thủ công'}
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={['#67E0D3', '#55AAFE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.setButton}
        >
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => {
              if (isAuto) {
                setModalVisible(true);
              } else {
                Alert.alert("Vui lòng chọn chế độ tự động để cài đặt độ ẩm!");
              }
            }}
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
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
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
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
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
  switchWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: width * 0.8,
  },
  statusBox: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    position: 'absolute',
    bottom: 20
  },
  textHumi: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5AA6F0',
    marginTop: 5,
  },
});

export default HomeScreen;
