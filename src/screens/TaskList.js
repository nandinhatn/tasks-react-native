import React, {Component} from "react";
import { 
    SafeAreaView,
     View,
      Text,
       ImageBackground , 
       StyleSheet,
        FlatList,
         TouchableOpacity,
          Platform,
          Alert
        
        } from "react-native"
import  AsyncStorage from "@react-native-async-storage/async-storage"
import moment from 'moment'
import todayImage from '../imgs/today.jpg';
import 'moment/locale/pt-br'
import commonStyles from "../commonStyles";
import Task from "./Task";
import Icon from 'react-native-vector-icons/FontAwesome'
import AddTask from "./addTask";

const initialState ={ showDoneTasks: true,
        visibleTasks:[],
        showAddTask: false,
        tasks :[]
          }
export default class TaskList extends Component{

    state ={
        ...initialState
          
    
    
    }
    componentDidMount  = async ()=>{
        const stateString= await AsyncStorage.getItem('tasksState')
        const state =JSON.parse(stateString) || initialState
        this.setState(state,this.filterTasks)
        
    }
    toggleFilter= ()=>{
        this.setState({showDoneTasks: !this.state.showDoneTasks},this.filterTasks())
        
    }
    filterTasks =()=>{
        let visibleTasks =null
        if(this.state.showDoneTasks){
            visibleTasks =[...this.state.tasks]
        }
        else{
            const pending = task => task.doneAt ===null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify(this.state))

    }
    toggleTask = (taskId) =>{
     
       const  tasks =[...this.state.tasks]
       tasks.forEach(task =>{
        if(task.id==taskId){
            task.doneAt = task.doneAt ? null : new Date()
        }
       })
       this.setState({tasks},this.filterTasks())
         
    }
    addTask =(newTask)=>{
       
        if(!newTask.desc || !newTask.desc.trim()){
           
        Alert.alert("Dados inválidos", 'Descrição não informada!')
        return
        }
        const tasks =[...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt : newTask.date,
            doneAt: null
        })
        this.setState({tasks,  showAddTask: false}, this.filterTasks)

    }
    deleteTask = id=>{
        const tasks = this.state.tasks.filter(task => task.id !==id)
        this.setState({tasks}, this.filterTasks)
    }
    render(){
        const today = moment().locale('pt-br').format('ddd, D  [de] MMMM [de] YY' )
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={()=> this.setState({showAddTask:false})} onSave={this.addTask}/>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={()=> this.toggleFilter()}>
                            <Icon name={this.state.showDoneTasks ? 'eye': 'eye-slash'} size={30} color='white'/>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}> 
                            Hoje
                        </Text>
                        <Text style={styles.txtToday}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>

              <FlatList
               data={this.state.visibleTasks} 
               keyExtractor={item=> `${item.id}`} 
               renderItem={({item})=> <Task {...item} toggleTask={this.toggleTask}
               onDelete={this.deleteTask}/>}/>
               
                </View>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.9} onPress={()=>this.setState({showAddTask: true})}>
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
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
    },
    iconBar:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingVertical:20,
        paddingHorizontal:20,
        marginTop: Platform.OS === 'ios' ? 30:10

    },
    addButton:{
        position:'absolute',
        right:30,
        bottom:30,
        backgroundColor:commonStyles.colors.today,
        width:50,
        height:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    }

})