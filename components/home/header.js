import { StyleSheet,TouchableOpacity, Text, Image,View } from 'react-native';
import { useState,useEffect } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useSelector } from 'react-redux';
import Searcher from './Searcher';



const Header=({navigation})=>{

const [activeTab, setactiveTab] = useState("Delivery");
const grouped=[];

const clength = useSelector((state) => state.selectedItems.item);
const cartsl=clength.map((all)=>grouped.push(all.amount));
const [cartlength, setcartlength] = useState(cartsl.length);

useEffect(() => {
  let loaded=false;
  let ans=true;

  if(!loaded){
     ans=grouped.reduce((a,b)=>a+b,0);
    grouped.length>0?setcartlength(ans):false;


  }
  else{false}

  setcartlength(ans)

  return () => {
    let loaded=true
  }
}, [grouped])


return(<>
        <View style={styles.totop}>

       <Image style={{marginTop:10,width:"60%",height:"220%",position:"absolute",borderRadius:10,}}
        source={require("../../assets/images/ueo.png")}
        />
        {/* 0245183708 */}
        <View style={styles.cartposition}>

    <TouchableOpacity style={styles.cartBack} onPress={()=>navigation.navigate("Cart")}>
<Ionicons style={styles.carti} name="cart" size={24}/>
</TouchableOpacity>
<View style={styles.cartnum}>
    <Text style={styles.smalltxt}>
    {cartlength}
    </Text>
  </View>
    </View>
    <View style={styles.firstsect}>
    
    <Mydelivery
         btnColor="black"
         textColor="rgba(255,255,255,.5)"
         text="Delivery"
         activeTab={activeTab}
         setactiveTab={setactiveTab}
          />
       <Mypickup
        btnColor="rgba(255,255,255,.5)"
        textColor="black"
        text="Pickup"
        activeTab={activeTab}
        setactiveTab={setactiveTab}

         
         />

    </View>
  
        </View>
      <Searcher navigation={navigation} activeTab={activeTab}/>

        </>

)
}

const Mydelivery=(props)=>{
    return(
      <View>
      <TouchableOpacity onPress={()=>props.setactiveTab(props.text)} style={{
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
        width:100,
        height:50,
        justifyContent:"center",
        backgroundColor:props.activeTab==props.text?"black":"rgba(255,255,255,.5)",
      
        }}>
        <Text style={{textAlign:"center",fontWeight:"900",fontSize:17,color:props.activeTab==props.text?"rgba(255,255,255,.5)":"black",}}>
            {props.text}</Text>
      </TouchableOpacity>
      </View>
   )
}
const Mypickup=(props)=>{
    return(
      <View>
      <TouchableOpacity  onPress={()=>props.setactiveTab(props.text)} style={{
        borderBottomRightRadius:50,
        borderTopRightRadius:50,
        height:50,
        width:100,
        justifyContent:"center",
        backgroundColor:props.activeTab==props.text?"black":"rgba(255,255,255,.5)",
        }}>
        <Text  style={{textAlign:"center",fontWeight:"900",fontSize:17,color:props.activeTab==props.text?"rgba(255,255,255,.5)":"black",}}>
          {props.text}</Text>
      </TouchableOpacity>

      </View>
   )
}



export default Header

const styles=StyleSheet.create({
  totop:{
    flexDirection:"row",alignSelf:"center",paddingTop:100,
  },
  firstsect:
    {padding:5,
     borderWidth:3,
     borderColor:"rgba(100,125,150,.1)",
     borderRadius:50,
     flexDirection:"row"
  },
  buttons:{
     backgroundColor:"rgba(255,255,255,.5)",
  },
  cartposition:{
    width:"73%",
    padding:5,
    borderRadius:300,
    zIndex:1000000,
    position:"absolute",
    top:30,
    left:0,
    right:0,

  },
  cartBack:{
    backgroundColor:"rgba(100,125,150,.5)",
    height:40,
    width:40,
    borderRadius:100,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"flex-end",


  },
  carti:{color:"black"},
  cartnum:{
    backgroundColor:"rgb(0,215,245)",
    borderRadius:100,
    height:20,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"flex-end",
    marginTop:-10,
    width:20,



  }


})

