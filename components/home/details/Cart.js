import { View, Text,Image,ImageBackground,StyleSheet,TouchableOpacity,ScrollView,ActivityIndicator, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { useSelector,useDispatch } from 'react-redux';
import {removal} from '../../../redux/reducers/cartReducer';
 import Payment from './Payment';
 import { getFirestore, collection, doc,setDoc,serverTimestamp } from "firebase/firestore";
import fireapp from '../../firebasefile'

export default function Cart({navigation}) {
    const [indics, setindics] = useState(false)
    const [totalfee, settotalfee] = useState(0)
    const selected = useSelector((state) => state.selectedItems.item);
    const multiplied=[];
    selected.map((all)=>multiplied.push(parseFloat(all.amount)*parseFloat(all.price)));
    const selectaccount = useSelector((state) => state.selectedItems.credentials);
    const grouped=[];
    useEffect(() => {
      let loaded=false;
      let ans=true;
    
      if(!loaded){
         ans=multiplied.reduce((a,b)=>a+b,0);
        multiplied.length>0?settotalfee(ans):false;
    
    
      }
      else{false}
    
      settotalfee(ans)
    
      return () => {
         loaded=true
      }
    }, [multiplied])
     const cloudDate=new Date()+"";
     const checkingout=()=>{
      selected.length>0?
        selected.map((all)=>grouped.push({all,index:cloudDate,status:"pending"})).reverse():
        setindics(false);
        selected.length>0?
        sendMessageToTelegram(grouped):false;
        selected.length>0?
        addToFirebase(grouped):false;

    } 
   
    
    
    const dispatch=useDispatch();
    const removed=(propId,propName)=>{
        dispatch(removal({propId,propName}))


    }

//start
async function addToFirebase(ordered) {
  try {
    setindics(true);  // Assuming this sets a loading indicator
    const dbs = getFirestore(fireapp);
 
     const docId = `${new Date()}${selectaccount.myuid}`;
 
    const uidrefdoc=doc(dbs, selectaccount.myemail, docId);
    await setDoc(uidrefdoc,{
      item: ordered,
      user: selectaccount.myemail,
     });
     const purchased = grouped[grouped.length - 1].all;
    setindics(false);
    navigation.navigate("Orders", { purchased });

    console.log("Order added successfully!");  // Example success message
  } catch (err) {
    console.error("Error adding order:", err);
    Alert.alert(err.message);  // Use error message for a user-friendly alert
    setindics(false);
  }
}

    
   //end
    // const idgen=new Date();
    // const addToFirebase=(ordered)=>{
    //     setindics(true);
    //     const db=firebase.firestore();
    //     db.collection(''+selectaccount.myemail+'').doc(idgen+selectaccount.myuid).set({
    //     item:ordered,
    //     user:selectaccount.myemail,
    //    dateAt:firebase.firestore.FieldValue.serverTimestamp().toString(),
    //     })
    //     .then(()=>{
    //  const purchased=grouped[grouped.length-1].all;           
    //  setindics(false);
    //                 navigation.navigate("Orders",{purchased});
    //   })
    //     .catch(err=>{
    //     Alert.alert(err);
    //     setindics(false)});}
    
  async function sendMessageToTelegram(message) {
    const token = "5884061429:AAELqHd6GJbunEhFSoGAv8l1R61Xi0NDCDc";
    const chatId = "815965867";
    const telegramUrl = 'https://api.telegram.org/bot' + token + '/sendMessage';
    
    const params = {
      chat_id:chatId,
      text: message
    };
    
    try {
      const response =params.text.length>0? await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }):false;
      // console.log('Message sent to ue assist');
    } catch (error) {
      console.error('Error sending message to ue assist:', error);
    }
  }
  




    const  checkoutitems=()=>{
        checkingout();
        setindics(true);
        

        }
  return (
    <View style={{flex:2,color:"rgba(200,200,200,.8)", }}>
 
        <View style={styles.top}>
        <TouchableOpacity style={styles.prev}  onPress={()=>navigation.goBack()}>
      <Ionicons name={"arrow-back"} style={{color:"white"}} size={25}/>

       </TouchableOpacity>
         <View style={styles.textis}>
         <Text style={styles.texttop}>Cart Items</Text>
            <Ionicons style={styles.cart} name="cart" size={30}/>
         </View>

        </View>

        <ScrollView style={{backgroundColor:"rgba(5, 12, 20, 0.9)",height:"100%"}}>
            {selected.length>0?selected.map((cartlist,index)=>{
                return(
                    <TouchableOpacity  key={index+""} activeOpacity={1} >
       
                    <View style={styles.buttons}>
                    <ImageBackground  style={styles.imgpart} source={require("../../../assets/images/ueb.png")}>
          <Image style={{width:"100%",height:"100%",borderRadius:6,}}
                  source={{uri:cartlist.image}}
                  />
       
                        </ImageBackground>
                
                <View style={styles.textpart}>
                    <View style={styles.textdiv}>
                    <Text style={styles.headtext}>{cartlist.name.split('').slice(0,25).join('')+"..."}</Text>
                <Text style={styles.pricenamount}>{"GHS "+cartlist.price}</Text>
                <Text style={styles.pricenamount}>x{cartlist.amount}</Text>
                 
                    </View>
             
                  {/* <Text style={{color:"white",fontSize:10,textDecorationLine:"line-through"}}>{cartlist.oldPrice}</Text> */}
                <View style={styles.removepos}>
                <TouchableOpacity onPress={()=>{removed(index,cartlist.name)}} style={styles.remove}>
                <Text style={styles.remtxt}>remove</Text>
                 </TouchableOpacity>
                </View>
                </View>
                     </View>
                       
                </TouchableOpacity>
                )
            }).reverse():<Emptycart/>}
        </ScrollView >
        <View style={{backgroundColor:"rgba(5, 12, 20, 0.9)",padding:3}}>


        <Payment indics={indics} totalfee={totalfee} checkoutitems={checkoutitems} >
       
              
        {selected.length>0?indics && <ActivityIndicator size={30}  />:indics}
            
        </Payment> 
        </View>


    </View>
  )


}

const Emptycart=()=>{
    return(
        <View style={styles.empty}>
     <View style={styles.emptyImg}>
      <Ionicons name={"cart-outline"} size={150} style={styles.nores}/>
      
    </View>
    <View style={styles.emptytext}>
      <Text style={styles.emtxt}>                 
      <Ionicons name={"warning-outline"} size={20}/>
 Cart is empty
      </Text>
    </View>
   </View>

    )
}

const styles=StyleSheet.create({
    texttop:{
        padding:10,
        fontSize:20,
        color:"rgba(200,200,200,.8)",
    },
    textis:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
      paddingTop:50,

    },
    textdiv:{
        height:"70%",
    },
    removepos:{
        height:"30%",
        justifyContent:"center",
    },
        top:{
        padding:10,
        paddingTop:50,
        flexDirection:"row",
        backgroundColor:"rgba(5, 12, 20, 0.9)",
        justifyContent:"center",



    },
    cart:{
      color:"rgba(200,200,200,.8)",
        padding:10,
  
},
buttons:{
    padding:5,
    height:200,
    flexDirection:"row",
    justifyContent:"space-between",
    borderRadius:10,
    width:"95%",
    margin:2,
    alignSelf:"center",
    backgroundColor:"rgba(100,125,150,.2)",

  },
      prev:{
        display:"flex",
        position:"absolute",
        alignContent:"center",
        justifyContent:"center",
        textAlign:"center",
        width:40,
        height:40,
        padding:5,
        backgroundColor:"rgba(205,205,255,.1)",
        borderRadius:10,
        left:0,
        marginTop:60,
        marginLeft:20,

    },
  textpart:{
    padding:10,
    backgroundColor:"rgba(110,135,160,.1)",
    width:"50%",
  },
  imgpart:{width:"50%",height:"100%"},
  headtext:{
    color:"yellow",
    padding:5,
    fontSize:10,
    backgroundColor:"rgba(0,0,0,.2)",
    borderRadius:10,
    overflow:'hidden',
},

pricenamount:
    {color:"white",
    fontSize:10,
    padding:3,
}
,
remove:{
    backgroundColor:"rgba(100,110,120,.3)",
    padding:10,
    justifyContent:"center",
    marginTop:10,
    borderRadius:5

},
remtxt:{
    textAlign:"center",
    color:"rgba(200,200,200,.5)",

},


empty:{
    width:"100%",
    justifyContent:"center",
    paddingBottom:30,
    marginTop:100,
  },
  emptyImg:{
    width:"100%",
    justifyContent:"center",
    flexDirection:"row",
    height:300,
},
  emptytext:{
    width:"100%",
    justifyContent:"center",
    padding:10,
  },
  emtxt:{
    textAlign:"center",
    fontSize:20,
    borderRadius:10,
    overflow:"hidden",
    padding:20,
    color:"rgba(200,200,200,.3)",
    letterSpacing:5,

  },
  nores:{
    width:150,
    height:150,
    alignSelf:"center",
    color:"white",
    fontWeight:100,
    borderRadius:500,
  },




})
