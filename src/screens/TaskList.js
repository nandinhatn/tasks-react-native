import React, {Component} from "react";
import { SafeAreaView, View, Text, ImageBackground , StyleSheet, FlatList} from "react-native"
import moment from 'moment'
import todayImage from '../imgs/today.jpg';
import 'moment/locale/pt-br'
import commonStyles from "../commonStyles";
import Task from "./Task";

export default class TaskList extends Component{

    state ={
        tasks :[
            {
            id: Math.random(),
            desc:'Comprar Livro',
            estimateAt: new Date(),
            doneAt: new Date()
        },
        {
            id: Math.random(),
            desc:'Ler  Livro',
            estimateAt: new Date(),
            doneAt: null
        },
    
    ]
    }
    toggleTask = (taskId) =>{
     
       const  tasks =[...this.state.tasks]
       tasks.forEach(task =>{
        if(task.id==taskId){
            task.doneAt = task.doneAt ? null : new Date()
        }
       })
       this.setState({tasks})
    }
    render(){
        const today = moment().locale('pt-br').format('ddd, D  [de] MMMM [de] YY' )
        return(
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}> 
                            Hoje
                        </Text>
                        <Text style={styles.txtToday}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>

              <FlatList
               data={this.state.tasks} 
               keyExtractor={item=> `${item.id}`} 
               renderItem={({item})=> <Task {...item} toggleTask={this.toggleTask}/>}/>
               
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    background:{
        flex:3
    },
    taskList:{
        flex: 7
    },
    txtToday:{
        fontSize:22,
        color: commonStyles.colors.secondary,
        

    },
    title:{

        fontSize:50,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary
    },
    titleBar:{
        flex:1,
        justifyContent:'flex-end',
        paddingBottom:20,
        paddingLeft:10,
        fontFamily: commonStyles.fontFamily
    }

})