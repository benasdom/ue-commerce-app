import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useSelector } from 'react-redux';
export default function Footer({navigation}) {
  const [Clicked, setClicked] = useState("rgb(200,200,210)")
  const [userlogged, setuserlogged] = useState({})
  //active color should be rgb(0,120,145)


  const selectaccount = useSelector((state) => state.selectedItems.credentials);





// useEffect(() => {

// let loads=false;
// !loads?
// AsyncStorage.getItem("Userlogged")
// .then((res)=>setuserlogged(JSON.parse(res)))
// .catch((err)=>alert(err))

// :false
// return()=>{
//  loads=true;
// }

// }, [])






  return (
   <Foot
   selectaccount={selectaccount}
   userlogged={userlogged}
   setuserlogged={setuserlogged}
   Clicked={Clicked}
   setClicked={setClicked}
   navigation={navigation}
   />
  )
}

const Foot=({Clicked,navigation,selectaccount})=>{

        return (
        

       <View style={styles.foot}>
<TouchableOpacity>
       <View style={styles.fonts} >
          
          <Ionicons name="home-outline" style={{color:Clicked,}} size={25}/>
       <Text style={{color:Clicked,padding:3,alignSelf:"center",fontSize:9}}>Home</Text>
       </View>
       </TouchableOpacity>
     
       <TouchableOpacity onPress={()=>navigation.navigate("UE exclusives")}>
        
        <View style={styles.fonts} >

          
          <Ionicons name="basket-outline" style={{color:Clicked,}} size={25}/>
       <Text style={{color:Clicked,padding:3,alignSelf:"center",fontSize:9}}>Products</Text>
       </View> 
       </TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate("Orders")}>

       <View style={styles.fonts} >
        
       <Ionicons name="receipt-outline" style={{color:Clicked,}} size={25}/>
     <Text style={{color:Clicked,padding:3,alignSelf:"center",fontSize:9}}>Orders </Text>
        </View>
        </TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate("Account")}>
 { selectaccount.myemail!=null || selectaccount.myemail!=undefined?<View style={styles.loggeduser}><Text>{`${selectaccount.myemail}`[0].toUpperCase()}</Text></View>:false}
        <View style={styles.fonts} >
        
        <Ionicons name="person-outline" style={{color:Clicked,}} size={25}/>
      <Text style={{color:Clicked,padding:3,alignSelf:"center",fontSize:9}}>Account </Text>
         </View>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate("Help")}>

<View style={styles.fonts} >
<Ionicons name="help-circle-outline" style={{color:Clicked,}} size={25}/>
<Text style={{color:Clicked,padding:2,alignSelf:"center",fontSize:9}}>Help</Text>
</View>
</TouchableOpacity>



         
       </View>
        )
}


const styles=StyleSheet.create({

    foot:{
      width:"100%",
      alignSelf:"flex-end",
        bottom:0,
        padding:15,
        paddingLeft:20,
        paddingRight:20,
        position:"absolute",
        flexDirection:"row",
        backgroundColor:"rgb(7, 16, 26)",
        alignItems:"center",
        borderTopWidth:1,
        borderTopColor:"lightgrey",
        justifyContent:"space-between",

    },
    loggeduser:
      {position:"absolute",
      marginLeft:37,
      height:17,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      width:17,
      fontSize:5,
      borderRadius:50,
      backgroundColor:"rgb(0,215,245)",
    },
    fonts:{
      height:50,
      flexDirection:"column",
      justifyContent:"space-between",
      marginTop:3,
      alignItems:"center",
    }

}

);