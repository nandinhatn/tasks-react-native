import React  from "react";

import {View, Text, StyleSheet,TouchableOpacity} from'react-native'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import commonStyles from "../commonStyles";

import {Gravatar} from 'react-native-gravatar'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'

export default (props) =>{
  
 const logout = ()=>{
   delete axios.defaults.headers.common['Authorization']
    
    AsyncStorage.removeItem('userData')
    props.navigation.navigate('Auth')



 }


    return(
        <DrawerContentScrollView contentContainerStyle={{backgroundColor:'white'}}>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
            <Gravatar style={styles.avatar} options={{
              email: props.info.email,          
              secure: true
            }}
           />
            <View style={styles.userInfo}>
                <Text style={styles.info}>{props.info.name}</Text>
                <Text style={styles.info}>{props.info.email}</Text>
            </View>
            <TouchableOpacity onPress={logout}>
                <View style={styles.logoutIcon}>
                    <Icon name='sign-out' size={30} color={commonStyles.colors.today}/>
                </View>
            </TouchableOpacity>
            </View>
           
            <DrawerItemList {...props} style={styles.listMenu} labelStyle={styles.labelStyle} activeLabelStyle={styles.activeLabelStyle}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({

    labelStyle:{
        fontFamily : commonStyles.fontFamily,
        fontWeight: 'normal',
        fontSize : 100
    },
    activeLabelStyle:{
        color: 'green',
        fontWeight:'bold'
    },
    header:{
        borderBottomWidth:1,
        borderColor:'#DDD',
        
        alignItems:'center',
        justifyContent:'center'       
    },
    avatar:{
        width:60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin:10,
        marginTop: Platform.OS ==='ios'? 50:10,
       
      

    },
    userInfo:{
        margin:10,        
        

    },
    info:{
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:'center',
        color: 'black'

    },
    title:{
        fontSize:40,
        fontWeight: 'bold',
        margin:20,
        fontFamily: commonStyles.fontFamily
    },
    listMenu:{
       paddingTop:20,
    },
    logoutIcon:{
        margin:10,
       marginBottom: 20,
    }

})