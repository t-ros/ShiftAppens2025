import * as React from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useSSO } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const { startSSOFlow } = useSSO()
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
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google'
      })

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId })
        router.replace('/(tabs)')
      }
    } catch (error) {
      console.error('OAuth error:', error)
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#ccc"
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#ccc"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
        <Text style={styles.googleButtonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/sign-in">
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f3b70',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f57c00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#f57c00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#555',
  },
  linkText: {
    color: '#1e88e5',
    fontWeight: '500',
  },
})
