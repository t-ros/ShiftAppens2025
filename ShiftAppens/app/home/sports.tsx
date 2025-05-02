import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const SportsSelectionScreen: React.FC = () => {
  const router = useRouter();

  const sports: string[] = [
    "Football", "Volleyball", "Basketball", "Tennis", "Baseball",
    "Swimming", "Cricket", "Rugby", "Golf", "Padel",
    "Table Tennis", "Badminton",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#faf6f0" barStyle="dark-content" />

      {/* Botão de Voltar */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {sports.map((sport) => (
          <TouchableOpacity
            key={sport}
            style={styles.sportButton}
            onPress={() => {
              if (sport === 'Volleyball') {
                router.push('/home/reserve_field');
              } else {
                Alert.alert('Indisponível', 'Brevemente');
              }
            }}
          >
            <Text style={styles.sportButtonText}>{sport}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf6f0',
  },
  backButtonContainer: {
    padding: 16,
    backgroundColor: '#f7d9a6',
  },
  backButtonText: {
    fontSize: 16,
    color: '#1e1e1e',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 24,
    gap: 16,
  },
  sportButton: {
    backgroundColor: '#f27405',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sportButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default SportsSelectionScreen;
