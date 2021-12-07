import React, {useState, useEffect} from 'react'; 
import { View, FlatList, StyleSheet, Text } from  'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');


export default function Recipebook({ route, navigation }){

    const { recipe }=route.params. 

    const [list, setList]=useState([]);

    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists recipies (id integer primary key not null, recipe text);');
      });
      updateList();    
    }, []);
  
    
    // Update recipelist
    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from recipies;', [], (_, { rows }) =>
          setList(rows._array)
        ); 
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
        <Text>Tämä on reseptisivu</Text>
        <FlatList 
            style={{marginLeft : "5%"}}
            data={list} 
            ItemSeparatorComponent={listSeparator}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) =>
                <View>
                <Card>
                  <Image source={{uri: item.strMealThumb}} style={styles.images}></Image>
                  <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
                  <Button style={{width: 150}} icon={<Icon name="delete" color="red"/>} ></Button>
                </Card> 
                </View>
                }
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