import { View, Image,StyleSheet,Platform, ScrollView, TextInput, TouchableOpacity , Text,Dimensions,ImageBackground, KeyboardAvoidingView, Modal, Alert } from 'react-native'
import React, {  useEffect,useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
 import { useDispatch,useSelector } from 'react-redux';
import {itemsadded,increment,decrement} from '../../../redux/reducers/cartReducer';
import { Picker } from '@react-native-picker/picker';
 

 export default function Details({activeTab,navigation,...newitems}) {
    const acceptedHeight=(Dimensions.get('window').height*(.63));

    const count = useSelector((state) => state.selectedItems.value);
    const dispatch=useDispatch();
    const [tocart, settocart] = useState("Add to Cart")
    const [selects, setselects] = useState("")
    const [selectsid, setselectsid] = useState("6")
    const [selectreg, setselectreg] = useState("")
    const [landmarked, setlandmarked] = useState("")
    const addAmounts=()=>{
    dispatch(increment())
    }
    const error=()=>{
         if(count<1){
            Alert.alert("Required 🖐️","🪧 Please add an item");false;
        } 
        else if(selectreg==""){
            Alert.alert("Required 🖐️","🪧 Please set a region");false;
        }
        else if(selects==""){
            Alert.alert("Required 🖐️","🪧 Please set a city");false;
        }
        else if(landmarked==""){
            Alert.alert("Required 🖐️","🪧 Please set a landmark");false;
        }
        else{
            addtocart();
            true;

        }
        }
    const subAmounts=()=>{
        dispatch(decrement())
    }
    const items=newitems.route.params.newitems;
    let timed="jhu";

    const addtocart=()=>{
     
        count>0?  settocart("Adding to cart"):false;
    count>0?dispatch(itemsadded({itemamount:count,region:selectreg,city:selects,landmark:landmarked,created:`${timed}`,...items})):false;

      setTimeout(()=>{
        (count>0?navigation.navigate("Cart"):error())

      },10)

  

      }


      useEffect(() => {
        let loaded=false;
    items.activeTab=="Delivery"?"":Alert.alert("Oops! 😯","Pickup points are not available at the time") 

       if(!loaded){
        settocart("Add to cart")
 

       }
      
        return () => {
           loaded=true
        }
      }, [])
      

  return (
    <ScrollView style={{height:acceptedHeight,backgroundColor:"rgba(5, 12, 20, 0.9)",
}}>
    <KeyboardAvoidingView behavior={Platform.OS=="ios"?'position':null}>
    <View style={{justifyContent:"space-between",height:"100%",     
 }}>
 
    <ImageBackground
        source={{uri:items.thumbnail}}
        style={{width:"100%",borderTopLeftRadius:10,borderTopRightRadius:10,height:230}}    >
      <TouchableOpacity style={styles.prev}  onPress={()=>navigation.goBack()}>
      <Ionicons name={"arrow-back"} style={{color:"white"}} size={25}/>

       </TouchableOpacity>
    </ImageBackground>
 
 
        <View style={styles.middleview}>
<Text style={{letterSpacing:1.2,lineHeight:18,marginBottom:4,fontSize:10,color:"rgb(255,270,0)"}}>{items.title}</Text>
<Text style={{maxWidth:400,color:"white",fontSize:20}}>
<Ionicons name={"cash"} style={{color:"rgb(130,180,130)"}} size={20}/>

{" GHS "+items.price.current_price}
</Text>
<View >
<Text style={{textAlign:"center",padding:5,color:"rgb(14,204,250)",textAlign:"center",borderBottomColor:"grey",}}>
    Add Item
    </Text>
</View>
<View style={styles.addItem}>

    <TouchableOpacity onPress={subAmounts} style={styles.removeBtn}><Ionicons size={20} style={{color:"rgba(200,200,200,.5)",fontWeight:"bold"}} name="remove"/></TouchableOpacity>

    <View><Text style={styles.numbs}>{count}</Text></View>
    <TouchableOpacity onPress={addAmounts} style={styles.addBtn}><Ionicons size={20} style={{color:"rgba(200,200,200,.5)"
,fontWeight:"bold"}} name="add"/></TouchableOpacity>

</View>
<View ><Text style={styles.addressinfo}>
    * Check credentials before proceeding to cart
    </Text></View>


<View style={styles.addressform}>
    
    <View style={styles.input}>
    <Ionicons style={{color:"yellow"}}  name="location-sharp" size={15}/>
    <Text style={{color:"rgb(14,204,250)",fontWeight:"bold",padding:3}}>{items.activeTab=="Delivery"?"":<Text style={{color:"pink"}}>Oops pick-up unavailable!. </Text>}{"Delivery to "+selects+" (city 🛣️)"}</Text>

    </View>
 
<View>

</View>
</View>
<LocationInfo 
setselects={setselects} setselectsid={setselectsid}
 setlandmarked={setlandmarked} landmarked={landmarked}
  setselectreg={setselectreg} selectreg={selectreg}
   selectsid={selectsid} selects={selects}/>
<TouchableOpacity onPress={error} style={styles.cartBtn}>
    <Text style={styles.cartBtnCol} >{"✨"+tocart}</Text>
    <Ionicons name="cart" size={24} style={styles.cart} >{(count>0?count:false)}</Ionicons>
 
</TouchableOpacity>

</View> 
 
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}
const LocationInfo=({selects,setselects,setselectsid,selectsid,selectreg,setselectreg,landmarked,setlandmarked})=>{
    const [placed, setplaced] = useState([{region:"Accra",cities:["legon"],id:""}])
    const [cited, setcited] = useState([{cities:["legon"],region:"Accra",id:""}])
    const [loading, setloading] = useState(true)
    const [modst, setmodst] = useState(false)
    const [first, setfirst] = useState(false)


    // bgremover api key =JFLAphS9s6RbLKNgXHeHjxHE
    // key label =Untitled API Key (2022-10-28 09:34:53)
    const places=()=>{
        fetch('https://benasdom.github.io/UEplaces/cities.json').then(res=>res.json()).then(res=> {setplaced(res.data) ;setcited(res.data) ;setloading(false)}).catch(err=> setplaced(err))
    }
      
    useEffect(() => {
        let loads=false;
      places()

    
      return () => {
        loads=true
      }
    }, [])
    

    const callfirst=()=>{
        setmodst(true);
        setfirst(true);
    } 
     const closemodal=()=>{
        setmodst(false);
    }

    const callsecond=()=>{
        setmodst(true);
        setfirst(false);
    }
    return(
      Platform.OS=="android"? 
       <View style={styles.pickerbox}>
        

<Picker
  selectedValue={selectreg}
  style={styles.picked}
  onValueChange={(itemValue, itemIndex) =>
   { setselectsid( (pre)=>pre=itemIndex );
    setselectreg( (pre)=>pre=itemValue )}
  }>
{placed && placed.map((place,index)=>{
    return(

    <Picker.Item  color='black'  key={index.toString()} label={place.region} value={place.region}/>
)})}
</Picker>
<Picker
  selectedValue={selects}
  style={styles.picked}
  onValueChange={(itemValue, itemIndex) =>
    setselects((cur)=>cur= itemValue )
  }>
{cited[selectsid] && cited[selectsid].cities.map((city,index)=>{
    return(

    <Picker.Item color='black' key={index.toString()} label={city} value={city}/>
)})}
</Picker>
<TextInput style={styles.typetext} value={landmarked} onChangeText={(e)=>setlandmarked(e)} placeholder='Landmark eg.Mensah Sarbah Hall,Pent etc' placeholderTextColor={"lightgrey"}/>

</View>
:
 <React.Fragment>
  <TouchableOpacity onPress={callfirst} >
                <Text style={styles.typetext}>{selectreg?selectreg:"Click to set region"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={callsecond} >
                <Text style={styles.typetext}>{selects?selects:"Click to set city"}</Text>
            </TouchableOpacity>
            <TextInput style={styles.typetext} value={landmarked} onChangeText={(e)=>setlandmarked(e)} placeholder='Landmark eg.Mensah Sarbah Hall,Pent etc' placeholderTextColor={"lightgrey"}/>

<Modal
transparent
visible={modst}
animationType={"slide"}>
    <View style={styles.modalview}>
    <TouchableOpacity onPress={closemodal} >
    <View style={styles.modalremove}>

</View>
    </TouchableOpacity>
  
    <View style={styles.modalbox}>
        <View styles={styles.modselect}>
        <View style={styles.inputb}>
    <Text style={{color:"rgb(14,204,250)",fontWeight:"bold"}}>Delivery to {selectreg+","+selects+" 🛣️"}</Text>
    <TouchableOpacity onPress={closemodal} >
                <Text style={styles.done}>Done</Text>
            </TouchableOpacity>

    </View>
          
        </View>

    <ScrollView>
        <KeyboardAvoidingView>
        <View style={styles.pickerbox}>

{first?<Picker
  selectedValue={selectreg}
  style={styles.picked}
  onValueChange={(itemValue, itemIndex) =>
   { setselectsid( (pre)=>pre=itemIndex );
    setselectreg( (pre)=>pre=itemValue )}
  }>
{placed && placed.map((place,index)=>{
    return(

    <Picker.Item color='white'  key={index.toString()} label={place.region} value={place.region}/>
)})}
</Picker>:
<Picker
  selectedValue={selects}
  style={styles.picked}
  onValueChange={(itemValue, itemIndex) =>
    setselects((cur)=>cur= itemValue )
  }>
{cited[selectsid] && cited[selectsid].cities.map((city,index)=>{
    return(

    <Picker.Item color='white'  key={index.toString()} label={city} value={city}/>
)})}
</Picker>}
</View>
        </KeyboardAvoidingView>
    </ScrollView>
    </View>
    </View>

</Modal>
</React.Fragment>


    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,

    },
    modselect:{
        flexDirection:"row",
        padding:10,
        backgroundColor:"rgba(30,35,60,.7)",
        justifyContent:"center",
        alignSelf:"center",
    },
    done:{
       padding:5,
       color:"rgba(200,200,200,.3)",
    },
    modalremove:{
        height:"50%",
    },
    modalview:{
        flex:1,
        backgroundColor:"rgba(10,20,40,.4)",
        
        flexDirection:"column",
        justifyContent:"flex-end",
    },
        modalbox:{
        height:"50%",
        backgroundColor:"rgba(30,35,53,.7)",
        borderTopStartRadius:30,
        borderTopEndRadius:30,
        
    },
    cart:{
        color:"white",
        width:"50%",
        textAlign:"right",
        padding:10,
        height:"100%",
    },
    headview:{
        backgroundColor:"black",
    },
    addItem:{
        width:"100%",
        flexDirection:"row",
        padding:10,
        justifyContent:"center",
    },
    picked:{
        backgroundColor:"rgba(60,70,90,.9)",
        color:"white",
        margin:2,
    },
    typetext:{
        margin:2,
        padding:10,
        color:"lightgrey",
         backgroundColor:"rgba(10,65,100,.3)",
    },

    addressform:{
        flexDirection:"column",
        backgroundColor:"rbga(20,30,50)",
        alignSelf:"center",
    },
    input:{
        flexDirection:"row",
        justifyContent:"space-between",
    }, 
     inputb:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"rgba(30,35,60,.7)",
        padding:20,
    },
    cartBtnCol:{
        color:"rgb(14,204,250)",
        height:"100%",
        width:"50%",
        padding:15,

    },
    addressinfo:{
        color:"grey",
        padding:4,
        textAlign:"center",

    },
        cartBtn:{
        width:"80%",
        maxiHeight:100,
        alignSelf:"center",
        flexDirection:"row",
        marginTop:20,
        justifyContent:"space-between",
        alignItems:"center",

        borderRadius:30,
        backgroundColor:"black",
    },
    prev:{
        display:"flex",
        alignContent:"center",
        justifyContent:"center",
        textAlign:"center",
        width:40,
        height:40,
        padding:5,
        backgroundColor:"rgb(40, 62, 90)",
        borderRadius:10,
        marginTop:50,
        marginLeft:20,

    },
    numbs:{
        width:100,
        height:50,
        paddingTop:20,
        fontWeight:"bold",
        alignItems:"center",
        color:"white",
        justifyContent:"center",
        textAlign:"center",
    },
    pickerbox:{
        fontWeight:900,
        padding:10,
    },
    removeBtn:{
    width:50,
    height:50,
    borderRadius:200,
    backgroundColor:"rgba(100,125,150,.5)",
    alignItems:"center",
    justifyContent:"center",
    },
    addBtn:{
    width:50,
    height:50,
    borderRadius:200,
    backgroundColor:"rgba(100,125,150,.5)",
    alignItems:"center",
    justifyContent:"center",
    },
    middleview:{
        flex:1,
        minHeight:"100%",
        padding:20,
    },
    bottom:{
        backgroundColor:"grey",
    },
})
