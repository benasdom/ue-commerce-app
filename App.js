import { StyleSheet, View,Text} from 'react-native';
// import { useState } from 'react'
import Navigations from './Navigations'
import React from 'react'
export default function App() {

  return( 
    <View style={styles.container}>
   <Navigations/>
    </View>
  )

}
const styles=StyleSheet.create({
  container:{
    flex:1,
backgroundColor:"#eee",
flexDirection:"column",
  }
})