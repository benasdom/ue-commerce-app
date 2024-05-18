import { StyleSheet,TouchableOpacity,Image, Text,ScrollView, View, ImageBackground,ActivityIndicator, Dimensions } from 'react-native';
import { clear } from '../../redux/reducers/cartReducer';
import { useDispatch,useSelector } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons"



export default function TodoItems({navigation,activeTab,Refreshing,setRefreshing,index,...item}){

   const newitems={...item,id:index.toString(),activeTab:activeTab}
   const dispatch=useDispatch();
   const selecteds = useSelector((state) => state.selectedItems.item);

   const notloaded=()=>{
    setRefreshing(true); 
    }

   const checkavailability=()=>{
    newitems.
    thumbnail && newitems.price.current_price?navigation.navigate("Details",{newitems}):notloaded();
    dispatch(clear());


   }
  
    return(
      <TouchableOpacity activeOpacity={1}  onPress={checkavailability}>
       
          <View style={styles.buttons}>
          <ImageBackground  style={styles.bgimage} source={require("../../assets/images/ueb.png")}>
          <Image style={[{width:"100%",height:"100%",borderRadius:6,},item.thumbnail?{}:styles.bgimagenores]}
        source={{uri:item.thumbnail}}
        />
        </ImageBackground>
      <View style={{padding:5,paddingBottom:10,}}>
      <Text style={[item.thumbnail?{color:"rgb(255,270,0)",fontSize:7}:styles.bgimagenores]}>{item.title.replace("Sponsored Ad - ","").split('').slice(0,10).join('')+""}</Text>

      <Text style={[{color:"rgba(200,200,200,.8)",fontSize:8,textDecorationLine:"line-through"},item.thumbnail?{}:styles.bgimagenores]}>
      <Ionicons name={"cash"} style={item.thumbnail?{color:"rgba(90,100,110,0.4)"}:styles.bgimagenores} size={12}/>
        
        {" GHS"+((item.price.before_price*1)+10).toFixed(2)}</Text>
      <Text style={[{color:"white",fontSize:10,},item.thumbnail?{}:styles.bgimagenores]}>
      <Ionicons name={"cash"} style={[{color:"rgba(100,180,160,.5)"},item.price.current_price?{}:styles.bgimagenores]} size={11}/>
   {item.price.current_price?" GHS "+((item.price.current_price*1)+10).toFixed(2):""} 
</Text>
       

      </View>
           </View>
             
      </TouchableOpacity>
    )
}
const acceptedWidth=(Dimensions.get('window').width)/(4.1);

const styles=StyleSheet.create({
          buttons:{
            padding:5,
            height:170,
            borderRadius:10,
            width:4.1*100>acceptedWidth?acceptedWidth:100,
            margin:1,
            backgroundColor:"rgba(150,150,190,.1)",

          }
          ,
          bgimage:
            {width:"100%",
            height:"60%",
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundColor:"whitesmoke",
            borderRadius:6}
          ,
          bgimagenores:
        {
          backgroundColor:"rgb(60,70,80)",
          borderRadius:3,
          marginTop:1.2,
          overflow:"hidden"
        }
  }
  )
  