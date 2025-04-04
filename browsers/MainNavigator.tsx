import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';


const Stack = createStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator initialRouteName='login'>
      <Stack.Screen name='login' component={LoginScreen}/>
      <Stack.Screen name='register' component={RegisterScreen}/>
      <Stack.Screen name='MyTab' component={MyTab}/>
    </Stack.Navigator>
  )
}






const Tab = createMaterialTopTabNavigator();


function MyTab(){
    return(
<Tab.Navigator > 
    <Tab.Screen name= 'Bienvenido' component ={GameScreen} />
    <Tab.Screen name= 'pagina' component ={ScoreScreen} />
</Tab.Navigator>
  )
}

export default function MainNavigator(){
  return(
    <NavigationContainer>
        <MyStack />
    </NavigationContainer>
  )

}