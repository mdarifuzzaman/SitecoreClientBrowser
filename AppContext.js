import React, {Component, createContext, useState, useEffect} from 'react';
import axios from 'axios'
import {AsyncStorage } from 'react-native';
import {ApplicationData} from './components/utility/Utility';

export const AppContext = createContext();


export const AppProvider = props => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [homeScItem, setHomeScItem] = useState({});
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [stateData, setStateData] = useState({});
    

    const saveData = async (data) => {
      try{
        console.log(data);
        await AsyncStorage.setItem(ApplicationData.localStorageKey, JSON.stringify(data));
      }
      catch(error){
        alert(error);
      }
    }

    const getData = async (key) => {
      try{
        const data = await AsyncStorage.getItem(ApplicationData.localStorageKey);
        setStateData(JSON.parse(data));
        return data;
      }
      catch(error){
        alert(error);
      }
    }


    const login = async () => {
      const url = stateData.scheme + "://" + stateData.host + "/sitecore/api/ssc/auth/login";
      axios.post(url, {"domain": "sitecore", "username": "admin", "password": "b"}, {withCredentials: true}).then(async (res) => {
        setLoginSuccess(true);
        await homeItem();
      }).catch(error => {
        setLoginSuccess(false);
        console.log(error);
      })
    }

    const fetchChildren = async (id) => {
      const url = stateData.scheme + "://" + stateData.host + "/sitecore/api/ssc/item/"+ id + "/children";
      let data = await axios.get(url);
      const actualResponse = data.data;
      return actualResponse;
    }

    const homeItem = async () => {
      const url = stateData.scheme + "://" + stateData.host + "/sitecore/api/ssc/item/{0DE95AE4-41AB-4D01-9EB0-67441B7C2450}";
      
      try{
        const data = await axios.get(url);
        const actualResponse = data.data;
        setHomeScItem(actualResponse);
        console.log(actualResponse);
      }
      catch(error){
        console.log(error);
      }
    }

    const calculateTotal = () => {
    setTotal(parseInt(value1) + parseInt(value2));  
    }


    return(
        <AppContext.Provider value={{login, loginSuccess, homeScItem, fetchChildren, setUserName, setPassword, getData, saveData, stateData}}>
            {props.children}
        </AppContext.Provider>
    );
}