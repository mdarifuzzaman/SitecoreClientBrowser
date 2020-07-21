import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

export default function SplashScreen(props) {
    
    
    let performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
          setTimeout(
            () => { 
                resolve('result');
                props.navigation.navigate('NavigationContainerScreen');
            },
            2000
          )
        )
    }

    performTimeConsumingTask();

    return (
        <View style={styles.viewStyles}>
            <Image source={require('../../assets/screen.png')}></Image>
            <Text style={styles.textStyles}>Sitecore Client Browser</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      },
      textStyles: {
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        position: "absolute",
        textAlign: "center",
        marginTop: Dimensions.get("window").height/2 - 80
      }
});
