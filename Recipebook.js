import React, {useState, useEffect} from 'react'; 
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from  'react-native';
import * as SQLite from 'expo-sqlite';
import { Input } from 'react-native-elements/dist/input/Input';
import { Button } from 'react-native-elements'; 

const db = SQLite.openDatabase('recipedb.db');


export default function Recipebook({ navigation }){

    const [name, setName]=useState(''); 
    const [notes, setNotes]=useState(''); 
    const [list, setList]=useState([]);

    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists recipies (id integer primary key not null, name text, notes text);');
      });
      updateList();    
    }, []);
  
    
    // Update recipelist
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from recipies;', [], (_, { rows }) =>
          setList(rows._array)
        ); 
        console.log(list); 
      });
    }

    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql(`delete from recipies where id = ?;`, [id]);
        }, null, updateList
      )    
    }
  

    const saveItem = () => {
      db.transaction(tx => {
          tx.executeSql('insert into recipies (name, notes) values (?, ?);', [name, notes]);    
        }, null, updateList
      )
      setName('');
      setNotes('');  
    }

    const navigateToEditScreen = (id, name, notes)=>{
      navigation.navigate('EditRecipe', {
      id: id,
      name: name, 
      notes: notes, 
      updateList
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

    return (
      <View>
        <Input
            placeholder="Write the name of the recipe"
            onChangeText={(name)=>setName(name)}
            value={name}
            />
        <Input
            placeholder="Write your notes"
            onChangeText={(notes)=>setNotes(notes)}
            value={notes}
            />
        <Button 
            title='Add recipe'
            onPress={saveItem}
            />
        <FlatList 
            style={{marginLeft : "5%"}}
            data={list} 
            ItemSeparatorComponent={listSeparator}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => 
            <View key={item.id} style={styles.container}>
            <TouchableOpacity onPress={()=>navigateToEditScreen(item.id, item.name, item.notes)}>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.name}</Text>
              <Text>{item.notes}</Text>
              <Button title="Delete" onPress={() => deleteItem(item.id)}></Button>
            </TouchableOpacity>
            </View>} 
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
   }); 