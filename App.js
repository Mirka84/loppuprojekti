import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './Homescreen';
import Searchscreen from './Searchscreen';
import Recipebook from './Recipebook'; 
import EditScreen from './EditScreen'; 



const Stack = createNativeStackNavigator();

function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Welcome to your recipes!" component={Homescreen} />
      <Stack.Screen name="Find New Ideas" component={Searchscreen} />
      <Stack.Screen name="Your recipebook" component={Recipebook} />
      <Stack.Screen name="EditRecipe" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

