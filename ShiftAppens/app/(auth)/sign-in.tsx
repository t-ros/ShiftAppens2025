import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#FFF5E6' // fundo suave
    }}>
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF7F50' // Coral (laranja suave)
      }}>
        Sign in
      </Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#FFB07C"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{
          width: '100%',
          padding: 12,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#FFA366',
          borderRadius: 8,
          backgroundColor: '#FFF',
          color: '#333'
        }}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#FFB07C"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={{
          width: '100%',
          padding: 12,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#FFA366',
          borderRadius: 8,
          backgroundColor: '#FFF',
          color: '#333'
        }}
      />
      <TouchableOpacity
        onPress={onSignInPress}
        style={{
          backgroundColor: '#FF7F50',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 8,
          marginBottom: 16
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Continue</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 3 }}>
        <Text style={{ color: '#444' }}>Don't have an account? </Text>
        <Link href="/sign-up">
          <Text style={{ color: '#FF7F50', fontWeight: 'bold' }}>Sign up</Text>
        </Link>
      </View>
    </View>
  )
}
