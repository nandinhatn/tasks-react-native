import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Auth from './Auth';
import TaskList from './TaskList';
import { create } from 'react-test-renderer';


const menuRoutes = {
    Today:{
        name: 'Today',
        screen: props=> <TaskList title='Hoje' daysAhead={0} {...props} />,
        navigationOptions:{
            title:'Hoje'
        }

    },
    Tomorrow:{
        name: 'Tomorrow',
        screen: props=> <TaskList title='Amanhã' daysAhead={0} {...props} />,
        navigationOptions:{
            title:'Amanhã'
        }

    },
    Week:{
        name: 'Tomorrow',
        screen: props=> <TaskList title='Semana' daysAhead={0} {...props} />,
        navigationOptions:{
            title:'Semana'
        }

    },
   Month:{
        name: 'Month',
        screen: props=> <TaskList title='Mês' daysAhead={0} {...props} />,
        navigationOptions:{
            title:'Mês'
        }

    },
}

const Drawer = createDrawerNavigator()


const DrawerNavigator = props => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="Today" options={{ title: 'Hoje' }}>
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
            <Stack.Navigator initialRouteName='Auth' screenOptions={{headerShown:false}}>
                <Stack.Screen name = "TaskList" component={DrawerNavigator} />
                <Stack.Screen name = "Auth" component={Auth}/>

               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;