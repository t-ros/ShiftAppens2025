import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const initialTimeSlots = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00',
].map((time, i) => ({
  time,
  status: i % 4 === 0 ? 'disabled' : 'available',
}));

export default function ScheduleScreen() {
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);

  const toggleSelectTime = (index: number) => {
    const updatedSlots = [...timeSlots];
    if (updatedSlots[index].status === 'available') {
      updatedSlots[index].status = 'selected';
    } else if (updatedSlots[index].status === 'selected') {
      updatedSlots[index].status = 'available';
    }
    setTimeSlots(updatedSlots);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/images/pav1.png')}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Reserva de Instalação Desportiva</Text>
        <Text style={styles.subtitle}>Pavilhão 1 - Estádio Universitário</Text>

        <View style={styles.section}>
          <Text style={styles.label}> Data: dd/mm/aaaa</Text>
          <Text style={styles.label}> Selecione o(s) horário(s) para sua atividade:</Text>
        </View>

        <View style={styles.grid}>
          {timeSlots.map(({ time, status }, index) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                status === 'available' && styles.available,
                status === 'selected' && styles.selected,
                status === 'disabled' && styles.disabled,
              ]}
              disabled={status === 'disabled'}
              onPress={() => toggleSelectTime(index)}
            >
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.proceedButton}>
          <Text style={styles.proceedText}>Confirmar Reserva</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefbf7',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c6c6c',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timeButton: {
    width: '23%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  timeText: {
    color: '#fff',
    fontWeight: '600',
  },
  available: {
    backgroundColor: '#4caf50',
  },
  selected: {
    backgroundColor: '#fb8c00',
  },
  disabled: {
    backgroundColor: '#c2c2c2',
  },
  proceedButton: {
    backgroundColor: '#1e88e5',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
