import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';


const Tab = createMaterialTopTabNavigator();


function MyTab(){
    return(
<Tab.Navigator > 
  {/* <Tab.Screen name= 'Login' component={LoginScreen} /> */}
  <Tab.Screen name= 'registro' component={RegisterScreen} /> 
  <Tab.Screen name='Modal' component={ModalScreen}/>
<Tab.Screen name= 'Bienvenido' component ={GameScreen} />
<Tab.Screen name= 'pagina' component ={ScoreScreen} />
</Tab.Navigator>
  )
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
