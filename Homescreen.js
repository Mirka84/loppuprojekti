import React from 'react'; 
import { View, Text, StyleSheet } from  'react-native';
import { Image } from "react-native-elements";
import { Button } from "react-native-elements";

export default function Homescreen({ navigation }){
    return(
        <View styles={styles.container}>
           
            <Button 
            onPress={() => navigation.navigate('Your recipebook')}
            title="Show my own recipies"
            />
            <Image 
            source={{
                uri:"https://live.staticflickr.com/3666/32720921904_bd81cb6158_b.jpg"}}
            style={styles.Image}
            />
            <Button 
            onPress={() => navigation.navigate('Find New Ideas')}
            title="Find new Ideas for recipies"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  }, 
    Image: {
    width: 400,
    height: 400,   
  }
}); 
