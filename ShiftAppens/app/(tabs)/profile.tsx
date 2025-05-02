import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function App() {
  // Profile data
  const profileData = {
    name: "Zeca Afonso",
    username: "@zecaafonso",
    commonConnections: 5,
    location: "Coimbra",
    stats: [
      { label: "Connections", value: 32 },
      { label: "Hosted activities", value: 10 },
      { label: "Participations", value: 24 },
      { label: "Interactions", value: 564 },
    ],
    favoriteActivities: "Volleyball, Football & Tennis",
    favoriteSpot: "Pavilhão 2 - Estádio Universitário",
  };

  // Navigation items
  const navItems = [
    { label: "Explore", icon: "explore", active: true },
    { label: "My Reservations", icon: "calendar-today", active: false },
    { label: "Updates", icon: "notifications", active: false },
  ];
  

  return (
<SafeAreaView style={styles.container}>
  <ScrollView style={styles.scrollView}>
    {/* Top App Bar - REMOVIDO */}
    {/* <View style={styles.topBar}>
      <Feather name="more-horizontal" size={24} color="black" />
      <View style={styles.avatar}>
        <Feather name="user" size={24} color="black" />
      </View>
    </View> */}

    {/* Resto do conteúdo */}

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImage}>
            <Image
              source={require('../../assets/images/logoprofile.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.username}>{profileData.username}</Text>
            <Text style={styles.connections}>
              Common Connections: {profileData.commonConnections}
            </Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={18} color="black" />
              <Text style={styles.location}>{profileData.location}</Text>
            </View>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal style={styles.achievementsRow}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.achievementBadge}>
                {index === 5 && (
                  <Feather name="more-horizontal" size={24} color="black" />
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Profile Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Stats</Text>
          {profileData.stats.map((stat, index) => (
            <Text key={index} style={styles.statText}>
              {stat.label}: {stat.value}
            </Text>
          ))}
        </View>

        {/* Favourite Activities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Activities</Text>
          <Text style={styles.text}>{profileData.favoriteActivities}</Text>
        </View>

        {/* Favourite Spot Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Spot</Text>
          <View style={styles.spotCard}>
            <Image
              source={require('../../assets/images/pav2.png')}
              style={styles.spotImage}
            />
            <View style={styles.spotLabel}>
              <Text style={styles.spotText}>{profileData.favoriteSpot}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navItems.map((item, index) => (
          <View key={index} style={styles.navItem}>
            <View style={[styles.navIcon, item.active && styles.activeNavIcon]}>
             
            </View>
            <Text style={styles.navLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf6f0',
  },
  scrollView: {
    flex: 1,
  },
  topBar: {
    height: 78,
    backgroundColor: '#f7d9a6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#faf6f0',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b2b2b',
  },
  username: {
    fontSize: 18,
    color: '#2b2b2b',
    marginTop: 5,
  },
  connections: {
    fontSize: 18,
    color: '#2b2b2b',
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    fontSize: 18,
    color: '#2b2b2b',
    marginLeft: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b2b2b',
    marginBottom: 15,
  },
  achievementsRow: {
    flexDirection: 'row',
  },
  achievementBadge: {
    width: 54,
    height: 54,
    backgroundColor: '#ffecdb',
    borderRadius: 27,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  statText: {
    fontSize: 18,
    color: '#6c6c6c',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#6c6c6c',
  },
  spotCard: {
    height: 189,
    borderRadius: 8,
    overflow: 'hidden',
  },
  spotImage: {
    width: '100%',
    height: '100%',
  },
  spotLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffecdb',
    padding: 12,
    elevation: 4,
  },
  spotText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2b2b2b',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#f7d9a6',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    padding: 8,
  },
  activeNavIcon: {
    backgroundColor: '#faf6f0',
    borderRadius: 16,
  },
  navLabel: {
    fontSize: 12,
    color: '#2b2b2b',
    marginTop: 4,
  },
});