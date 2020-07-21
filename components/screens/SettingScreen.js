import React, {useContext, useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {AppContext} from '../../AppContext';

export default function SettingScreen(props) {
    const appContext = useContext(AppContext);
    const {saveData, getData} = appContext;
    const[scheme, setScheme] = useState("");
    const [host, setHost] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
            const loadData = async () => {
                const data = await getData();
                if(data !== null){
                    const jsonData = JSON.parse(data);
                    setHost(jsonData.host);
                    setScheme(jsonData.scheme);
                    setUserName(jsonData.userName);
                    setPassword(jsonData.password);
                }
            }
            loadData();
    }, []);

    const saveDataToLocal = () => {
        saveData({scheme: scheme, host: host, userName: userName, password: password});
        props.navigation.navigate("Home")
    }
    return (
        <View style={{justifyContent: "flex-start", alignItems: "center"}}>
            <View>
                <Image source={require('../../assets/screen.png')}></Image>
            </View>
            <View style={{position:"absolute", marginTop: 100}}>
                <TextInput style={styles.textStyle} maxLength={100} placeholder="scheme" onChangeText={setScheme} value={scheme}></TextInput>
                <TextInput style={styles.textStyle} maxLength={100} placeholder="Host" onChangeText = {setHost} value = {host}></TextInput>
                <TextInput style={styles.textStyle} maxLength={100} placeholder="User Name" onChangeText = {setUserName} value = {userName}></TextInput>
                <TextInput secureTextEntry={true} style={styles.textStyle} maxLength={100} placeholder="Password" onChangeText={setPassword} value ={password}></TextInput>
                <Button title="Save" style={styles.textStyle} onPress={()=> saveDataToLocal()}></Button>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        margin: 10,
        color: "cyan"
    }
})
