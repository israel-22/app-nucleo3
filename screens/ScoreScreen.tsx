import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/ConfigScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { FlatList } from 'react-native-gesture-handler';

export default function ScoreScreen() {
  const [uid, setuid] = useState('');
  const [data, setdata] = useState<any[]>([]); 
  const [totalScore, setTotalScore] = useState(0); 
  const [countScore, setCountScore] = useState(0); 
  const [promedioScore, setPromedioScore] = useState(0); 
  const [maxScore, setMaxScore] = useState(0); 

  useEffect(() => {
    authActive();
    obtener();
  }, [uid]);

  function authActive() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setuid(uid);
      }
    });
  }

  function obtener() {
    const starCountRef = ref(db, 'usuarios/' + uid + '/scores');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let datos = [];
      let total = 0;
      let max = 0;
      let count = 0;
      

      // Recorremos los datos y calculamos el total de scores
      for (let key in data) {
        const scoreItem = data[key];
        datos.push({ id: key, ...scoreItem });
        total += scoreItem.score;
        if(scoreItem.score > max){
          max = scoreItem.score
        }
        count ++
      }
      const avg = count>0 ? total/count : 0

      setdata(datos); 
      setTotalScore(total);
      setPromedioScore(avg);
      setCountScore(count);
      setMaxScore(max);
      // console.log(datos);
      // console.log("Total Score:", total);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.totalScore}>Acumulado Score: {countScore}</Text>
      <Text style={styles.totalScore}>Maximo Score: {maxScore}</Text>
      <Text style={styles.totalScore}>promedio Score: {promedioScore.toFixed(2)}</Text>
      <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c2e', // fondo oscuro elegante
  },

  totalScore: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00ffe0',
    textAlign: 'center',
    fontFamily: 'Courier New',
    textShadowColor: '#00ffe0',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1c1c2e', // fondo oscuro elegante
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#00ffe0',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ffe0',
  },

  itemText: {
    fontSize: 16,
    color: '#1c1c2e',
    fontFamily: 'Courier New',
  }
});
