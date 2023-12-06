import { View, Text ,TouchableOpacity,TextInput,StyleSheet,SafeAreaView} from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import {firebase} from '../configfirebase'


const Dashboard = () => {
    const [name,setname]=useState('');

    //change password
    const changepassword=()=>{
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(()=>{
            alert("password reset email sent")
        }).catch((error)=>{
            alert(error)
        })
    }




    useEffect(()=>{
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot)=>{
            if(snapshot.exists){
                setname(snapshot.data())
            }
            else{
                console.log("user does not exist");
            }
        })
    })
  return (
    <SafeAreaView style={StyleSheet.container}>
        <Text style={{fontSize:20,fontWeight:"bold"}}>
            hello ,{name.firstname},{name.lastname}
        </Text>
        {/* change password */}
        <TouchableOpacity onPress={()=>changepassword()}
            style={styles.button}
        >
            <Text style={{fontSize:20,fontWeight:"bold"}}>
                Change password
            </Text>
        </TouchableOpacity>
    {/* lgout */}
        <TouchableOpacity onPress={()=>firebase.auth().signOut()}
            style={styles.button}
        >
            <Text style={{fontSize:20,fontWeight:"bold"}}>
                sign-out
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Dashboard



const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        marginTop:100,
        padding:10
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