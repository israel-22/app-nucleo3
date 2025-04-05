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
    <View style={styles.container}>
      <Text style={styles.title}>Juegos</Text>
    <FlatList
      data={data}
      renderItem={({item})=> 
      <ListGames name={item}/>

      }
    />
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
  
    backgroundColor:'rgb(78, 78, 89)',
    flex: 1,

  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ffe0',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Courier New',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
})