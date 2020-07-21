import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './components/screens/SplashScreen';
import AboutScreen from './components/screens/AboutScreen';
import NavigationContainerScreen from './components/screens/NavigationContainerScreen';
import {AppProvider} from './AppContext';


const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return(

    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen}></Stack.Screen>
          <Stack.Screen name="NavigationContainerScreen" component={NavigationContainerScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
