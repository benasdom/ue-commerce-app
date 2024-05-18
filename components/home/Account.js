import { View, Text, StyleSheet,TouchableOpacity, ImageBackground,Pressable, Alert } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from "react-native-vector-icons/Ionicons"
import { logout } from '../../redux/reducers/cartReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch,useSelector } from 'react-redux'


export default function Account({navigation}) {
  const selectaccount = useSelector((state) => state.selectedItems.credentials);
  const dispatch=useDispatch();

  const logsout=async()=>{
    Alert.alert("Logout 📲","Wish to Logout?",[{
      text:"logout",
      onPress:()=>{
      AsyncStorage.removeItem("Userlogged")
      .then(()=>dispatch(logout()))
      .then(()=>navigation.navigate("Home"))
      .catch(err=>err?navigation.navigate("Home"):false)}
    }
      ,
      {
        text:"cancel",
        onPress:()=>false
      }

    ]);
    
    
     
 
  }
  
  


  return (
    <>
    <TouchableOpacity style={styles.prev}  onPress={()=>navigation.goBack()}>
      <Ionicons name={"arrow-back"} style={{color:"white"}} size={25}/>

       </TouchableOpacity>
     
    <ScrollView style={styles.container}>
   
      <View style={styles.profile}>
        <View style={styles.dp}>
          
        <ImageBackground  style={styles.dpicon} source={require("../../assets/images/profile.png")}>
        <Text style={{fontWeight:"bold",marginTop:20,fontSize:30,color:"white"}}>{`${selectaccount.myemail}`.toUpperCase().split("").slice(0,1)}</Text>
        </ImageBackground>
          </View>
          <View style={styles.editp}>
          <Text style={styles.ptext1}>{selectaccount.myemail}</Text>
          <Text style={styles.ptext2}>Username:{`${selectaccount.myemail}`.split("").slice(0,`${selectaccount.myemail}`.split("").indexOf("@"))}</Text>

          <Text style={styles.ptext2}>Edit Profile</Text>
          </View>
          </View>
           <View>
      <Text style={styles.par}>MY UE ACCOUNT</Text>
      <View style={styles.childs}>
        <View style={styles.flexed}><Ionicons name="wallet-outline" style={styles.icons} size={20}/><Text style={styles.texts}>Payment Methods</Text></View>
        <View style={styles.flexed}><Ionicons name="pricetag-outline" style={styles.icons} size={20}/><Text style={styles.texts}>Promotions</Text></View>
        <View style={styles.flexed}><Ionicons name="star-outline" style={styles.icons} size={20}/><Text style={styles.texts}>Review / Ratings</Text></View>
        <View style={styles.flexed}><Ionicons name="eye-outline" style={styles.icons} size={20}/><Text style={styles.texts}>Recent Items</Text></View>
        <View style={styles.flexed}><Ionicons name="time-outline" style={styles.icons} size={20}/><Text style={styles.texts}>Payment History</Text></View>
        <Pressable onPress={logsout} style={styles.flexed}><Ionicons name="exit-outline" style={styles.icons} size={20}/><Text style={styles.texts}>Logout</Text></Pressable>
      </View>
      </View>
 
      <View>
      <Text style={styles.par}>MY SETTINGS</Text>
      <View style={styles.childs}>
      <View style={styles.flexed}><Ionicons name="language-outline" style={styles.icons} size={24}/><Text style={styles.texts}>Language</Text></View>
      <View style={styles.flexed}><Ionicons name="mail" style={styles.icons} size={24}/><Text style={styles.texts}>News Letter</Text></View>
      </View>
      </View>
      <View><Text style={[styles.par,styles.powered]}>
        powered by UnityElites</Text>
        </View>
    </ScrollView>
    </>
    
  )
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:"rgba(5, 12, 20, 0.9)",
    color:"rgba(200,200,200,.3)",
  },
  par:{
    padding:10,
    color:"rgba(190,190,230,.3)",

  },
  title:{
    padding:10,
    background:"whitesmoke",
  },
childs:{
  padding:20,
  backgroundColor:"rgba(5, 12, 20, 0.2)",
  color:"rgba(200,200,200,.3)",

},
texts:{
  padding:10,
  fontSize:17,
  color:"rgba(200,200,200,.7)",

},
icons:{
  padding:10,
  color:"rgba(200,200,200,.3)",

},
flexed:{
  flexDirection:"row",
    color:"rgba(200,200,200,.3)",
  height:50,
},

dp:{
height:"100%",
width:"25%",
padding:10,
paddingLeft:20,
justifyContent:"center",
alignContent:"center",
},

dpicon:{
height:65,
justifyContent:"center",
alignItems:"center",
overflow:"hidden",
borderRadius:150,
width:65,
backgroundColor:"rgb(230,232,235)",
},
profile:{
  flexDirection:"row",
  justifyContent:"space-between",
  pading:20,
  height:"28%",
  color:"rgba(200,200,200,.3)",
  paddingTop:50,

},
editp:{
  flexDirection:"column",
  padding:20,
  width:"75%",
  overflow:"hidden",
},
ptext1:{
  fontWeight:"bold",
  fontSize:30,
  color:"white",
  height:"60%",
},
ptext2:{
  height:"20%",
  color:"rgba(200,200,230,.5)",

},
prev:{
  display:"flex",
  position:"absolute",
  alignContent:"center",
  justifyContent:"center",
  textAlign:"center",
  width:40,
  height:40,
  zIndex:10,
  padding:5,
  backgroundColor:"rgb(50, 62, 80)",
  borderRadius:10,
  left:0,
  marginTop:60,
  marginLeft:20,

},
powered:{
  paddingBottom:40,
  color:"rgba(200,200,200,.3)",

},
})