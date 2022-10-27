import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { Card, CardProps } from '../../components/Card';
import { HeaderHome } from '../../components/HeaderHome';
import { useFocusEffect } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import { Button } from '../../components/Button';

export function Home() {
  const [data, setData] = useState<CardProps[]>([]);
  const { getItem, setItem } = useAsyncStorage("@keepass:formData")

  async function handleFetchData(){
    const response = await getItem()
    const data = response ? JSON.parse(response) : []
    setData(data)
    console.log(data)
  }

  async function handleRemove(id: string) {
    const response = await getItem()
    const previousData = response ? JSON.parse(response) : []
    const newData = previousData.filter((item: CardProps) => item.id !== id)
    setItem(JSON.stringify(newData))
    handleFetchData()
  }

  useFocusEffect(useCallback(() => {
    handleFetchData()
  },[]))

  return (
    <View style={styles.container}>
      <HeaderHome />

      <View style={styles.listHeader}>
        <Text style={styles.title}>
          Suas senhas
        </Text>

        <Text style={styles.listCount}>
          {`${data.length} ao total`}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          <Card
            data={item}
            onPress={() => handleRemove(item.id)}
          />
        }
      />

      <View style={styles.footer}>
        <Button
          title="Limpar lista"
        />
      </View>
    </View>
  );
}