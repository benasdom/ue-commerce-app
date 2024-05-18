import { View, Text, Modal,Image,StyleSheet,Alert,Dimensions, ActivityIndicator,KeyboardAvoidingView, Pressable, Touchable } from 'react-native'
import React, { useMemo,useState } from 'react'
import { Button } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons"
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { keepdetails } from '../../redux/reducers/cartReducer'
import { Platform } from 'react-native';
import { useDispatch,useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import fireapp from '../firebasefile'
import { getFirestore, collection, doc, getDocs,setDoc,serverTimestamp } from "firebase/firestore";
 import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";




export default function ValdationModal() {
    const [modstate, setmodstate] = useState(true)
    const [username, setusername] = useState("")
    const [username2, setusername2] = useState("")
    const [password2, setpassword2] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState(null)
    const [indics, setindics] = useState(false)
    const [cpword, setcpword] = useState("")
    const [phone, setphone] = useState("")
    const [pass, setpass] = useState(true)
    const [Signup, setSignup] = useState(true)
    const [confirm, setconfirm] = useState(true)
    const auth = getAuth(fireapp); 
 

    const selectaccount = useSelector((state) => state.selectedItems.credentials);

//     const notified =async()=>{
//    const {status}=await Permission.getAsync(Permission.NOTIFICATIONS);
//    let finalStatus=status;
//    if(finalStatus!=="granted"){
//     const {status}=await Permission.askAsync(Permission.NOTIFICATIONS);
//     finalStatus=status;
//    }
// if(finalStatus!=="granted"){return}

// let token =await Notification.getExpoPushTokenAsync();
// console.log(token)


//     }





const dispatch=useDispatch();

const passuser=async (phonenum,usersname,uids)=>{
    let altuser=""+usersname+"";
   
    //the start

async function createUser(uids, phonenum, altuser) {
    try {
      const dbs = getFirestore(fireapp);  // Optional: Provide your Firebase fireapp instance
      const userRef = doc(collection(dbs, "userinfo"), uids);  // Use 'uids' as the document ID
  
      // Create or update the document with user data
      await setDoc(userRef, {
        userid: uids,
        tel: phonenum,
        person: altuser,
        createdAt:serverTimestamp(),
      });
  
      // Handle successful user creation (e.g., set state)
      console.log("User created/updated successfully!");  // Example usage
      setmodstate(false);
  
      // Dispatch details to state if needed (assuming 'dispatch' and 'keepdetails' are defined)
      dispatch(keepdetails({ myemail: altuser, myphone: phonenum, myuid: uids }));
    } catch (err) {
      console.error("Error creating/updating user:", err);
      Alert.alert(err.message);  // Use error message for a more informative alert
    }
  }
  
  // Call the function with user data and the UID variable
  createUser(uids, phonenum, altuser);
  
  //the end 
 
}



const passuserin=async (emailin,uids)=>{
    let altuser=""+emailin+"";

 
    async function getUserData(altuser) {
      try {
        const dbs = getFirestore(fireapp);
        const userRef = collection(dbs, altuser);  
    
         const querySnapshot = await getDocs(userRef);
    
        // Handle retrieved data (e.g., dispatch to state)
        console.log("User data:", querySnapshot.docs);  // Array of retrieved documents
    
        // Check if any documents were found (optional)
        if (!querySnapshot.empty) {
          // Extract data from the first document (assuming one user per collection)
          const userData = querySnapshot.docs[0].data();
    
          // Store user data in AsyncStorage
          await AsyncStorage.setItem("Userlogged", JSON.stringify(altuser));
          // Dispatch user details to state (assuming dispatch and keepdetails are defined)
          dispatch(keepdetails({ myemail: altuser,  // Use altuser if myemail is not found
                                 myphone: "unset", myuid: uids }));
          setmodstate(false);
        } else {
          console.warn("No user data found in the collection:", altuser);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        Alert.alert(err.message);  // Use error message for a more informative alert
      }
    }
    // Call the function with the collection name (altuser)
    getUserData(altuser);
    
  
    // const dbsin= getFirestore(fireapp);
    // dbsin.collection(altuser).get().then((snapshot=>console.log(snapshot.docs)))
    // .then(()=>{
    //     AsyncStorage.setItem("Userlogged",JSON.stringify(altuser))
    //     .then(()=>{ 
    //            dispatch(keepdetails({myemail:altuser,myphone:"unset",myuid:uids}));  
    // })
    //     .catch(err=>alert(err));


    // setmodstate(false)

    // })
    // .catch(err=>{
    // Alert.alert(err);
    // }
    // );
        
}


//start

 // Optional: Provide your Firebase fireapp instance

const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;

    // Pass user information (replace with your logic)
    passuser(phone, user.email, user.uid);

    console.log("User created successfully!");  // Example success message
  } catch (error) {
    console.error("Error creating user:", error);
    Alert.alert(error.message);  // Use error message for a more informative alert
    setindics(false);
  }
};

//end
// const handleSignUp=()=>{
//     auth.
//     createUserWithEmailAndPassword(username,password)
//     .then(useCredentials=>{
//         const user=useCredentials.user;
//         passuser(phone,user.email,user.uid)
//     })
//     .catch(error=>{alert(error.message);setindics(false)})
// }

 
 
const handleSignIn = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, username2, password2);
    const user = userCredential.user;

    // Pass user information (replace with your logic)
    passuserin(user.email, user.uid);

    console.log("User signed in successfully!");  // Example success message
  } catch (error) {
    console.error("Error signing in:", error);
    Alert.alert(error.message);  // Use error message for a more informative alert
    setindics(false);
  }
};

// const handleSignIn=()=>{
//     auth.
//     signInWithEmailAndPassword(username2,password2)
//     .then(useCredentials=>{
//         const userin=useCredentials.user;
//          passuserin(userin.email,userin.uid)

//     })
//     .catch(error=>{alert(error.message);setindics(false)})
// }
    const niceimage=useMemo(() =>  <Image
    style={styles.imgs}
    source={require("../../assets/images/ue-banner.png")}
    />, []) 
    const showPassword=()=>{
        setpass((prev)=>prev=!pass)
    }
    const showPasswordConfirm=()=>{
        setconfirm((prev)=>prev=!confirm)
    }
    const erroHandles=()=>{
         if(phone==""){
            seterror("Phone box must filled");
        return false;
        }  
        else if(phone.length !=10){
            seterror("Invalid phone length");
        return false;
        } 
            else if(username==""){
            seterror("Email must filled");
        return false;
        } 
       else if(username.length<7){
            seterror("Email must be at least 8 char long");
        return false;
        } 
        else if(password==""){
            seterror("password must filled");
        return false;
        }
        else if(password.length<7){
            seterror("password must be at least 8 char long");
        return false;
        }    else if(cpword !=password){
            seterror("Please retype the same password");
        return false;
        }
        else{
            handleSignUp();
            setindics(true);
            seterror(false);

            
        }
    }
    const erroHandlesloged=()=>{
     
            if(username2==""){
           seterror("Email must filled");
       return false;
       } 
       else if(password2==""){
           seterror("password must filled");
       return false;
       }
       else{
           handleSignIn();
           setindics(true);
           seterror(false);

           
       }
   }
  return (
<Modal
visible={modstate}
transparent
animationType={"slide"}
>



    <KeyboardAvoidingView behavior={Platform.OS=="ios"?'position':'undefined'}  style={styles.modalbox}>

<View style={styles.popup}>
     <View style={styles.textup}>
  
        <View style={styles.imgbox}>
        {niceimage}
        </View>
     </View>
     <ScrollView>
     {
    Signup?
    <View style={styles.forms}>
<View style={styles.imputs}>
  <View style={[styles.errors,{backgroundColor:error?"rgb(250,225,220)":"white"}]}>
      <Text style={styles.errotxt}>{error}</Text></View>
    <View style={styles.impbox}>
     <View style={styles.icons}><Ionicons style={{color:"black"}} name="person-outline" size={20}/></View>
     
      <TextInput style={styles.imp} keyboardType="email-address"  onChangeText={(e)=>setusername2(e)} placeholderTextColor={"grey"} placeholder={'Email'}/>
       <View style={styles.icons}><Ionicons style={{color:"black"}} size={20} name=""/></View>
  </View>
  <View style={styles.impbox}>
     <View style={styles.icons}><Ionicons style={{color:"black"}} name="lock-closed-outline" size={20}/></View>
     
      <TextInput style={styles.imp} secureTextEntry={!pass} onChangeText={(e)=>setpassword2(e)} placeholderTextColor={"grey"} placeholder={'Password'}/>
       <Pressable onPress={showPassword} style={styles.icons}><Ionicons style={{color:"black"}} size={20} name={pass?"eye-outline":"eye-off-outline"}/></Pressable>
  </View>
    <Button title="SIGN IN" onPress={erroHandlesloged}>
   <View style={styles.impbox} ></View>
  </Button>
  {indics?<ActivityIndicator size={30} style={{margin:5,color:"grey",}} />:false}

</View>


<Pressable onPress={()=>{setSignup(false)}} style={styles.signin}>
<Text style={styles.wish} >
      Wish to sign-up?
  </Text>
</Pressable>


</View>
        :
     <View style={styles.forms}>
      <View style={styles.imputs}>
        <View style={[styles.errors,{backgroundColor:error?"rgb(250,225,220)":"white"}]}>
            <Text style={styles.errotxt}>{error}</Text></View>
            <View style={styles.impbox}>
           <View style={styles.icons}><Ionicons style={{color:"black"}} name="call-outline" size={20}/></View>
           
            <TextInput style={styles.imp} keyboardType="phone-pad"   onChangeText={(e)=>setphone(e)} placeholderTextColor={"grey"} placeholder={'Phone'}/>
             <View style={styles.icons}><Ionicons style={{color:"black"}} size={20} name=""/></View>
        </View><View style={styles.impbox}>
           <View style={styles.icons}><Ionicons style={{color:"black"}} name="person-outline" size={20}/></View>
           
            <TextInput style={styles.imp} secureTextEntry={false} keyboardType="email-address"  onChangeText={(e)=>setusername(e)} placeholderTextColor={"grey"} placeholder={'Email'}/>
             <View style={styles.icons}><Ionicons style={{color:"black"}} size={20} name=""/></View>
        </View>
        <View style={styles.impbox}>
           <View style={styles.icons}><Ionicons style={{color:"black"}} name="lock-closed-outline" size={20}/></View>
           
            <TextInput style={styles.imp} secureTextEntry={!pass} onChangeText={(e)=>setpassword(e)} placeholderTextColor={"grey"} placeholder={'Password'}/>
             <Pressable onPress={showPassword} style={styles.icons}><Ionicons style={{color:"black"}} size={20} name={pass?"eye-outline":"eye-off-outline"}/></Pressable>
        </View>
        <View style={styles.impbox}>
           <View style={styles.icons}><Ionicons style={{color:"black"}} name="lock-closed-outline" size={20}/></View>
           
            <TextInput style={styles.imp} secureTextEntry={!confirm}  onChangeText={(e)=>setcpword(e)} placeholderTextColor={"grey"} placeholder={'Confirm password'}/>
             <Pressable onPress={showPasswordConfirm} style={styles.icons}><Ionicons style={{color:"black"}} size={20} name={confirm?"eye-outline":"eye-off-outline"}/></Pressable>
        </View>

          <Button title="SIGN UP" onPress={erroHandles}>
         <View style={styles.impbox} ></View>
        </Button>
        {indics?<ActivityIndicator size={30} style={{margin:5,color:"grey",}} />:false}

      </View>

    
    <Pressable onPress={()=>{setSignup(true)}} style={styles.signin}>
    <Text style={styles.wish} >
            Wish to sign-in?
        </Text>
    </Pressable>
    </View>
        
    }

     </ScrollView>
    </View>
    </KeyboardAvoidingView>

</Modal>

  )
}

const styles= StyleSheet.create({
    imgbox:{
        padding:5,
    },
    icons:{
        height:"100%",
        alignItems:"center",
        padding:5,
        justifyContent:"center",
        width:50,
        flexDirection:"row",
    },
    wish:{
        color:"rgb(50,170,200)",
        borderBottomWidth:2,
        borderBottomColor:"grey",

    },
    signin:{
        flexDirection:"row",
        justifyContent:"flex-end",
        padding:10,
        marginBottom:100,
        paddingTop:20,
    },

    imgs:{
        width:"40%",
        padding:5,
        height:50,
        alignSelf:"center",
    },
    impbox:{
    justifyContent:"space-between",
    borderWidth:2,
    borderColor:"transparent",
    borderRadius:10,
    marginBottom:5,
    width:"100%",
    backgroundColor:"rgb(245,245,250)",
    
    margin:1,
    height:40,
    flexDirection:"row",

    },
    errors:{
        justifyContent:"center",
        padding:10,
        alignSelf:"center",
        width:"100%",
        marginBottom:2,
        color:"white",
    },
    imp:{
        fontSize:12,
        width:"60%",
        maxWidth:"80%",
    },
    forms:{
        width:"100%",
        paddingLeft:50,
        paddingBottom:50,
        paddingRight:50,
        borderRadius:30,
        justifyContent:"flex-start",
        alignSelf:"center",
        height:"80%",



    },
    errotxt:{
        color:"red",
        textAlign:"center",
        width:"100%",
        alignSelf:"center"

    },
    modalbox:{
        flex:1,

        flexDirection:"column",
        padding:0,
        margin:0,
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:"rgba(10,20,70,.4)",

    },
    imputs:{
        flexDirection:"column",
        width:"100%",
        alignSelf:"center",
    },
    popup:{
        flexBasis:"75%",
        width:"100%",
        backgroundColor:"white",
        paddingTop:40,
        height:"75%",
        flexDirection:"column",
        borderWidth:1,
        borderTopColor:"white",
        borderTopEndRadius:50,
        borderTopStartRadius:50,
    },
})