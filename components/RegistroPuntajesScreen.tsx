import { View, Text, TextInput, Button, Image, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import { set } from 'firebase/database';



const RegistroPuntajesScreen = () => {

    type Juego = {
        id: string;
        titulo: string;
        plataforma: string[];
        genero: string[];
        desarrollador: string;
        precio: number;
        lanzamiento: string;
        descripcion: string;
        imagen: string;
      };
      
      type Registro = {
        juego: Juego;
        puntuacion: number;
        fecha: string;
      };


  const [juegosAPI, setJuegosAPI] = useState<Juego[]>([]);
const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null);
const [puntuacion, setPuntuacion] = useState('');
const [fecha, setFecha] = useState('');
const [busqueda, setBusqueda] = useState('');
const [registros, setRegistros] = useState<Registro[]>([]);
    
    useEffect(() => {
        const styles = StyleSheet.create({})
     
        const fetchJuegos =async()=>{
        const data = await fetch('https://jritsqmet.github.io/web-api/videojuegos.json').then(res => res.json());
        setJuegosAPI(data);

        };
        fetchJuegos();

    }, []);
   
   
    const seleccionarJuego = (titulo: string) => {
        const juego = juegosAPI.find(j => j.titulo.toLowerCase() === titulo.toLowerCase());
        setJuegoSeleccionado(juego || null);
      };
    
      const guardarPuntaje = () => {
        if (!juegoSeleccionado || !puntuacion || isNaN(Number(puntuacion)) || !fecha) {
          alert('Completa todos los campos correctamente');
          return;
        }
    
        const nuevo = {
          juego: juegoSeleccionado,
          puntuacion: Number(puntuacion),
          fecha,
        };
    
    setRegistros([...registros, nuevo]);
    setPuntuacion('');
    setFecha('');
    setJuegoSeleccionado(null);
    setBusqueda('');   
    };

    const total=registros.reduce((sum,r)=>sum+r.puntuacion,0);
    const maximo=registros.length>0? Math.max(...registros.map(r=>r.puntuacion)):0;
    const promedio = registros.length>0? (total/registros.length).toFixed(2):0;

return(
<View style={styles.container}>
    <Text style={styles.title}>Registro de Puntjes</Text>
    <TextInput
     placeholder="Busca juego"
     value={busqueda}
     onChangeText={text =>{
        setBusqueda(text);
        seleccionarJuego(text);
     }}
     style={styles.input}
    />

    { juegoSeleccionado?.imagen &&( 
      <Image source={{uri:juegoSeleccionado.imagen}} style={styles.image}/>
    )}
    <TextInput
    placeholder="Puntuacion"
    keyboardType='numeric'
    value={puntuacion}
    style={styles.input}
    />
    
    <TextInput
    placeholder='Fecha(YYYY-MM-DD)'
    value={fecha}
    onChangeText={setFecha}
    style={styles.input}
    />

    <Button title="Guardar" onPress={guardarPuntaje}/>

    <View style={styles.resultados}>
     <Text style={styles.resultado}>🎯 Total: {total}</Text>
     <Text style={styles.resultados}>🥇 Maximo: {maximo}</Text>
     <Text style={styles.resultados}>📊 Promedio: {promedio}</Text>

    </View>
    <FlatList
       data={registros}
       keyExtractor={(_, index)=>index.toString()}
       renderItem={({item})=>(
        <View style={styles.card}>
        <Text style={styles.cardText}>{item.juego.titulo}</Text>
        <Text style={styles.cardText}>⭐{item.puntuacion}</Text>
        <Text style={styles.cardText}>📅{item.fecha}</Text>
        </View>
       )}
    />
</View>
);
};

// export default RegistroPuntajesScreen;

const styles = StyleSheet.create({

    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 6,
        borderRadius: 8,
      },
      image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10,
      },
      resultados: {
        marginVertical: 16,
      },
      resultado: {
        fontSize: 16,
        marginVertical: 2,
      },
      card: {
        backgroundColor: '#f3f3f3',
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
      },
      cardText: {
        fontSize: 14,
      },

})