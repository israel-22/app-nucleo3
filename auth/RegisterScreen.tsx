import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/ConfigScreen';



export default function RegisterScreen({navigation}:any) {
  const[email, setEmail]= useState('');
  const[password, setPassword]=useState('');

  function Register(){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
    navigation.navigate("login");

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   
  });
    
  }



   return (
     <View style={styles.container}>
       <Text style={styles.title}>Crear Cuenta</Text>
 
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
          {/* <TextInput
       style={styles.input}
       placeholder='Confirmar Contraseña'
       value={password}
       onChangeText={setPassword}
       secureTextEntry
       /> */}
 
     <TouchableOpacity style={styles.button} onPress={()=> Register()} >
      <Text style={styles.registerText}>Registrar</Text>
     </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("login")}>
          <Text style={styles.registerText}>¿Ya tengo una cuenta? Iniciar Sesión</Text>
        </TouchableOpacity>
     </View>
   )
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d1a', // Fondo oscuro tipo sci-fi
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00ffe0', // Neón azul-verde
    fontFamily: 'Courier New', // Tipografía tipo consola
    textShadowColor: '#0ff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ffe0',
    paddingHorizontal: 15,
    marginBottom: 15,
    color:  '#1a1a2e', // Letras blancas
    fontFamily: 'Courier New',
    shadowColor: '#0ff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },

  button: {
    width: '100%',
    height: 59,
    backgroundColor: '#00ffe0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0ff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    padding: 10,
    marginTop: 20,
  },

  buttonText: {
    fontSize: 18,
    color: '#000', // Contraste con el botón neón
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  },

  registerText: {
    marginTop: 20,
    color: '#000',
    fontSize: 14,
    fontFamily: 'Courier New',
  },
});