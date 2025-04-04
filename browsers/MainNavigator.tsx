import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';
import ModalScreen from '../screens/ModalScreen';

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

export default function MainNavigator(){
  return(
    <NavigationContainer>
        <MyTab />
    </NavigationContainer>
  )

}