import React from "react";
import {
    View, 
    Text,
     StyleSheet, 
     TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native'

import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler'
import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from "moment";
import 'moment/locale/pt-br'

export default props =>{
    const doneorNotStyle = props.doneAt !=null ?
    {textDecorationLine:'line-through',
    color:'#202020'
} :{};
const date = props.doneAt ? props.doneAt: props.estimateAt
const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

const getRightContent = ()=>{
    return(
        <TouchableOpacity style={styles.right} onPress={()=> props.onDelete && props.onDelete(props.id)}>
            <Icon name="trash" size={30} color={'white'} ></Icon>
        </TouchableOpacity>
    )
}
const getLeftContent = ()=>{
    return(
        <View style={styles.left}>
            <Icon name="trash" size={30} color={'white'} style={styles.excludeIcon}></Icon>
            <Text style={styles.excludeText}> Excluir</Text>
        </View>
    )
}
    return (
        <GestureHandlerRootView>

        <Swipeable 
        renderRightActions={getRightContent} 
        renderLeftActions={getLeftContent}
         onSwipeableLeftOpen={()=> props.onDelete && props.onDelete(props.id)}>

        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=> props.toggleTask(props.id)}>

            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View> 
            </TouchableWithoutFeedback>
            <View>
            <Text style={[styles.desc, doneorNotStyle]}>{props.desc}</Text>
            <Text style={styles.subText}>{formattedDate}</Text>

            </View>
           
        </View>
        </Swipeable>
        </GestureHandlerRootView>
    )
}

function getCheckView(doneAt){
    if(doneAt != null){
        return (
            <View style={styles.done}>
              <Icon name="check" size={15} color={commonStyles.colors.secondary}/>
            </View>
        )
    }else{
        return (
            <View style={styles.pending}>
              
            </View>
        )

    }
   
}

const styles = StyleSheet.create({
    container:{
    
        flexDirection:'row',
        borderColor: '#AAA',
        borderBottomWidth:1,
        alignItems: 'center',
        paddingVertical:10,
        backgroundColor: 'white'
    },
    checkContainer:{
        width:"20%",
        alignItems:'center',
        justifyContent:'center'
    },
    pending:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#202020'
    },
    done:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#5555',
        backgroundColor:'#3d6529',
        alignItems:'center',
        justifyContent:'center'
        
    },
    desc:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontWeight:'700',
        
        fontSize: 15,
    },
    subText:{
        color: commonStyles.colors.subText
    },
    date:{
        fontSize:12,
    },
    right:{
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20
    },
    left:{
      backgroundColor: 'red',
      flexDirection:'row',
      alignItems:'center',
      flex:1
      

    },
    excludeText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFFF',
        fontSize: 20,
        margin:10

    },
    excludeIcon:{
        marginLeft: 10,

    }
    
})