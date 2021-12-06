import React from 'react'; 
import { View, Text, StyleSheet } from  'react-native';
import { Image } from "react-native-elements";
import { Button } from "react-native-elements";

export default function Homescreen({ navigation }){
    return(
        <View styles={styles.container}>
            <Text>Tämä on koti</Text>
            <Image 
            source={{
                uri:"https://live.staticflickr.com/3666/32720921904_bd81cb6158_b.jpg"}}
            style={{ width: 300, height: 300, borderRadius: 150, padding: 10, margin: 30 }}
            />
            <Button 
            buttonStyle={{ width: 150 }}
            containerStyle={{ margin: 100 }}
            onPress={()=>navigation.navigate('Searchscreen')}
            title="Start finding your own recipes"
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
  }
})
