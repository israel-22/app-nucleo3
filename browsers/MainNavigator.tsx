import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/ConfigScreen';

// Definir tipos de rutas para Stack y Tab
type RootStackParamList = {
  login: undefined;
  register: undefined;
  MyTab: undefined;
};

type MyTabParamList = {
  'Juegos': undefined;
  'Puntuación': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator<MyTabParamList>();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen
        name="MyTab"
        component={MyTab}
        options={{
          headerShown: true,
          header: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Bienvenido</Text>
              <LogoutButton />
            </View>
          ),
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Juegos" component={GameScreen} />
      <Tab.Screen name="Puntuación" component={ScoreScreen} />
    </Tab.Navigator>
  );
}

function LogoutButton() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Especificamos el tipo adecuado para navegación

  function logOut() {
    signOut(auth)
      .then(() => {
     
        navigation.navigate('login'); 
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <TouchableOpacity style={styles.btn} onPress={logOut}>
      <Text style={styles.closetext}>Cerrar sesión</Text>
    </TouchableOpacity>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    elevation: 6,
    top: 42,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  btn: {
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  closetext: {
    color: 'white',
    fontWeight: 'bold',
  },
});
