import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Define tab type for type safety
type TabType = 'explore' | 'reservations' | 'updates';

const SportsSelectionScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('explore');

  const sports: string[] = [
    "Football",
    "Volleyball",
    "Basketball",
    "Tennis",
    "Baseball",
    "Swimming",
    "Cricket",
    "Rugby",
    "Golf",
    "Padel",
    "Table Tennis",
    "Badminton",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#faf6f0" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <View style={styles.profileIcon}>
          <Icon name="user" size={24} color="#1e1e1e" />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {sports.map((sport) => (
          <TouchableOpacity key={sport} style={styles.sportButton}>
            <Text style={styles.sportButtonText}>{sport}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('explore')}
        >
          <View style={[
            styles.iconContainer, 
            activeTab === 'explore' && styles.activeIconContainer
          ]}>
            <Icon name="map-pin" size={24} color="#1e1e1e" />
          </View>
          <Text style={[
            styles.tabText, 
            activeTab === 'explore' && styles.activeTabText
          ]}>
            Explore
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('reservations')}
        >
          <Icon name="bookmark" size={24} color="#1e1e1e" />
          <Text style={[
            styles.tabText, 
            activeTab === 'reservations' && styles.activeTabText
          ]}>
            My Reservations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('updates')}
        >
          <Icon name="bell" size={24} color="#1e1e1e" />
          <Text style={[
            styles.tabText, 
            activeTab === 'updates' && styles.activeTabText
          ]}>
            Updates
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf6f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7D9A6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#1e1e1e',
    borderRadius: 4,
    marginRight: 4,
  },
  profileIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
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
  footer: {
    backgroundColor: '#f7d9a6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    paddingBottom: 20, // Extra padding for iOS home indicator
  },
  tabItem: {
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
  },
  activeIconContainer: {
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    marginTop: 4,
    color: '#1e1e1e',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
});

export default SportsSelectionScreen;