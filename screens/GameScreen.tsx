import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListGames from '../components/ListGames';

export default function GameScreen() {

  
 const [data, setdata] = useState("")
 const getData = async () =>{try  {
  const resp= await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');
  const json = await resp.json();
  setdata(json.videojuegos);
 } catch (error) { 
 }}

useEffect(() => {
  getData();
}, []);

  return (
    <View>
      <Text>Juegos</Text>
    <FlatList
      data={data}
      renderItem={({item})=> 
      <ListGames name={item}/>

      }
    />
    
    </View>
  )
}

const styles = StyleSheet.create({})