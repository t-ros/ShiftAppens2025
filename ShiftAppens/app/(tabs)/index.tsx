import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Screen = 'Home' | 'City';

const cities = [
  {
    name: 'Coimbra',
    image: 'https://images.unsplash.com/photo-1635893312205-6abda7db17a0?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Lisboa',
    image: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Porto',
    image: 'https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=1932&auto=format&fit=crop',
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('Home');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const router = useRouter();

  const renderScreen = () => {
    switch (screen) {
      case 'Home':
        return (
          <View style={styles.container}>
            <View style={styles.header} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {cities.map((city, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => {
                    if (city.name === 'Coimbra') {
                      router.push('/home/sports');
                    } else {
                      setSelectedCity(city.name);
                      setScreen('City');
                    }
                  }}
                >
                  <Image source={{ uri: city.image }} style={styles.image} />
                  <Text style={styles.cityName}>{city.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );

      case 'City':
        return (
          <View style={styles.container}>
            <View style={[styles.header, { justifyContent: 'flex-start' }]}>
              <TouchableOpacity onPress={() => setScreen('Home')}>
                <Ionicons name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.screenCenter}>
              <Text style={styles.cityTitle}>Welcome to {selectedCity}!</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#B3D7FF' },
  header: {
    flexDirection: 'row',
    padding: 16,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FBE9D0',
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cityName: {
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  screenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
