import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScreenHome from './ScreenHome';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

export default function NavigationContainerScreen(props) {
    console.log(props);
    return (
        <NavigationContainer independent={true}>
          <Tab.Navigator screenOptions={
            ({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = 'ios-home';
                } 
                else if (route.name === 'Settings') {
                  iconName = 'ios-list';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })
          } tabBarOptions = {
            {
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }
          }>
            <Tab.Screen name="Home" component={ScreenHome}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingScreen}></Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      );
}
