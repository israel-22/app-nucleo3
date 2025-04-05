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
  },
  totalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
