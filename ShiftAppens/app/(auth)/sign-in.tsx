import * as React from 'react';
import { useRouter } from 'expo-router';
import { useSSO } from '@clerk/clerk-expo';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('OAuth error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
