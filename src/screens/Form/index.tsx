import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import uuid from 'react-native-uuid'

import { styles } from './styles'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { HeaderForm } from '../../components/HeaderForm'

export function Form() {
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(){
    const id = uuid.v4()
    const data = {
      id,
      name,
      user,
      password
    }

    console.log(data)

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