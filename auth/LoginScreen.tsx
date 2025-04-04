import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

export default function LoginScreen({navigation}:any) {

  const[email, setEmail]= useState('');
  const[password, setPassword]=useState('');

  const handleLogin= async()=>{
    try{
      // aqui debemos coolocar la autentificacion de firebase
      console.log("iniciar sescion con:", email,  password);
    }catch(error){
      console.error("Error al iniciar sesion",error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
      style={styles.input}
      placeholder="Correo Electronico"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType='email-address'
      />
      <TextInput
      style={styles.input}
      placeholder='Contraseña'
      value={password}
      onChangeText={setPassword}
      secureTextEntry
      />

    <TouchableOpacity style={styles.button} onPress={handleLogin}>
     <Text style={styles.registerText}>Entrar</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate("register")}>
      <Text style={styles.registerText}>¿No tienes cuna cuenta? Registrate</Text>
    </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#f5f5f5',
padding:20

},

title:{
fontSize:28,
fontWeight:'bold',
marginBottom:20,
color:"#333"
},

input:{
  width:'100%',
  height:50,
  backgroundColor:'#fff',
  borderRadius:8,
  paddingHorizontal:15,
  marginBottom:15,
  shadowColor: "#000",
  shadowOpacity:0.1,
  shadowOffset: {width:0, height: 2},
  shadowRadius:4,
  elevation:3
},

button:{
width:'100%',
height:50,
backgroundColor:'#007bff',
borderRadius:8,
justifyContent:'center',
alignItems:'center',
shadowColor: "#000",
shadowOpacity:0.2,
shadowOffset: {width:0, height: 2},
shadowRadius:4,
elevation:3,

},

buttonText:{
  fontSize:18,
  color:'#fff',
  fontWeight:'bold',
},

registerText:{
marginTop:20,
color:'black',
fontSize:14,
},
})