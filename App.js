// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import React,{useState,useEffect} from 'react';
import {firebase} from './configfirebase';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Header from './components/Header';
//import {Stack} from "@react-navigation/stack"

const Stack=createStackNavigator();

function App(){
  const [initializing,setInitializing]=useState(true);
  const [user,setuser]=useState();

  function onauthstatechanged(user){
    setuser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(()=>{
    const subscriber=firebase.auth().onAuthStateChanged(onauthstatechanged);
    return  subscriber;
  },[]);


  if(initializing) return null;

  if(!user){
    return (
      <Stack.Navigator>
      <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerTitle:()=><Header name="flora bert"/>,
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:"#00e4d0",
          shadowColor:"#000",
          elevation:25
        }
      }}
      />
            <Stack.Screen
      name="Registration"
      component={Registration}
      options={{
        headerTitle:()=><Header name="flora bert"/>,
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:"#00e4d0",
          shadowColor:"#000",
          elevation:25
        }
      }}
      />
      </Stack.Navigator>
      
    );
  }


  return (
    <Stack.Navigator> 
                  <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerTitle:()=><Header name="Dashboard"/>,
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:"#00e4d0",
          shadowColor:"#000",
          elevation:25
        }
      }}
      />
    </Stack.Navigator>
  )
}

export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}