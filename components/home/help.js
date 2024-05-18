import { View, Text ,StyleSheet,Linking,TouchableOpacity} from 'react-native'
import React from 'react'
 import Ionicons from "react-native-vector-icons/Ionicons"
// import Constants from 'expo-constants';


export default function Help({navigation}) {
  return (
        <View style={{flex:1,backgroundColor:"rgba(5, 12, 20, 0.9)",paddingTop:50}}>
                <TouchableOpacity style={styles.prev}  onPress={()=>navigation.goBack()}>
                <Ionicons name={"arrow-back"} style={{color:"white"}} size={25}/>
       </TouchableOpacity>
        <View style={{backgroundColor:"rgba(5, 12, 20, 0.3)",margin:1,}}>
      
            <Text style={styles.text}>About UE-commerce</Text>
            </View>
            <View style={styles.seperate}>
            <Text style={styles.text}>App Version</Text>
            <Text style={styles.text}>
     {/* {Constants.manifest.version}</Text> */}
     {"1.0.0"}</Text>
            </View>
            <View style={styles.seperate}>
            <Text style={styles.text}> Country</Text>
            <Text style={styles.text}> Ghana</Text>

            </View>
            <TouchableOpacity style={{    backgroundColor:"rgba(5, 12, 20, 0.3)",margin:1}}  onPress={() => {
              Linking.openURL('mailto:unityelites.1a@gmail.com');
            }}>
            <Text style={styles.text}>Make a complaint</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"rgba(5, 12, 20, 0.3)",margin:1}} onPress={() => {
              Linking.openURL('tel:0272831301');
            }}>
            <Text style={styles.text}>Customer-care</Text>

            </TouchableOpacity>
            <TouchableOpacity  
            style={{backgroundColor:"rgba(5, 12, 20, 0.3)",margin:1}}
            onPress={() => {
              Linking.openURL('https://unityelites.com');
            }}>
            <Text style={styles.text}>UE-services</Text>

            </TouchableOpacity>
         
        </View>

        
        
  )
}


const styles=StyleSheet.create({
  
    text:{
        padding:20,
        alignItems:"center",
        margin:1,
        color:"rgba(200,200,200,.9)",

    },
    seperate:{
        flexDirection:"row",
        justifyContent:"space-between",
        color:"rgba(220,220,220,.3)",
 
    },
    prev:{
      display:"flex",
      alignContent:"center",
      justifyContent:"center",
      textAlign:"center",
      width:40,
      height:40,
      zIndex:1000,
      padding:5,
      backgroundColor:"rgb(50, 62, 80)",
      borderRadius:10,
      left:0,
      marginLeft:20,
      marginBottom:20,
    
    },
});