import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ListGames( props:any) {
  return (
    <TouchableOpacity >

      <Text>{props.name.titulo}</Text>
      <Image 
      source={{ uri: props.name.imagen }}
      style={styles.img} 
      
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    img:{
      width: 100,
      height: 100

    }
})