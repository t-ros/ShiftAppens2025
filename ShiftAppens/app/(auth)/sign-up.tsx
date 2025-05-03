import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({ emailAddress, password })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF5E6',
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 16,
          color: '#FF7F50',
        }}>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#FFB07C"
          onChangeText={(code) => setCode(code)}
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
        <TouchableOpacity onPress={onVerifyPress}
          style={{
            backgroundColor: '#FF7F50',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 8,
          }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#FFF5E6',
    }}>
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF7F50',
      }}>
        Sign up
      </Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#FFB07C"
        onChangeText={(email) => setEmailAddress(email)}
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
        secureTextEntry={true}
        placeholderTextColor="#FFB07C"
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
      <TouchableOpacity onPress={onSignUpPress}
        style={{
          backgroundColor: '#FF7F50',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 8,
          marginBottom: 16
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Continue</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 3 }}>
        <Text style={{ color: '#444' }}>Already have an account? </Text>
        <Link href="/sign-in">
          <Text style={{ color: '#FF7F50', fontWeight: 'bold' }}>Sign in</Text>
        </Link>
      </View>
    </View>
  )
}
