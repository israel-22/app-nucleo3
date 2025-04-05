import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/ConfigScreen';

export default function LoginScreen({navigation}:any) {

  const[email, setEmail]= useState('');
  const[password, setPassword]=useState('');

  function LoginAuth(){
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   
    const user = userCredential.user;
    navigation.navigate("MyTab");
 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }


 

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

    <TouchableOpacity style={styles.button} onPress={()=>LoginAuth()}>
     <Text style={styles.registerText}>Entrar</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>navigation.navigate("register")}>
      <Text style={styles.registerText}>¿No tienes cuna cuenta? Registrate</Text>
    </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f1b', // Fondo oscuro futurista
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00ffe0', // Color neón
    fontFamily: 'Courier New', // Fuente consola
    textShadowColor: '#0ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff', // Oscuro con brillo leve
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ffe0', // Borde neón
    paddingHorizontal: 15,
    marginBottom: 15,
    color:  '#1a1a2e',
    fontFamily: 'Courier New',
    shadowColor: '#0ff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00ffe0', // Neón brillante
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00ffe0',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    fontSize: 18,
    color: '#0f0f1b', // Contraste con fondo
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },

  registerText: {
    marginTop: 20,
    color: '#888',
    fontSize: 14,
    fontFamily: 'Courier New',
    textShadowColor: '#00ffe0',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});