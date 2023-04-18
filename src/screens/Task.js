import React from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
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
    return (
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
    }
    
})