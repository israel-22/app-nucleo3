import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';

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
        <MyTab />
    </NavigationContainer>
  )

}