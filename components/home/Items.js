import { StyleSheet,FlatList,Image,TouchableOpacity, RefreshControl,Text,Dimensions, View, Alert, ActivityIndicator, Platform,ToastAndroid } from 'react-native';
import React, { useLayoutEffect } from 'react';
// import { QueryClientProvider,QueryClient } from 'react-query';
import { useState,useEffect, Suspense } from 'react';
// import  axios from 'axios';
const TodoItems=React.lazy(()=>import('./todoitems'))
const acceptedHeight=(Dimensions.get('window').height*(.63));

export default function Items({navigation,find,activeTab}){

  return (
    
    <View style={styles.divide}>


<FlatListComponent find={find} activeTab={activeTab} navigation={navigation} numColumns={4}/>
    </View>

   
  )}
   function FlatListComponent({numColumns,navigation,find,activeTab}){
const [Indicator, setIndicator] = useState(false)

const [Refreshing, setRefreshing] = useState(false)

  
  const onRefresh=()=>{
    Refreshing?setname(prev=>prev=name):false;
    getData();
  }
const placehold=Array(30);
placehold.fill(
  {
    title:"",
    thumbnail:undefined,
    price:{current_price:"",before_price:"",currency:"-"},
    id:"",
  },
)
const [name, setname] = useState(placehold)
const [names1, setnames1] = useState(placehold)
const [names2, setnames2] = useState(placehold)
const [names3, setnames3] = useState(placehold)
const [names4, setnames4] = useState(placehold)
const [names5, setnames5] = useState(placehold)
const [resource, setresource] = useState(50)
const [NetworkError, setNetworkError] = useState(false)
const [Loader, setLoader] = useState(false)
 

 
const getData=()=>{
  setRefreshing(true);

  setname(placehold);


  let totaldata=[...names1,...names2,...names3,...names4,...names5];
  let finaldata;
  for(i=0;i<totaldata.length;i++){

    finaldata=totaldata.map((a,b,c)=>a.title==totaldata[i].title && b<i?(c[b]!=false?c[b]=false:c[b]=c[b]):c[b]).filter(a=>a)
    
    
    
    }
  return(

    
fetch(`https://benasdom.github.io/commerceapi/gadgetsapi.json`)
    .then(response => response.json())
    .then(response => {setIndicator(true); setnames1((res)=>res=response);setname((res)=>res=find?finaldata
      .filter((a,b,c)=>c.indexOf(a)==b)
      .map((aa,b,c)=>{return c[b+1]?(c[b+1].title!=aa.title?aa:false):aa})
      .filter((a,b,c)=>{return a.title.toLowerCase().includes(find.toLowerCase()?find.toLowerCase():find.toLowerCase())}):response)})
    .catch(err => setInterval(()=>{setNetworkError("Sorry :"+err)},500))
  .finally(()=>setRefreshing(false)));
  
 
}


const getData1=()=>{
 
  return(
fetch(`https://benasdom.github.io/commerceapi/bproductsapi.json`)
    .then(response => response.json())
    .then(response => {setIndicator(true);setnames2((res)=>res=[...res,...response])})
    .catch(err => setInterval(()=>{setNetworkError("Sorry :"+err)},500))
  );

}
const getData2=()=>{
  
  return(

    
fetch(`https://benasdom.github.io/commerceapi/sunscreenapi.json`)
    .then(response => response.json())
    .then(response => {setIndicator(true);setnames3((res)=>res=[...res,...response])})
    .catch(err => setInterval(()=>{setNetworkError("Sorry :"+err)},500))
  );


}
const getData3=()=>{
  
  return(

    
fetch(`https://benasdom.github.io/commerceapi/cosmeticsapi.json`)
    .then(response => response.json())
  .then(response => {setIndicator(true); setnames4((res)=>res=find?[...res,...response.data.filter((a,b,c)=>{return a.title.toLowerCase().includes(find.toLowerCase())})]:[...res,...response.data])})
  .catch(err => setInterval(()=>{setNetworkError("Sorry :"+err)},500))
  );


}
const getData4=()=>{
  return(
fetch(`https://benasdom.github.io/commerceapi/fserumapi.json`)
    .then(response => response.json())
  .then(response => {setIndicator(true);setnames5((res)=>res=[...res,...response])})
  .catch(err => setTimeout(()=>{setNetworkError("Sorry :"+err);network(`${err}`);},500))
  );

}

const network=(erd)=>{
    setRefreshing(false);
    erd?(Platform.OS=="android"?ToastAndroid.show(`${erd}`,2000):Platform.OS=="ios"?alert(`${erd}`):false):false;
  }

    useLayoutEffect(() => {
      let runs=false;
      if(!runs){ 
        getData1();
        getData2();
        getData3();
        getData4();
       }else{
       false
      }
    
      return () => {
        runs=true
      };
    }, [])

    useEffect(() => {
    
    setname(placehold);
    let runs=false;
    !runs? getData():false;
  
     return()=>{
      runs=true;
     }
     }, [find])

 
     
     
  return (
    
    <View style={styles.sections}>
      {name.length?<FlatList
      //  ListEmptyComponent={NoData}
       showsHorizontalScrollIndicator={true}
      //  ListFooterComponent={loader ? <MoreLoader /> : null}
      //  ItemSeparatorComponent={ListSeparator}
      //  onEndReachedThreshold={0.5}
      //  onEndReached={getMore}
      
    refreshControl={
      <RefreshControl
      refreshing={Refreshing}
      onRefresh={onRefresh}
      colors={["cyan","blue","lime","violet"]}
      />
    }
    
      vertical
      numColumns={numColumns}
// key extractor takes strings for keys
      keyExtractor={(item,index)=>index.toString()}
     
    data={name}
    initialNumToRender={4}
    maxToRenderPerBatch={4}
    windowSize={21}
    renderItem={
      ({item,index})=>
      {return(
    
    <TouchableOpacity>
{Indicator?false:<ActivityIndicator size={1} style={{margin:5,color:"grey",}} />}

<Suspense>
{<TodoItems {...item} index={index} Refreshing={Refreshing} activeTab={activeTab}  setRefreshing={setRefreshing} navigation={navigation}/>}
</Suspense>

   </TouchableOpacity>
   )}
    }
      />:<NoResult/>}
    </View>
   
  );
}

// // ------------------------------------
//       NOTICE 
//    ------------------------------------
   
// This code right below is to filter accurately by letter even if ont well arranged but extras would return 
// false as well as insufficent characters ... This means as far as it
//  is exact in character and missarranged, it would return the correct name perfectly.
// This is it

//  unarray.map(a=>a.split("").every(b=>b.match(/[udm9sr]/gim))?a:null).filter(a=>a)

//  This is it
// ------------------------------------
//       NOTICE 
//    ------------------------------------
//  -----------------------------------



//   return (
//     <View style={styles.divide}>
// {/* <FlatListComponent/> */}
// {/* <SectionListComponent/> */}
//     </View>
//   )
// FlatList

// FlatList
  // {/* section component */}
  // const SectionListComponent=()=>{
  //   const [Refreshing, setRefreshing] = useState(false)
  //   const [name, setname] = useState(DATA)
  //   const onRefreshed=()=>{
  //     setRefreshing(true);
  //     setname([...DATA,
  //       {
  
  //         data:["one","two","nice"],
  //         description:"This is some dummy text",    
  //       name:"Thoren",id:10},]);
  //         setRefreshing(false);
  //   }
  //   const DATA=[
  //     {
  //       title:"first",
  //       data:["one","two","three"],
  //     },
  //     {
  //       title:"first",
  //       data:["one","two","three"],
  //     },
  //     {
  //       title:"first",
  //       data:["one","two","three"],
  //     },
  //     {
  //       title:"first",
  //       data:["one","two","three"],
  //     },
  //     {
  //       title:"first",
  //       data:["one","two","three"],
  //     },
  //     {
  //       title:"first",
  //       data:["one","two","three"],
  //     },

    
  //     ];
  //   return(
  //       <SectionList
  //       numColumns={3}
  //       style={styles.sections}
  //     refreshControl={
  //       <RefreshControl
  //       refreshing={Refreshing}
  //       onRefresh={onRefreshed}
  //       colors={["cyan","blue","lime","violet"]}
  //       />}
  //       keyExtractor={(item,index)=>index.toString()}
  //       sections={DATA}
  //       renderItem={
  //         ({item})=>

  //      <TouchableOpacity>
  //        {/* <TodoItems item={item} pressHandler={pressHandler}/> */}
  //        <View style={styles.buttons}>
  //         <Text>
  //         {item}
  
  //         </Text>
  //        </View>
        
    
  //      </TouchableOpacity>
            
            
        
  //     }
  //     renderSectionHeader={({section})=>
  //     <TouchableOpacity>
  //     {/* <TodoItems item={item} pressHandler={pressHandler}/> */}
  //     <View style={styles.container}>
  //      <Text>
  
  // {section.title}
  //      </Text>
  //     </View>
  
  //   </TouchableOpacity>
  //   }
        
  //       />)}
        {/* section component */}

      

const NoResult=()=>{
  return(
   <View style={styles.empty}>
     <View style={styles.emptyImg}>
      <Image  style={styles.nores} source={require("../../assets/images/splash.png")}/>
      
    </View>
    <View style={styles.emptytext}>
      <Text style={styles.emtxt}>
        Sorry, cant find item
      </Text>
    </View>
   </View>
  );
}

     
const styles = StyleSheet.create({
    input: {
  justifyContent:"center",
  alignItems:"center",
  width:"50%",
  padding:20,
  borderColor:"cyan",
  borderWidth:2,
  borderStyle: "solid",
    },
  
  
    container: {
      alignSelf:"center",
      width:"100%",
      backgroundColor:"whitesmoke",
      borderRadius:10,
    },
    sections:
      { width:"100%",
        justifyContent:"space-evenly",
        alignItems:"center",
        backgroundColor:"rgba(69, 75, 93, 0.07)",

        borderRadius:10,
        paddingTop:15,
      height:"100%",
    },
 
    header: {
      display:"flex",
      padding:30,
      fontSize:30,
      textAlign:"center",
      textTransform:"uppercase",
      width:"100%",
      justifyContent:"center",
      alignItems:"center",
    },
  
    empty:{
      width:"100%",
      justifyContent:"center",
      paddingBottom:30,
    },
    emptyImg:{
      width:"100%",
      justifyContent:"center",
      flexDirection:"row",
  },
    emptytext:{
      width:"100%",
      justifyContent:"center",
      padding:10,
    },
    emtxt:{
      fontWeight:"bold",
      textAlign:"center",
      fontSize:15,
    },
    nores:{
      width:150,
      height:150,
      justifyContent:"center",
      borderRadius:500,
    },
    divide:
      {borderTopStartRadius:30,
        borderTopEndRadius:30,
        borderRightWidth:1,
        height:acceptedHeight && Platform.OS=="ios"?acceptedHeight:"63%",
        borderLeftWidth:1,
        borderColor:"rgba(69, 75, 93, 0.17)",
        backgroundColor:"rgba(69, 75, 93, 0.07)",
        borderTopWidth:10}
    
  });
  