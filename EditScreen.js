import React, {useState, useEffect} from 'react'; 
import { View, Alert } from  'react-native';
import * as SQLite from 'expo-sqlite';
import { Input } from 'react-native-elements/dist/input/Input';
import { Button } from 'react-native-elements'; 


const db = SQLite.openDatabase('recipedb.db');


export default function EditScreen({ route, navigation }){
    
    const [id, setId]=useState('');
    const [name, setName]=useState(''); 
    const [notes, setNotes]=useState(''); 
    const [list, setList]=useState([]);

    useEffect(() => {
        setId(route.params.id);
        setName(route.params.name);
        setNotes(route.params.notes)
    }, []); 

    const editRecipe = () => {
        db.transaction((tx)=>{
            tx.executeSql('update recipies set name=?, notes=? where id=?',
                [name, notes, id]
            ); 
        }, null, route.params.updateList)
        setName(''); 
        setNotes(''); 
        Alert.alert('Your recipe has been updated'); 
    }

    
    return (
        <View>
            <Button 
            title='Back to my recipies'
            onPress={()=>navigation.navigate('Your recipebook')}
            />
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
            title='Edit recipe'
            onPress={editRecipe}
            />
        </View>
    )
}