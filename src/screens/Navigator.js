import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Auth from './Auth';
import TaskList from './TaskList';
import Menu from './Menu'
import commonStyles from '../commonStyles';
import AuthOrApp from './AuthOrApp';






const Drawer = createDrawerNavigator()


const DrawerNavigator = props => {
    
 /*    console.warn(props.route.params) */
   const propriedades = props.route.params


    return (
        <Drawer.Navigator  
         screenOptions={{headerShown:false, drawerActiveTintColor: commonStyles.colors.today}} 
         drawerContent={(props)=><Menu info={propriedades} {...props}/> }>
            <Drawer.Screen  name="Today" options={{ title: 'Hoje' }}>
                {props => <TaskList {...props} title='Hoje' daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name="Tomorrow" options={{ title: 'Amanhã' }}>
                {props => <TaskList {...props} title='Amanhã' daysAhead={1} />}
            </Drawer.Screen>
            <Drawer.Screen name="Week" options={{ title: 'Semana' }}>
                {props => <TaskList {...props} title='Semana' daysAhead={7} />}
            </Drawer.Screen>
            <Drawer.Screen name="Month" options={{ title: 'Mês' }}>
                {props => <TaskList {...props} title='Mês' daysAhead={30} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

const Stack = createNativeStackNavigator()

const Navigator = ()=>{
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='AuthOrApp' screenOptions={{headerShown:false}}>
                <Stack.Screen name = "TaskList" component={DrawerNavigator} />
                <Stack.Screen name = "Auth" component={Auth}/>
                <Stack.Screen name = "AuthOrApp" component={AuthOrApp}/>


               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;