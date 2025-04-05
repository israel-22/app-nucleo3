import { Alert, Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/ConfigScreen';
import { get, push, ref, set } from 'firebase/database';
import { format } from 'date-fns';

export default function ListGames( props:any) {

  const [id, setid] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setnombre] = useState("");
  const [puntuacion, setpuntuacion] = useState(0);
  const [score, setscore] = useState(0);
  
  
  function Save() {
    const idScore=score+1;
    const formatDate = format(new Date(),'yyyy-MM-dd');
    const scoresRef = push(ref(db, 'usuarios/' + id + '/scores/'), {
      nombre: nombre,
      score: puntuacion,
      date: formatDate
  
    });
  Alert.alert('Notificacion', 'Puntuacion Guardada');
  setModalVisible(false);
  setpuntuacion(0);
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
      
      const uid = user.uid;
      setid(uid);  
    } else {
    
    }
  });
  
}

  

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