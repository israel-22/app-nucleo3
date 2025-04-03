import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function GameScreen() {
 const [data, setdata] = useState("")
 const getData = async () =>{try  {
  const resp= await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');
  const json = await resp.json();
  setdata(json);
 } catch (error) { 
 }}

useEffect(() => {
  getData();
}, []);

  return (
    <View>
      <Text>Menu</Text>
    <FlatList
      data={data}
      renderItem={({item})=> 
       <Text> Hola </Text>

      }
    />
    
    </View>
  )
}

const styles = StyleSheet.create({})