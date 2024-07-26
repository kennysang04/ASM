import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Đăng Ký Thành Công');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email đã tồn tại');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Địa chỉ email không phù hợp');
        }

        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visible}
        />
        <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eyeIcon}>
          <Icon name={visible ? 'eye-off' : 'eye'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Button title="Sign Up" onPress={handleSignUp} />
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signInText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
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

export default SignUp;
