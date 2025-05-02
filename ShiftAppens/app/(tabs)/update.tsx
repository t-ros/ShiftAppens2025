import type React from "react"
import { View, Text, StyleSheet } from "react-native"

const UpdatesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Updates</Text>
        <Text style={styles.subText}>No new updates at this time.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf6f0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e1e1e",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#49454f",
    textAlign: "center",
  },
})

export default UpdatesScreen