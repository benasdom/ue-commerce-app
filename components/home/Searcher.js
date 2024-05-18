import { View,TextInput,StyleSheet, Pressable} from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import Items from './Items'
import { useState,useRef } from 'react'

export default function Searcher({navigation,activeTab}) {
const [find, setfind] = useState("")
const bar=useRef(null)
  return (
    <>
    <View style={{background:"white",padding:5,}}>
        <View style={styles.contain}>
          <Pressable onPress={()=>bar.current.clear()} style={styles.closed}>
          <Ionicons style={{color:"rgba(200,200,200,.8)"}} name="close-sharp" size={20} />
          </Pressable>
            <TextInput style={styles.textInp} ref={bar} value={find} onChangeText={(e)=>setfind((prev)=>prev=e)} placeholderTextColor="grey" placeholder='search'/>
        </View>
    </View>
    <Items find={find} setfind={setfind} activeTab={activeTab} navigation={navigation}/>
    </>
  )
}
const styles=StyleSheet.create({
    contain:
        {padding:5,
        flexDirection:"row",
        alignItems:"center",
        width:"80%",
        backgroundColor:"rgba(100,125,150,.1)",
        paddingLeft:10,
        paddingRight:10,
        marginBottom:1,
        borderRadius:100,
        alignSelf:"center",
    },
    closed:{
      backgroundColor:"rgba(100,125,150,.1)",
      borderRadius:50,
    },
    textInp:
        {
        padding:3,
        paddingLeft:5,
        borderRadius:20,
        flexBasis:"90%",
        color:"white",
        alignItems:"center",
        backgroundColor:"rgba(100,125,150,.1)",
        borderColor:"rgba(255,255,255,.4)",
         },
    textFind:{
        borderRadius:100,
        alignItems:"center",
        padding:5,  
        textAlign:"center",
        justifyContent:"center",
        }
})