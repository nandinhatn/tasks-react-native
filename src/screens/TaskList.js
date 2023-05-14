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
import  tomorrowImage from   '../imgs/tomorrow.jpg';
import weekImage from '../imgs/week.jpg'
import monthImage from '../imgs/month.jpg'
import 'moment/locale/pt-br'
import commonStyles from "../commonStyles";
import Task from "./Task";
import axios from 'axios'
import{server, showError} from '../common'
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
        const saveState =JSON.parse(stateString) || initialState
        this.setState({showDoneTasks: saveState.showDoneTasks},this.filterTasks)
        this.loadTasks()
    }
    loadTasks= async()=>{
        try{
            const maxDate = moment().add(this.props.daysAhead, 'day').format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks/?date=${maxDate}`)
        
       
         
            this.setState({tasks : res.data}, this.filterTasks)

        }catch(e){
            showError(e)

        }
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
        AsyncStorage.setItem('tasksState', JSON.stringify({showDoneTasks: this.state.showDoneTasks}))

    }
    toggleTask = async taskId =>{
       
     
       try{
        await axios.put(`${server}/tasks/${taskId}/toggle`)
                 await this.loadTasks()
       }
       catch(e){
        showError(e)
       }
         
    }
    addTask = async (newTask)=>{
       
        if(!newTask.desc || !newTask.desc.trim()){
           
        Alert.alert("Dados inválidos", 'Descrição não informada!')
        return
        }
        try {
            await axios.post(`${server}/tasks`,{
                desc: newTask.desc,
                estimateAt: newTask.date
            })
            this.setState({showAddTask: false}, this.loadTasks)
        } catch (error) {
            showError(error)
            
        }
      

    }
    deleteTask = async id=>{
        try{
            await axios.delete(`${server}/tasks/${id}`)
            await this.loadTasks()
        }
        catch(e){
            showError(e)
        }
        /* const tasks = this.state.tasks.filter(task => task.id !==id) */
      /*   this.setState({tasks}, this.filterTasks) */
    }
    getImage=()=>{
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tomorrowImage
            case 30: return monthImage
            case 7: return weekImage 
        }
    }
    getColor=()=>{
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 30: return commonStyles.colors.month
            case 7: return commonStyles.colors.week
    }
}
    render(){
        const today = moment().locale('pt-br').format('ddd, D  [de] MMMM [de] YY' )
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={()=> this.setState({showAddTask:false})} onSave={this.addTask}/>
                <ImageBackground source={this.getImage()} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                            <Icon name ="bars" color='white' size={30}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.toggleFilter()}>
                            <Icon name={this.state.showDoneTasks ? 'eye': 'eye-slash'} size={30} color='white'/>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}> 
                           {this.props.title}
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
                <TouchableOpacity style={[styles.addButton, {backgroundColor: this.getColor()}]} activeOpacity={0.9} onPress={()=>this.setState({showAddTask: true})}>
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
        justifyContent:'space-between',
        paddingVertical:20,
        paddingHorizontal:20,
        marginTop: Platform.OS === 'ios' ? 30:10

    },
    addButton:{
        position:'absolute',
        right:30,
        bottom:30,
       
        width:50,
        height:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    },
   

})

