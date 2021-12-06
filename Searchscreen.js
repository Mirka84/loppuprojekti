import React, {useState, useEffect} from 'react'; 
import { View, Text, FlatList, StyleSheet } from  'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import { Button } from 'react-native-elements'; 
import { Image } from "react-native-elements";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');


export default function Searchscreen(){
    const [text, setText]=useState(''); 
    const [repository, setRepository]=useState([]); 
    const [list, setList]=useState([]); 
    const [recipe, setRecipes]=useState(''); 


    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists recipies (id integer primary key not null, recipe text, notes text);');
      });
      updateList();    
    }, []);
  
    // Save course
    const saveItem = () => {
      db.transaction(tx => {
          tx.executeSql('insert into recipies (recipe) values (?);', [recipe]);    
        }, null, updateList
      )
    
    }
    // Update courselist
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from recipies;', [], (_, { rows }) =>
          setList(rows._array)
        ); 
      });
    }
  
  
    const getRepositories = () => {
      
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`)
        .then(response => response.json())
        .then(responseData => setRepository(responseData.meals))
        .catch(error => { 
            Alert.alert('Error', error); 

            
        });    
      }

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
              <Button icon={<Icon name="save"/>} onPress={()=>setRecipes(item.strMeal), saveItem, console.log(item.strMeal)}>Save</Button>
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
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-around',
      width: 250,
    }
   });
   
   
