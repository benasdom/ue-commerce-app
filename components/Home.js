import { StyleSheet, SafeAreaView  } from 'react-native';
import { useState,useEffect} from 'react';
import Header from './home/header'
import ValdationModal from './home/ValdationModal';
import Footer from './home/footer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch,useSelector } from 'react-redux';
import { keepdetails } from '../redux/reducers/cartReducer';



export default function Home({navigation}) {
  const  [durations, setdurations] = useState(true);
  const [storedvalues, setstoredvalues] = useState({myemail:"",myphone:"ddfa",myuid:"dfd"});
  const dispatch=useDispatch();
  const selectaccount = useSelector((state) => state.selectedItems.credentials);

   useEffect(() => {
    AsyncStorage.getItem("Userlogged")
    .then((ress)=>{
   if (ress==null){
    setdurations(true);
   }
   else{
    setstoredvalues(JSON.parse(ress));
    dispatch(keepdetails({myemail:storedvalues,myphone:"ddfa",myuid:"dfd"}));    
    setdurations(false);
   }
})
    .catch(err=>err?setdurations(true):false)
   }, [storedvalues])

  return (
    <SafeAreaView style={styles.container}>
     { !selectaccount.myemail? <ValdationModal navigation={navigation}/>:false}
    <Header navigation={navigation}/> 
    <Footer navigation={navigation} /> 
    {/* <Details/> */}

    </SafeAreaView>
   
  );

}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"rgba(5, 12, 20, 0.9)",
    flexDirection:"column",
  }
})