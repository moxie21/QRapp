import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
		<MaterialCommunityIcons style={{marginTop: 80}} name="qrcode-scan" size={200} color="white" />
        <Text style={styles.title}>Quick Scan</Text>
        <View style={{top: 170, width: '100%',}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.buttonTitle}>Register</Text>
          </TouchableOpacity>
        </View>    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#2F2F31",
	flexDirection: "column",
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  title: {
    color: "#fff",
	fontSize: 25,
	marginTop: 50,
    fontFamily: "Lato_400Regular",
  },
  button: {
	backgroundColor: "#E0E0E5",
    marginTop: 20,
    height: 48,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#000000",
    fontSize: 21,
    fontFamily: "Lato_400Regular",
  },
});
