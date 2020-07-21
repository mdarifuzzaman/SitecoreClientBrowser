import React, {useContext, useEffect} from 'react'
import { View, Text, StyleSheet, Button, VirtualizedList, Image, Dimensions } from 'react-native'
import {AppContext} from '../../AppContext';
import DetailsScreen from './DetailsScreen';
import TemplateScreen from './TemplateScreen';
import PreviewScreen from './PreviewScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator();



export default function ScreenHome(props) {
    const appContext = useContext(AppContext);
    const {login, loginSuccess, homeScItem, setUserName, setPassword, getData, saveData} = appContext;
    

    useEffect(() => {

        const loadData = async () => {
            const localData = await getData();
            console.log(localData);
            if(localData === null){
                props.navigation.navigate("Settings")
            }
        }
        
        loadData();

    }, []);
    const HomeComponent = (props) => {

        const loadChildren = () => {
            props.navigation.navigate("Details", {itemId: "{0DE95AE4-41AB-4D01-9EB0-67441B7C2450}"})
        }
        return(
            <View>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Image source={require('../../assets/screen.png')}></Image>
                    </View>
                    <View style={{position:"absolute", marginLeft: Dimensions.get("window").width/2 - 120, marginTop: Dimensions.get("window").height/2 - 100}}>
                        <Text style={{fontSize: 30, color: "white", textAlign: "center"}}> {homeScItem.ItemPath}</Text>
                        {
                            homeScItem.HasChildren !== "False" ? <Button onPress={loadChildren} style={styles.contentButton} title="Fetch Children"></Button> : null
                        }
                    </View>
                </View>
            </View>
        )
    }


    if(loginSuccess){
        return(
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeComponent}></Stack.Screen>
                    <Stack.Screen name="Details" component={DetailsScreen}></Stack.Screen>
                    <Stack.Screen name="Template" component={TemplateScreen}></Stack.Screen>
                    <Stack.Screen name="Preview" component={PreviewScreen}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>                
        );
    }
    else{
        return (
            <View style={{flex: 1}}>
                <View style={styles.default}>
                    <Image source={require('../../assets/screen.png')}></Image>
                </View>
                <View style={styles.credentialContainer}>
                    {/* <Text style={{fontSize: 30, margin: 10}}>User Name</Text>
                    <TextInput onChangeText={setUserName} style={{fontSize: 30, backgroundColor: "lightgray", textAlign: "center"}} maxLength = {100}></TextInput>
                    <Text style={{fontSize: 30, margin: 10}}>Password</Text>
                    <TextInput onChangeText={setPassword} secureTextEntry ={true} style={{fontSize: 30, backgroundColor: "lightgray", textAlign: "center"}} maxLength = {100}></TextInput> */}
                    <Text style={{fontSize: 30, textAlign:"center", color: "white"}}>Welcome to sitecore</Text>
                </View>
                <Button onPress={login} title="Connect to Sitecore"></Button>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff'
    },
    parentContainer: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    default: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    contentContainer:{
        flexDirection: "column"
    },
    contentButton:{
        height: 10,
        width: 150
    },
    credentialContainer: {
        position: "absolute",
        marginTop: Dimensions.get("window").height/2 - 160,
        marginLeft: Dimensions.get("window").width/2 - 140,
    }
  });
