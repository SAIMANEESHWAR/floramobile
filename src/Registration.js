import { View, Text ,TouchableOpacity,TextInput,StyleSheet} from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import {firebase} from '../configfirebase'


const Registration = () => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [firstname,setfirstname]=useState('');
    const [lastname,setlastname]=useState('');

   const registeruser=async(email,password,firstname,lastname)=>{
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp:true,
                url:"https://floramobileapp.firebaseapp.com",
            }) 
            .then(()=>{
                alert("verification email sent")
            }).catch((error)=>{
                alert(error.message)
            })
            .then(()=>{
                firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstname,
                    lastname,
                    email,
                })   
            })
            .catch((error)=>{
                alert(error.message)
            })
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:23}}>
            Registration
    </Text>
    <View style={{marginTop:30}}>
        <TextInput
            style={styles.textInput}
            placeholder="first Name"
            onChangeText={(firstName)=>setfirstname(firstName)}
            autoCorrect={false}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(LastName)=>setlastname(LastName)}
            autoCorrect={false}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email)=>setemail(email)}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
        />
        <TextInput
            style={styles.textInput}
            placeholder="password"
            onChangeText={(password)=>setpassword(password)}
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry={true}
        />
       
    </View>
    <TouchableOpacity
            onPress={()=>registeruser(email,password,firstname,lastname)}
            style={styles.button}
        >
            <Text style={{fontWeight:"bold",fontSize:22}}>Register</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Registration




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
        marginTop:30,
        height:70,
        width:250,
        backgroundColor:"#026efd",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
    }
})