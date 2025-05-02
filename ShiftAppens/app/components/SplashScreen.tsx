import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // Make sure this exists

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('/assets/logoball.png')} style={styles.ball} />
      <Image source={require('/assets/logotext.png')} style={styles.text} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3D7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    width: 220,
    height: 60,
    resizeMode: 'contain',
  },
});
