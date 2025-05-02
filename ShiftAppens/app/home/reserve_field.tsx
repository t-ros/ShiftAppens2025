"use client"

import type React from "react"
import { useRouter } from 'expo-router';
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  type ImageSourcePropType,
} from "react-native"
import { Feather } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

interface FacilityCardProps {
  id: string
  title: string
  image: ImageSourcePropType
  isFavorited: boolean
  onPress: () => void
  onFavorite: () => void
}

const FacilityCard: React.FC<FacilityCardProps> = ({ id, title, image, isFavorited, onPress, onFavorite }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <TouchableOpacity style={styles.favoriteButton} onPress={onFavorite} activeOpacity={0.7}>
          {isFavorited ? (
            <Feather name="heart" size={20} color="#e91e63" />
          ) : (
            <Feather name="heart" size={20} color="#1e1e1e" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const HomeScreen: React.FC = () => {
  // Sample data with local images for the first two facilities
  const facilitiesData = [
    {
      id: "1",
      title: "Pavilhão 1 - Estádio Universitário",
      image: require("../../assets/images/pav1.png"),
    },
    {
      id: "2",
      title: "Pavilhão 2 - Estádio Universitário",
      image: require("../../assets/images/pav2.png"),
    },
    {
      id: "3",
      title: "Rede Exterior - Estádio Universitário",
      image: { uri: "https://picsum.photos/600/400?random=3" },
    },
  ]

  // State to track favorited facilities
  const [favoritedFacilities, setFavoritedFacilities] = useState<string[]>([])

  // Toggle favorite status
  const toggleFavorite = (facilityId: string) => {
    setFavoritedFacilities((prevFavorites) => {
      if (prevFavorites.includes(facilityId)) {
        // Remove from favorites
        return prevFavorites.filter((id) => id !== facilityId)
      } else {
        // Add to favorites
        return [...prevFavorites, facilityId]
      }
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {facilitiesData.map((facility) => (
          <FacilityCard
            key={facility.id}
            id={facility.id}
            title={facility.title}
            image={facility.image}
            isFavorited={favoritedFacilities.includes(facility.id)}
            onPress={() => console.log(`Pressed ${facility.title}`)}
            onFavorite={() => toggleFavorite(facility.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf6f0",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 24,
    backgroundColor: "white",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  imageContainer: {
    height: 200,
    width: "100%",
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#ffecdb",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
    backgroundColor: "#ffecdb",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e1e1e",
  },
})

export default HomeScreen