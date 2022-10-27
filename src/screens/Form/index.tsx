import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import uuid from 'react-native-uuid'

import { styles } from './styles'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { HeaderForm } from '../../components/HeaderForm'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

export function Form() {
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  const { getItem, setItem } = useAsyncStorage("@keepass:formData")

  async function handleSubmit(){
    try {
      const id = uuid.v4()
      const formData = {
        id,
        name,
        user,
        password
      }

      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []

      const data = [...previousData, formData]
  
      await setItem(JSON.stringify(data))

      Toast.show({
        type: 'success',
        text1:'Success!'
    })
      console.log(data)
    } catch (error) {
      console.log(error)
      Toast.show({
          type: 'error',
          text1:'Failed!'
      })
    }

  }
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <Input
              label="Nome do serviço"
              onChangeText={setName}
            />
            <Input
              label="E-mail ou usuário"
              autoCapitalize="none"
              onChangeText={setUser}
            />
            <Input
              label="Senha"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}