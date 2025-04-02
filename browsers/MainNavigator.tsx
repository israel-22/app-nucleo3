import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import BienvenidoScreen from '../screens/BienvenidoScreen';
import PaginaScreen from '../screens/PaginaScreen';

const Tab = createMaterialTopTabNavigator();


function MyTab(){
    return(
<Tab.Navigator > 
 
<Tab.Screen name= 'Bienvenido' component ={BienvenidoScreen} />
<Tab.Screen name= 'pagina' component ={PaginaScreen} />
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