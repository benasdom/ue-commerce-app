import { View, Text } from 'react-native'
import React from 'react';
import Details from './components/home/details/Details';
import Help from './components/home/help';
import Home from './components/Home';
import Products from './components/home/Products';
import Orders from './components/home/Orders';
import Cart from './components/home/details/Cart';
import Account from './components/home/Account';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store';
export default function Navigations() {
const Stack = createStackNavigator();
const screenOptions={
  headerShown:false,
}


  return (
    <ReduxProvider store={store}>
    <NavigationContainer >
    <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen options={screenOptions} name="Home" component={Home} />
      <Stack.Screen  options={screenOptions}  name="Help" component={Help} />
      <Stack.Screen  options={{...screenOptions,title:null}} name="Cart" component={Cart} />
      <Stack.Screen  name="Details"  options={screenOptions} component={Details} />
      <Stack.Screen  options={screenOptions} name="UE exclusives" component={Products} />
      <Stack.Screen  options={screenOptions} name="Orders" component={Orders} />
      <Stack.Screen  options={{...screenOptions,title:null}} name="Account" component={Account} />
    </Stack.Navigator>
    </NavigationContainer>
    </ReduxProvider>


  );

}
