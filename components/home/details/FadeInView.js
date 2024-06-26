import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";
const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Drawer on the {drawerPosition}!
        </Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});

export default App;



// import PayStackWebView from 'react-native-paystack-webview';

return (
  <>
  {/* <PayStackWebView
   buttonText="Pay Now"
   showPayButton={true}
   paystackKey="pk_test_dfc089d43af23196de29ce570074fbf168767617"
   paystackSecretKey="sk_test_1564a78d647cdf726918849c02591bf50ac2e91d"
   amount={120000}
   billingEmail="paystackwebview@something.com"
   billingMobile="0272831301"
   ActivityIndicatorColor="green"
   SafeAreaViewContainer={{marginTop:4}}
   SafeAreaViewContainerModal={{marginTop: 5}}
   onCancel={(e)=>{
    alert("success");
   }}
   onSuccess={(e)=>{
    alert("fali");
   }}
   autoStart={false}
  />
   */}
  
  
  </>
)
//secret key paystack
//sk_test_1564a78d647cdf726918849c02591bf50ac2e91d
//public key
//pk_test_dfc089d43af23196de29ce570074fbf168767617