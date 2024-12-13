import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Alert,
    Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import axios from 'axios';
import { API_URL } from '../../shared/util/type';

const { height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const postRegister = async () => {
        try {
            const user = { name: name, email: email.toLowerCase(), password: password }
            const res = await axios.post(`${API_URL}/api/v1/register`, user)
            console.log(res.data)
            if (res.data.status == 'error') {
                Alert.alert("Đã có lỗi xảy ra!")
            } 
        } catch (error: any) {
            Alert.alert("Đã có lỗi xảy ra!")
        }
    }
    const validateInputs = () => {
        const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

        if (!name) {
            newErrors.name = 'Vui lòng nhập tên.';
        }

        if (!email) {
            newErrors.email = 'Vui lòng nhập email.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ.';
        }

        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu.';
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const handleRegister = () => {
        if (validateInputs()) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                postRegister();
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }],
                    })
                );
            }, 1500);
        }
    };

    const handleLoginRedirect = () => {
        navigation.navigate(NAVIGATIONS_ROUTE.SCREEN_LOGIN);
    };

    return (
        <ImageBackground
            source={{
                uri: 'https://i.pinimg.com/474x/0f/f1/c5/0ff1c5c5b41308607116e63d2c7e5b1a.jpg',
            }}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.overlayContainer}>
                <View style={styles.container}>
                    <Text style={[styles.title, { color: '#55AAFE' }]}>Đăng ký</Text>

                    <TextInput
                        style={[styles.input, errors.name ? styles.inputError : undefined]}
                        placeholder="Tên"
                        placeholderTextColor="#ccc"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                    />
                    {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                    <TextInput
                        style={[styles.input, errors.email ? styles.inputError : undefined]}
                        placeholder="Email"
                        placeholderTextColor="#ccc"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        keyboardType="email-address"
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                    <TextInput
                        style={[styles.input, errors.password ? styles.inputError : undefined]}
                        placeholder="Mật khẩu"
                        placeholderTextColor="#ccc"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                    <TextInput
                        style={[styles.input, errors.confirmPassword ? styles.inputError : undefined]}
                        placeholder="Xác nhận mật khẩu"
                        placeholderTextColor="#ccc"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                        }}
                    />
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

                    <LinearGradient colors={['#67E0D3', '#55AAFE']} style={styles.button}>
                        <TouchableOpacity onPress={handleRegister} style={styles.buttonTouchable}>
                            {loading ? (
                                <Text style={styles.buttonText}>Đang đăng ký...</Text>
                            ) : (
                                <Text style={styles.buttonText}>Đăng ký</Text>
                            )}
                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Đã có tài khoản? </Text>
                        <TouchableOpacity onPress={handleLoginRedirect}>
                            <Text style={[styles.registerText, { color: '#55AAFE', fontStyle: 'italic' }]}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height,
    },
    backgroundImage: {
        resizeMode: 'cover',
        opacity: 0.8,
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 30,
        borderRadius: 15,
        width: '85%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    button: {
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    buttonTouchable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    registerText: {
        color: '#B0B0B0',
        fontSize: 16,
        marginTop: 15,
    },
});

export default RegisterScreen;
