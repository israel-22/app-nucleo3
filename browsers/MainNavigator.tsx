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
    backgroundColor: '#1a1a2e', // Fondo oscuro
    elevation: 6,
    top: 42,
    borderBottomWidth: 2,
    borderBottomColor: '#00ffe0', // Borde neón
    shadowColor: '#0ff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ffe0', // Neón
    fontFamily: 'Courier New',
    textShadowColor: '#0ff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ff0055', // Rojo neón
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#ff0055',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },

  closetext: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    textShadowColor: '#ff69b4',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
