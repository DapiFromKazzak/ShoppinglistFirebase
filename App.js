import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { doc, addDoc, collection, firestore, query, QuerySnapshot, deleteDoc, onSnapshot, SHOPPINGLIST } from './firebase/Config';
import { useEffect, useState } from 'react';

export default function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(()=>{
    const q = query(collection(firestore, SHOPPINGLIST))
    const unsubscribe = onSnapshot(q,(QuerySnapshot) => {
      const tempItems = []
      QuerySnapshot.forEach((doc) => {
        tempItems.push({...doc.data(), id: doc.id})
      })
      setItems(tempItems)
    })
    return() => {
      unsubscribe()
    }
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, SHOPPINGLIST), {
      item: newItem
    }).catch(error => console.log(error))

    setNewItem('')
    console.log('Item saved to shopping list')
  }

  const deleteItem = async (id) => {
    console.log("deletePessed ",id)
    const docRef = doc(firestore, SHOPPINGLIST, id)
    deleteDoc(docRef)
    .then(()=>{
      console.log("Document has been deleted")
    }).catch(error => {console.log(error)})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder='Add item...'
          value={newItem}
          onChangeText={text => setNewItem(text)}
        />
        <Button 
          title="Save" 
          onPress={save}
        />
      </View>
      <ScrollView>
        {
          items.map((item) => (
            <View key={item.id} style={styles.shoppinglistItem}>
              <Text>{item.item}</Text>
              <Button
              title="X"
              onPress={() => deleteItem(item.id)}
              />
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16
  },
  shoppinglistItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
