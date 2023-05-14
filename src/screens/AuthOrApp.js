import React ,{Component} from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default class AuthOrApp  extends Component{
  componentDidMount = async ()=>{
        const userDataJson= await AsyncStorage.getItem('userData')
        let userData = null
       try{
        userData=JSON.parse(userDataJson)
       }

       catch(e){

       }
       if(userData && userData.token){
        axios.defaults.headers.common['Authorization']= `bearer ${userData.token}`
        this.props.navigation.navigate('TaskList', userData)
       }else{
        this.props.navigation.navigate('Auth')
       }
    }
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'black'
    }
})