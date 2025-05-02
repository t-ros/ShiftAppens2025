// sign-up.jsx
import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [activities, setActivities] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName: name,
      })

      // Guardar mais dados no metadata público
      await signUp.update({
        unsafeMetadata: {
          location,
          favoriteActivities: activities,
        },
      })

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
        router.replace('/profile') // redireciona para o perfil
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View>
        <Text>Verifica o teu email</Text>
        <TextInput
          value={code}
          placeholder="Código de verificação"
          onChangeText={setCode}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verificar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <Text>Sign up</Text>
      <TextInput
        value={name}
        placeholder="Nome"
        onChangeText={setName}
      />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        onChangeText={setEmailAddress}
      />
      <TextInput
        secureTextEntry
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
      />
      <TextInput
        value={location}
        placeholder="Localização"
        onChangeText={setLocation}
      />
      <TextInput
        value={activities}
        placeholder="Atividades favoritas"
        onChangeText={setActivities}
      />
      <TouchableOpacity onPress={onSignUpPress}>
        <Text>Continuar</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>Já tens conta?</Text>
        <Link href="/sign-in">
          <Text> Sign in</Text>
        </Link>
      </View>
    </View>
  )
}
