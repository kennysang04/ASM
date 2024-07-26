import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

const SignIn = ({ navigation }) => {
    const navigate = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [visible, setVisible] = useState(false)

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    const handleSignIn = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Đăng nhập thành công');
                navigate.navigate("Tab")
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    console.log('Địa chỉ email không hợp lệ');
                } else if (error.code === 'auth/user-not-found') {
                    console.log('Người dùng không tồn tại');
                } else if (error.code === 'auth/wrong-password') {
                    console.log('Sai mật khẩu');
                } else {
                    console.log(error);
                }
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input,{flex:1}]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!visible}
                />
                <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eyeIcon}>
                    <Icon name={visible ? 'eye-off' : 'eye'} size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <Button title="Sign In" onPress={handleSignIn} />
            <Button
                title="Không có tài khoản? Đăng Ký"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f7f7f7',
      },
      title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
      },
      input: {
        height: 48,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 16,
        backgroundColor: '#fff',
      },
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      eyeIcon: {
        position: 'absolute',
        right: 10,
        top:14
      },
      signInText: {
        marginTop: 16,
        textAlign: 'center',
        color: '#007bff',
      },
});

export default SignIn;
