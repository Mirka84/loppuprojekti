import React, {useState, useEffect} from 'react'; 
import { View, Text, FlatList, StyleSheet } from  'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import { Button } from 'react-native-elements'; 
import { Image } from "react-native-elements";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";



export default function Searchscreen({ navigation }){

    const [text, setText]=useState(''); 
    const [repository, setRepository]=useState([]); 
    const [list, setList]=useState([]);  
    const [recipe, setRecepies]=useState(''); 

  
  
    const getRepositories = () => {
      
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`)
        .then(response => response.json())
        .then(responseData => setRepository(responseData.meals))
        .catch(error => { 
            Alert.alert('Error', error); 

            
        });    
      }

      const saveItem = () => {
        repository.map(recipe => {
          return recipe=recipe.strMeal; 
        } 
        )}
      



      const listSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#CED0CE",
              marginLeft: "10%"
            }}
          />
        );
      };
    
    
    return(
        <View>
            <Text>Tämä on etsintäsivu</Text>
            <Button title="Show my recipies" onPress={() => navigation.navigate('Your recipebook', { recipe })}></Button>
            <Input
            placeholder="Search word"
            onChangeText={(text)=>setText(text)}
            value={text}
            />
            <Button 
            title='Search'
            onPress={getRepositories}
            onLongPress={()=>setText('')}
            />
            <FlatList 
            style={{marginLeft : "5%"}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
            <View>
            <Card>
              <Image source={{uri: item.strMealThumb}} style={styles.images}></Image>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
              <Button title="Save" icon={<Icon name="save" />} onPress={saveItem}></Button>
            </Card>
            </View>}
            data={repository} 
            ItemSeparatorComponent={listSeparator}
             /> 
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
    },
    images: {
      width: '50%',
      height: 100,
    }, 
    button: {  
      alignItems:'center',
      justifyContent: 'space-around',
    }
   }); 
   
   
