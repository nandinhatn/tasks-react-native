import React , {Component} from 'react';
import {ImageBackground, Text,StyleSheet, View, TextInput, TouchableOpacity, Platform,
Alert} from 'react-native'
import backgroundImage from '../imgs/login.jpg'
import AuthInput from '../components/AuthInput';

import commonStyles from '../commonStyles';
export default class Auth extends Component{

    state ={
        email:'',
        password:'',
        name:'',
        confirmPassword:'',
        stageNew : true
    }
     signinOrSignup =()=>{
        if(this.stageNew){
            Alert.alert('Sucesso!', 'Criar Conta!')

        }
        else{
            Alert.alert('Sucesso', 'Logar')
        }
     }
    render(){


         return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}> {this.state.stageNew ? 'Crie sua conta': 'Informe seus dados'}</Text>
                    {this.state.stageNew &&
                    <AuthInput placeholder='Nome' value={this.state.name} 
                    onChangeText={name => this.setState({name})}/>
                    
                    }
                    <AuthInput icon='at' placeholder="Email" value={this.state.email} onChangeText={email=> this.setState(email)}/>
                  
                
                {this.state.stageNew &&
                  <AuthInput placeholder='Confirmar senha' value={this.state.confirmPassword} 
                  style={styles.input} secureTextEntry={true} onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                }
                <AuthInput placeholder='Senha' value={this.state.password} 
                style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({password})}/>
                <TouchableOpacity onPress={()=> this.signinOrSignup()}>

                <View style={styles.button}><Text style={styles.buttonText}>{this.state.stageNew ? 'Cadastrar': 'Entrar'}</Text></View>
                </TouchableOpacity >

              
                </View>
                <TouchableOpacity style={{padding:10}}
                   onPress={()=>{ this.setState({stageNew: !this.state.stageNew})}}>
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
        alignItems: 'center'

    },
    buttonText:{
        fontFamily: commonStyles.fontFamily,
        color: 'white',
        fontSize:20

    }

})


