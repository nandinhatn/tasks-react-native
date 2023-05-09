import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './Auth';
import TaskList from './TaskList';
import { create } from 'react-test-renderer';

const Stack = createNativeStackNavigator()

const Navigator = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Auth'>
                <Stack.Screen name = "TaskList" component={TaskList}/>
                <Stack.Screen name = "Auth" component={Auth}/>

               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;