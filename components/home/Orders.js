import { View,Image, Text,ImageBackground,TouchableOpacity,StyleSheet,FlatList, Alert,ActivityIndicator } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useSelector } from 'react-redux';
import fireapp from '../firebasefile'
  import { getFirestore, collection, getDocs, getDoc,doc, updateDoc } from "firebase/firestore";
 
export default function Orders({navigation}) {
const [activeTab, setactiveTab] = useState("Open Orders");
const [complete, setcomplete] = useState("Open Orders");
const [display, setdisplay] = useState("hide");
const structure=[{all:{
  amount: "",
   city: "",
    id: "",
    image:null, 
landmark: "",
 name: "",
  price: "", 
  region: "",
  created:""}}]
const [pload, setpload] = useState(structure);
const overall = useSelector((state) => state.selectedItems);
const selectaccount = useSelector((state) => state.selectedItems.credentials);



const completed=overall.completed
const openitems=overall.item
let daction=[""];

const callaction=(a)=>{
daction.push(...a);
}
//start update
const updatequery = collection(getFirestore(fireapp), selectaccount.myemail);
const updatecheck = async (one,two) => {
  try {
 
    const db = getFirestore(fireapp);  
 
    const docRef = doc(db, selectaccount.myemail, `${one}dfd`); // Document reference

    // Get the document data first
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists) {
      const itemToUpdate = docSnapshot.data().item; // Access the item object
    
       itemToUpdate.status = 'updated value'; 
 
       await updateDoc(docRef, {
        item: itemToUpdate,  
       });
    }
    else{
      console.log("Document wasn't updated")
    }

    Alert.alert("Documents updated successfully!");  
  } catch (error) {
    console.error("Error updating documents:", error);
    Alert.alert(error.message);   
  }
};
//end update
 //upadte
//  const updatequery=firebase.firestore().collection(selectaccount.myemail)

//  const update=()=>{
//   updatequery.get().docs.filter((doc,b,c)=>  doc.data().timestamp===(received.timestamp))
//   .map(a=>a===received.title
//     ?a.ref.update({status:"resolved",updated:firebase.firestore.FieldValue.serverTimestamp()})
//     :a.ref
//     )}
//     const  updatecheck= async(one,two)=>{
//       const querySnapshot = await firebase.firestore()
//       .collection(selectaccount.myemail)
//       .get();
    
    // Loop through the snapshots.docs array
    // querySnapshot.docs.forEach((doc,b,c) => {
      // Get the document reference
      // const docRef = doc.ref;
      // let ctimed= doc.data();
      //  ctimed.item.all.name==one && ctimed.item.index==two?
        // ctimed.item:Alert.alert("Update Failed")

    // b==8?console.log(ctimed):false
      // Update the document with some new data
      // docRef.update({
      //   status: "resolved",
      //   updated: firebase.firestore.FieldValue.serverTimestamp()
      // });
    // });
    
      // }
   //update
   const [oops, setoops] = useState(false)
useEffect(() => {
  completed==false?setcomplete("Order Pending..."):setcomplete("Order Complete");

 setTimeout(async ()=>{
     const db = getFirestore(fireapp);  
    const queries = getDocs(collection(db, selectaccount.myemail));
      const ordererro=()=>{
      setoops(true);
     }
   oops? Alert.alert("Oops 😯","Sorry there was an error loading orders",[{
    text:"Ok",
    onPress:()=>setoops(false)
 
  }]):false

       await queries
    .then((snapshot)=>{snapshot.docs
      .sort((a, b) => {
         let aid=a.id.replace(/\(G.*/gim,"(GMT)");
        let bid=b.id.replace(/\(G.*/gim,"(GMT)");

        const aDate = new Date(aid).getTime();
        const bDate =  new Date(bid).getTime();;


        if (aDate < bDate) {
          return -1;
        }
        if (aDate > bDate) {
          return 1;
        }
        return 0;
      })
      .map((aa,bb,cc)=>
      aa.data().item
    .map((a,b,c)=>pload && a?(pload.push(a)):ordererro())
      )})
      .catch(err=>{
        Alert.alert("Oops 😯",err);
        }
        ).finally((e)=>setdisplay("display"));
   // }


},100)
 

 

 
}, [completed,display])

const confirmReceived=(receivedObj)=>{
  Alert.alert("Confirm as received",` ✨${receivedObj.all.name.split("").slice(0,27).join('')+""}✨ Package🎁 received?`,[{
    text:"No",
    onPress:()=>false
 
  }
    ,
    {
      text:"Yes",
      onPress:()=>{
          //  AsyncStorage.setItem("received",JSON.stringify(historyObject))
          // .then(()=>{dispatch(storeHistory({myemail:altuser,myphone:phonenum,myuid:uids}));})
          // .catch(err=>alert(err));
          updatecheck(receivedObj.index,receivedObj.all.name);
  
  
           }    }

  ])
 }


  return (
    <ImageBackground  style={[styles.image,styles.container]} source={require("../../assets/images/ueb.png")}>
    <View style={[styles.back,styles.container]} >
    <TouchableOpacity style={styles.prev}  onPress={()=>navigation.goBack()}>
      <Ionicons name={"arrow-back"} style={{color:"white"}} size={25}/>

       </TouchableOpacity>
      <View style={styles.orderSection}>
    
          <OpenOrders activeTab={activeTab}  btnColor="white" text="Open Orders" setactiveTab={setactiveTab}/>
     {/* <CloseOrders  activeTab={activeTab}btnColor="white"  text="Closed Orders" setactiveTab={setactiveTab}/> */}

      </View>
      <View style={styles.ordercontnet}>
        <View style={styles.listorders}>
          
            {

            pload.length>1?
            //kl
            <FlatList
      //  ListEmptyComponent={NoData}
       showsHorizontalScrollIndicator={true}
      //  ListFooterComponent={loader ? <MoreLoader /> : null}
      //  ItemSeparatorComponent={ListSeparator}
      //  onEndReachedThreshold={0.5}
      //  onEndReached={getMore}
      vertical
      numColumns={1}
// key extractor takes strings for keys
      keyExtractor={(pload,index)=>index.toString()}
    data={pload.filter((a,b,c)=>{return (a.all.name !="" && c.indexOf(a)===b)})
    .reverse()}
    initialNumToRender={4}
    maxToRenderPerBatch={4}
    windowSize={21}
    renderItem={
      ({item,index})=>
      {      return(
        <TouchableOpacity  key={index+""} activeOpacity={1} >

        <View style={styles.buttons}>
            <View style={styles.imgpart}>
            <Image style={{width:"100%",borderRadius:6,height:"100%",}}
      source={{uri:item.all.image}}
      />
            </View>
    
    <View style={styles.textpart}>
        <View style={styles.textdiv}>
        <Text style={styles.headtext}>{item.all.name.split('').slice(0,30).join('')+"..."}</Text>
    <Text style={styles.pricenamount}>{`Date ${item.index}`.split('').slice(0,30).join('')+"..."}</Text>
    <Text style={styles.pricenamount}>{"GHS "+item.all.price}</Text>
    <Text style={styles.pricenamount}>x{item.all.amount}</Text>
        
        </View>
 
      {/* <Text style={{color:"white",fontSize:10,textDecorationLine:"line-through"}}>{item.oldPrice}</Text> */}
    <View style={styles.removepos}>
    <View style={styles.flexop}>
    <TouchableOpacity style={styles.remove}>
    <Text style={styles.receivedTxt}>{item.status?item.status:complete}</Text>
     </TouchableOpacity>
    <TouchableOpacity style={styles.received} onPress={()=>confirmReceived(item)}>
      <Text style={styles.receivedTxt}>{"received ?"}</Text>
    </TouchableOpacity>

    </View>
    </View>
    </View>
         </View>
           
    </TouchableOpacity>
    )}
    }
      />:display=="hide"?
     (<View style={{justifyContent:"center",padding:3,alignItems:"center",textAlign:"Center"}}>
        <ActivityIndicator size={50}/><
          Text style={{padding:2,color:"white",}}>Getting history </Text>
          </View>):
         (<View style={{justifyContent:"center",padding:10,height:500,alignItems:"center",textAlign:"Center"}}>
           < Text style={{padding:2,color:"white",}}>Oops 😯 No results were found </Text>
            </View>)}

  </View>

        </View>

      
  </View>


    </ImageBackground>
    
  )
}

const OpenOrders=(props)=>{
  return(
    <View style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",}}>
    <TouchableOpacity  style={{   
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    height:"100%",
   
  }}
   onPress={()=>props.setactiveTab(props.text)}>
      <Text style={{color:props.activeTab==props.text?"rgb(50,200,220)":"grey",fontSize:props.activeTab==props.text?20:15}}>
          {props.text}</Text>
    </TouchableOpacity>
    </View>
      )
}
const CloseOrders=(props)=>{
  return(
    <View style={{height:"100%",flexBasis:"50%",}}>
    <TouchableOpacity  style={{ 
    alignItems:"center",
     height:"100%",
    justifyContent:"center",
    borderTopWidth:3,
   borderTopColor:props.activeTab==props.text?"rgb(100,230,230)":"grey",
  }}
    onPress={()=>props.setactiveTab(props.text)} >
      <Text style={{color:props.activeTab==props.text?"rgb(50,200,220)":"grey",fontSize:props.activeTab==props.text?20:15}}>
          {props.text}</Text>
    </TouchableOpacity>
    </View>  )
}







const styles=StyleSheet.create({
  container:{flex:1,
    backgroundColor:"rgba(5, 12, 20, 0.9)",
  },
  image:{
    width:"100%",

    alinSelf:"center",
  },
  back:{
    backgroundColor:"white",
  },
  orderSection:{
    flexDirection:"row",
    paddingTop:60,
    justifyContent:"center",
    alignItems:"center",
    height:150,

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
    zIndex:10,
    marginLeft:20,

},
 
  listorders:{
    backgroundColor:"rgba(30,55,80,.2)",
    height:"90%",
  },
  text:{
    fontSize:20,
    color:"white",
  }
,
  received:{
    display:"flex",
    justifyContent:"center",
    padding:5,
    height:30,
    borderRadius:5,
    width:"50%",
    alignContent:"center",
    backgroundColor:"rgba(70,85,100,.9)",
  },
  receivedTxt:{
    textAlign:"center",
    color:"rgba(200,200,200,.7)",
    fontSize:12,
  },
  textdiv:{
      height:"35%",
  },
  removepos:{
      height:"30%",
      justifyContent:"center",
  },
  flexop:{
    flex:1,
    justifyContent:"space-between",
    alinSelf:'center',
    height:50,
    alignItems:'flex-end',
     flexDirection:'row',
  },
      top:{
      padding:10,
      flexDirection:"row",
      backgroundColor:"white",
      justifyContent:"center",


  },
  cart:{
      color:"black",
      padding:10,

},
buttons:{
  padding:10,
  height:400,
  flexDirection:"column",
  justifyContent:"space-between",
  borderRadius:10,
  alignSelf:'center',
  width:"85%",
  margin:"auto",
  marginBottom:7,
  backgroundColor:"rgba(130,155,180,.4)",

},
textpart:{
  padding:20,
  width:"100%",
},
imgpart:{width:"100%",height:"50%"},
headtext:{
  color:"grey",
  fontSize:13,
  padding:3,
  borderRadius:10,
  color:"white",
  overflow:"hidden",
  backgroundColor:"rgba(0,0,0,.2)",
},

pricenamount:
  {color:"rgba(200,200,200,.7)",
  fontSize:11,
  padding:5,
}
,
remove:{
  display:"flex",
  justifyContent:"center",
  padding:5,
  height:30,
  width:"50%",
  alignContent:"center",
},
 

checkout:{
  backgroundColor:"rgb(0,195,235)",
  position:"absolute",
  height:60,
  alignItems:"center",
  justifyContent:"center",
  borderRadius:5,
  zIndex:1000000,
  left:0,
  right:0,
  bottom:0,
  

},
checkouttxt:{
  color:"white",
  fontWeight:"bold",
  fontSize:10,
}



})