import React,{Component} from 'react'

import{
    Modal,
    Platform,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Text
} from 'react-native'
import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const initialState ={desc:'', date: new Date(), showDatePicker: false}


export default class AddTask extends Component{
   state={
    ...initialState
   }
   save = ()=>{
    const newTask ={
        desc: this.state.desc,
        date : this.state.date
    }
    
    this.props.onSave && this.props.onSave(newTask)
    this.setState({...initialState})
  
   }
   getDatePicker = () =>{
    let datePicker= <DateTimePicker
     value={this.state.date}
     mode='date'
     onChange={(event, date)=> this.setState({date, showDatePicker:false}) }/>

     const dateString= moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
     if (Platform.OS ==='android'){
        datePicker =(
            <View>
                <TouchableOpacity onPress={()=> this.setState({showDatePicker: true})}>
                    <Text style={styles.date}>
                        {dateString}
                    </Text>
                </TouchableOpacity>
                {this.state.showDatePicker && datePicker}
            </View>
        )
     }
     return datePicker
   }
    render(){
      
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.background}>
             
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
            <Text style={styles.header}>Nova Tarefa</Text>
            <TextInput style={styles.input} placeholder='Informe a descricao' value={this.state.desc} onChangeText={desc=>this.setState({desc})}/>
            {this.getDatePicker()}
            <View style={styles.buttons}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.props.onCancel} >
                    <Text style={styles.button}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={this.save}>
                    <Text style={styles.button}>Salvar</Text>
                </TouchableOpacity>
            </View>

            </View>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.background}>
                    
               
                </View>
            </TouchableWithoutFeedback>
           </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:  'rgba(0, 0, 0, 0.7)'

    },
    container:{
        flex:1,
        backgroundColor:'white'

    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color:'white',
        textAlign:'center',
        padding:15,
        fontSize:18,
        fontWeight:'bold'


    },
    buttons:{
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    input:{
    fontFamily: commonStyles.fontFamily,
    height:40,
    margin:15,
    color:'black',
    fontSize:20,
    fontWeight:'bold',
    backgroundColor:'white',
    borderColor:"#CCC",
    borderWidth:2,
    borderRadius:6
    },
    button:{
        margin:20,
        marginRight:30,
        color: commonStyles.colors.today
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize:30,
        marginLeft: 15
    }

})