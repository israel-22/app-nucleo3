import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/ConfigScreen';
import { ref, set } from 'firebase/database';

export default function ListGames( props:any) {

  const [id, setid] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setnombre] = useState("");
  const [puntuacion, setpuntuacion] = useState(0);
  
  
  function Save() {
    set(ref(db, 'usuarios/' + id + '/scores/'), {
      nombre: nombre,
      score: puntuacion,
      date: Date.now()
    });
  }
  useEffect(() => {
    setnombre(props.name.titulo);
  }, [props.name.titulo]);

  useEffect(() => {
    authActive();
   
  }, []);
function authActive(){

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setid(uid);
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  
}

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
      <Text style={styles.details}>💰{props.name.precio} USD</Text>
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
      
    <Modal visible={modalVisible} transparent={true} animationType="fade">
    
    <View style={styles.modalBackdrop}>
    <View style={styles.modalCard}>
      <Image source={{ uri: props.name.imagen }} style={styles.modalImage} />
      <Text style={styles.modalTitle} >{props.name.titulo}</Text>
      <Text style={styles.modalDetail}>📌 Código: {props.name.id}</Text>
      <Text style={styles.modalDetail}>🎮 Plataforma: {props.name.plataforma}</Text>
      <Text style={styles.modalDetail}>💰 Precio: {props.name.precio} USD</Text>
      <Text style={styles.modalDetail}>📅 Lanzamiento: {props.name.lanzamiento}</Text>
      <TextInput onChangeText={(text) => setid(text) } value={id} editable={false}/>
      <Text> Puntuacion:</Text>
      <TextInput placeholder='Ingrese su puntuacion' onChangeText={(text)=> setpuntuacion(+text)} value ={puntuacion.toString()}/>
        <Button title='Guardar' onPress={()=> Save()}/>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
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
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      width: '85%',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
    },
    modalImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
      marginBottom: 15,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
      textAlign: 'center',
    },
    modalDetail: {
      fontSize: 16,
      color: '#555',
      marginBottom: 5,
      textAlign: 'center',
    },

    closeButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
      marginTop: 10,
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
})