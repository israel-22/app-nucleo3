import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function ListGames( props:any) {

  const [modalVisible, setModalVisible] = useState(false);

  // Función para calcular el promedio de puntuaciones
  const getAverageRating = (opiniones: any) => {
    let totalPuntos = 0;
    let totalResenias = 0;

    if (opiniones.opiniones_positivas) {
      opiniones.opiniones_positivas.detalles.forEach((opinion: any) => {
        totalPuntos += opinion.detalles_usuario.puntuacion;
        totalResenias++;
      });
    }

    if (opiniones.opiniones_negativas) {
      opiniones.opiniones_negativas.detalles.forEach((opinion: any) => {
        totalPuntos += opinion.detalles_usuario.puntuacion;
        totalResenias++;
      });
    }

    return totalResenias > 0 ? totalPuntos / totalResenias : 0; 
  };

  const averageRating = getAverageRating(props.name.opiniones);

  // Función para renderizar estrellas
  const renderStars = (rating: number) => {
    if (!rating || isNaN(rating)) return <Text style={{ color: '#ccc' }}>Sin calificación</Text>; 

    const stars = [];
    const roundedRating = Math.round(rating * 10) / 10;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={`full-${i}`} name="star" size={20} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={20} color="#FFD700" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={20} color="#ccc" />);
    }

    return stars;
  };


  return (
    <View style={styles.container} >
    <TouchableOpacity  onPress={() => setModalVisible(true)} >

      <Image source={{ uri: props.name.imagen }} style={styles.img}/>
      <View style={styles.infoContainer} >
      <Text style={styles.details}>codigo :{props.name.id}</Text>
      <Text style={styles.title}>{props.name.titulo}</Text>
      <Text style={styles.details}>🎮{props.name.plataforma}</Text>
      <Text style={styles.details}>📅 {props.name.lanzamiento}</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.details}>{props.name.puntuacion}</Text>
        <View style={styles.stars}>
         {renderStars(Number(props.name.puntuacion))} 
      </View>
</View>

      <Text style={styles.genre}>{props.name.genero}</Text>
      </View>
    </TouchableOpacity>
      
    <Modal visible={modalVisible}>
     <Text>Hola soy modal</Text>
     <Image source={{ uri: props.name.imagen }} style={styles.img}/>
      <Text style={styles.details}>codigo :{props.name.id}</Text>
      <Text style={styles.title}>{props.name.titulo}</Text>
      <Text style={styles.details}>🎮{props.name.plataforma}</Text>
      <Text style={styles.details}>📅 {props.name.lanzamiento}</Text>
      <Text style={styles.details}>{props.name.puntuacion}</Text>
        <View style={styles.stars}>
         {renderStars(Number(props.name.puntuacion))} 
        </View>
       <Button title="Cerrar" onPress={() => setModalVisible(false)} />
    </Modal>

    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding:10,
    marginVertical:5,
    marginHorizontal:10,
    borderRadius:10,
    shadowColor: "#000",
    shadowOpacity:0.2,
    shadowOffset: {width:0, height: 2},
    shadowRadius:4,
    elevation:3,
    alignItems: 'center',
    
  },
    img:{
      width: 100,
      height: 100,
      borderRadius: 10
    },
    infoContainer:{
      marginLeft: 10,
      flex: 1

    },
    title:{
     fontSize:18,
     fontWeight: 'bold',
     color: '#666'
    },
    details:{
     fontSize:14,
     color: '#666',
     marginTop: 5

    },
    ratingContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5

    },
    stars:{
    flexDirection: 'row',
    marginLeft:5,

    },
    genre:{
    fontSize:12,
    color: '#fff',
    backgroundColor:'#007bff',
    paddingHorizontal:8,
    paddingVertical:4,
    borderRadius:5,
    alignSelf: 'flex-start',
    marginTop: 5,

    },
})