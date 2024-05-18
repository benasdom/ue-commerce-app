
import { View, Text,Alert} from 'react-native'
import  React, {useRef} from  'react';
import {Paystack,paystackProps} from 'react-native-paystack-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { clearcart } from '../../../redux/reducers/cartReducer';



export default function Payment({checkoutitems,indics,totalfee}) {
  const selectaccount = useSelector((state) => state.selectedItems.credentials);
  const P_KEY="pk_test_dfc089d43af23196de29ce570074fbf168767617"
  const dispatch=useDispatch()

  const paystackWebViewRef=useRef(paystackProps.PayStackRef)
  const [total, settotal] = useState(0);
  useEffect(() => {
    let load=false;
    load==false?settotal(totalfee):false;
  
    return () => {
      load=true;
    }
  }, [totalfee])
  
		  return (
    <View>
      {/* paystackKey" | "billingEmail" | "phone" | "lastName" | "firstName" | "amount"
       | "currency" | "channels" | "refNumber" | "billingName" | ... 4 more ... |
        "activityIndicatorColor"> & React.RefAttributes<...>> */}
<Paystack 
buttonText="Pay Now"
showPayButton={true}
paystackKey={P_KEY}
paystackSecretKey="sk_test_1564a78d647cdf726918849c02591bf50ac2e91d"
amount={total.toFixed(2)}
billingEmail={`${selectaccount.myemail}`}
billingMobile="0272831301"
billingName={`${selectaccount.myemail}`.split("").slice(0,`${selectaccount.myemail}`.split("").indexOf("@"))}
channels={["mobile_money","card","ussd","qr","bank"]}
currency="GHS"
ActivityIndicatorColor="green"
ref={paystackWebViewRef}
onCancel={(e)=>{
 Alert.alert("Message","Transaction cancelled");
}}
onSuccess={(e)=>{
 checkoutitems();
 Alert.alert("Payment successful !🎉","Redirecting page please wait 🔄️.");
 dispatch(clearcart());

 
}}
onClose={(e)=>{
 Alert.alert("Message","Payment closed");
}}
onError={(e)=>{
 Alert.alert("Message","Sorry, transaction failed. Please try again");
}}

// autoStart={true}
/><TouchableOpacity 
onPress={total>0?()=>paystackWebViewRef.current.startTransaction():null}>
<Text style={{
  color:"white",
  textAlign:"center",
  alignItems:"center",
  backgroundColor:"rgb(0,145,200)",
  alignItems:"center",
  justifyContent:"center",
  padding:30,
  flexDirection:"row",
  position:"relative",
  zIndex:1000000,
  margin:"auto",
  left:0,
  right:0,
  bottom:0,
  
}} >Pay{total?`( GHS ${total.toFixed(2)})`:""}</Text>
</TouchableOpacity>

        </View>
  )
}

