import React , {Component} from 'react';
import {ImageBackground, Text,StyleSheet, View, TextInput, TouchableOpacity, Platform,
Alert} from 'react-native'
import backgroundImage from '../imgs/login.jpg'
import AuthInput from '../components/AuthInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { server, showSucess, showError } from '../common';
import commonStyles from '../commonStyles';


const initialState ={
     email:'',
        password:'',
        name:'',
        confirmPassword:'',
        stageNew : false
      }

export default class Auth extends Component{

    state ={
       ...initialState
    }
     signinOrSignup =()=>{
        if(this.state.stageNew){
          /*   Alert.alert('Sucesso!', 'Criar Conta!') */
          this.signup()

        }
        else{
           this.signin()
        }
     }

     signup =async ()=>{
        try{
            await axios.post(`${server}/signup`,  {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })
            showSucess('Usuário cadastrado com sucesso')
            this.setState({...initialState})
          
            
        }
        catch (e){
            showError(e)

        }

     }
     signin = async ()=>{

        try{
           const res= await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            })
            AsyncStorage.setItem('userData',JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization']= `bearer ${res.data.token}`
            this.props.navigation.navigate('TaskList', res.data)
        }
        catch(e){

            showError("Usuário ou senha inválidos")
        }

     }
    render(){

        const validations=[]
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >=6)
        if(this.state.stageNew){

            validations.push(this.state.name && this.state.name.trim().length >=3)
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password==this.state.confirmPassword)
        }
        const validForm = validations.reduce((t,a) => t && a)

         return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}> {this.state.stageNew ? 'Crie sua conta': 'Informe seus dados'}</Text>
                    {this.state.stageNew &&
                    <AuthInput icon='user' placeholder='Nome' value={this.state.name} 
                    onChangeText={name => this.setState({name})}/>
                    
                    }
                    <AuthInput icon='at' placeholder="Email" value={this.state.email} onChangeText={email=> this.setState({email})}/>
                  
                
                {this.state.stageNew &&
                  <AuthInput icon="asterisk" placeholder='Confirmar senha' value={this.state.confirmPassword} 
                  secureTextEntry={true} onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                }
                <AuthInput icon='lock' placeholder='Senha' value={this.state.password} 
               secureTextEntry={true} onChangeText={password => this.setState({password})}/>
                <TouchableOpacity onPress={()=> this.signinOrSignup()} disabled={!validForm}>

                <View style={[styles.button, validForm ? {} : {backgroundColor:'#AAA'}]}><Text style={styles.buttonText}>{this.state.stageNew ? 'Cadastrar': 'Entrar'}</Text></View>
                </TouchableOpacity >

              
                </View>
                <TouchableOpacity style={{padding:10}}
                   onPress={()=>{ this.setState({stageNew: !this.state.stageNew})}} >
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta': 'Ainda não possui conta?'}
                    </Text>

                </TouchableOpacity>
            </ImageBackground>
         )
    }
}


const  styles= StyleSheet.create({
    background:{
            flex:1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
    },
    title:{

        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10

    },
    input:{
        backgroundColor:'white',
        marginTop:10,
        padding: Platform.Os =='ios'? 30: 10
      
    },
    formContainer:{
        backgroundColor:'rgba(0,0,0,0.8)',
        padding: 20,
        width:'90%'
        

    },
    button:{
        backgroundColor: '#080',
        marginTop:10,
        padding:10,
        alignItems: 'center',
        borderRadius: 10

    },
    buttonText:{
        fontFamily: commonStyles.fontFamily,
        color: 'white',
        fontSize:20

    }

})


