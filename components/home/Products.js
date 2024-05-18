import { View, Text,StyleSheet,Image,TouchableOpacity,ScrollView,Dimensions, Linking } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"


const acceptedHeight=(Dimensions.get('window').height*(1));

export default function Products({navigation}) {
  return (
    <View style={{flex:1,backgroundColor:"rgba(5, 12, 20, 0.9)",
  }}>
      <View style={styles.title}>
      <TouchableOpacity style={styles.prev}  onPress={()=>navigation.goBack()}>
      <Ionicons name={"arrow-back"} style={{color:"white"}} size={25}/>

       </TouchableOpacity>
      <Ionicons name={"albums"} style={{color:"grey"}} size={25}/>

        <Text style={styles.titletext}>UE Products and  Services</Text>
      </View>
      <ScrollView >
        <View style={styles.body}>
         
        <TouchableOpacity style={styles.cattype} onPress={()=>{Linking.openURL('https://unityelites.com');}}>
         <Text style={styles.cattext}>
          <Ionicons name='camera' size={20}/>
{" Photography"}</Text>
         
          
            <Image style={styles.images} source={require('../../assets/images/ue-photo.jpg')}/>
         </TouchableOpacity>
         <TouchableOpacity style={styles.cattype} onPress={()=>{Linking.openURL('https://unityelites.com');}}>
         <Text style={styles.cattext}>
          <Ionicons name='globe' size={20}/>
{" Web and app dev"}</Text>
          
            <Image style={styles.images} source={require('../../assets/images/ueserve.jpg')}/>
         </TouchableOpacity>
         <TouchableOpacity style={styles.cattype} onPress={()=>{Linking.openURL('https://unityelites.com');}}>
         <Text style={styles.cattext}>
         <Ionicons name='people-circle-outline' size={20}/>
          
           {" Marketting"}</Text>
          
            <Image style={styles.images} source={require('../../assets/images/ue-serv.jpg')}/>
         </TouchableOpacity>
         <TouchableOpacity style={styles.cattype} onPress={()=>{Linking.openURL('https://unityelites.com');}}>
         <Text style={styles.cattext}>
         <Ionicons name='desktop-outline' size={20}/>
          
          {" Adverts"}</Text>
          
            <Image style={styles.images} source={require('../../assets/images/uemovies.png')}/>
         </TouchableOpacity>
         <TouchableOpacity style={styles.cattype} onPress={()=>{Linking.openURL('https://unityelites.com');}}>
         <Text style={styles.cattext}>
         <Ionicons name='brush' size={20}/>
          
          {" Graphic Designs"}</Text>

            <Image style={styles.images} source={require('../../assets/images/uepage.png')}/>
          </TouchableOpacity>
  
        
        </View>
      </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
  title:{
    padding:20, 
   backgroundColor:"rgba(5, 12, 20, 0.3)",
   display:"flex",
   flexDirection:"row",
   alignItems:"center",
   paddingTop:100,
   justifyContent:"center",

  },
  titletext:{
  fontWeight:"bold",
  fontSize:20,
  color:"rgba(200,200,220,.2)",
  },
  images:{
height:250,
backgroundColor:"black",
width:"100%",
  },
  body:{
    flex:1,
    backgroundColor:"rgba(5, 12, 20, 0.9)",
    padding:10,
    flexWrap:"wrap",

    flexDirection:"row",

    borderRadius:10,
  },
  prev:{
    display:"flex",
    alignContent:"center",
    justifyContent:"center",
    textAlign:"center",
    position:"absolute",
    width:40,
    height:40,
    padding:5,
    backgroundColor:"rgb(50, 62, 80)",
    borderRadius:10,
    left:0,
    marginTop:60,
    marginLeft:20,

},
  cattext:{
    fontWeight:"bold",
    fontSize:15,
    color:"rgb(10,30,100)",
    padding:20,
  },
  cattype:{
    justifyContent:"space-between",
    flexWrap:"wrap",
    width:"100%",
    backgroundColor:"lightgrey",
    alignContent:"center",
    margin:3,
    borderRadius:10,
    overflow:"hidden",
    flexDirection:"column",
  }
})