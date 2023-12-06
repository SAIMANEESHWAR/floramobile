import { View, Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigation} from "@react-navigation/native"
import {firebase} from "../configfirebase"

const Login = () => {
    const navigation=useNavigation();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');


    loginuser=async(email,password)=>{

        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
        }
        catch(error){
            alert(error.message)
        }
    }
    const forgetpassword=()=>{
        firebase.auth().sendPasswordResetEmail(email)
        .then(()=>{
            alert("password reset email sent")
        }).catch((error)=>{
            alert(error);
        })
    }
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:26}}>
        Login
      </Text>
      <View style={{marginTop:30}}>
        <TextInput
            style={styles.textInput}
            placeholder='Email'
            onChangeText={(email)=>setemail(email)}
            autoCapitalize='none'
            autoCorrect={false}

        />
        <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(password)=>setpassword(password)}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true} 
        />
      </View>
      <TouchableOpacity 
        onPress={()=>loginuser(email,password)}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold',fontSize:22}}>
            Login
        </Text>

      </TouchableOpacity>
      <TouchableOpacity 
        onPress={()=>navigation.navigate('Registration')}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight:'bold',fontSize:16}}>
            Dont have an account? Register Now
        </Text>

      </TouchableOpacity>
      {/* //password reset */}
      <TouchableOpacity 
        onPress={()=>forgetpassword()}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight:'bold',fontSize:16}}>
            forget password ?
        </Text>

      </TouchableOpacity>
    </View>
  )
}

export default Login


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        marginTop:100,
        padding:10
    },
    textInput:{
        paddingTop:20,
        paddingBottom:10,
        width:400,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:"#000",
        marginBottom:10,
        textAlign:"center"
    },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:"#026efd",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
    }
})