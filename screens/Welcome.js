import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text>Welcome</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center'
  },
  logo: {
    width: 125,
    height: 125
  },
  buttonContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center'
  },
});
