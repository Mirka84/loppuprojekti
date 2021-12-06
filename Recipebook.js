import React, {useState, useEffect} from 'react'; 
import * as SQLite from 'expo-sqlite';
import { View, FlatList, StyleSheet, Text } from  'react-native';

const db = SQLite.openDatabase('recipedb.db');

export default function Recipebook(){

    const [list, setList]=useState([]); 

    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('create table if not exists recipies (id integer primary key not null, name text, picture text, notes text);');
        });
        updateList();  
        console.log(list)  
      }, []);
  
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
                <Card.Title>{item.strMeal}</Card.Title>
                    <Card.Divider/>
                    <View style={{position:"relative",alignItems:"center"}}>
                    <Image
                    source={{uri: item.strMealThumb}} 
                    style={styles.images}
                    />
                    <View style={styles.button}>
                    <Button style={{width: 150}} icon={<Icon name="delete" color="red"/>} ></Button>
                    </View>
                    </View>
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
    button: {  
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-around',
    }
   });