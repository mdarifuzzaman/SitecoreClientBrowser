import React, {useEffect, useContext, useState} from 'react'
import { View, Text, Button, StyleSheet, FlatList, TouchableHighlight, Image } from 'react-native'
import {AppContext} from '../../AppContext';
import {Item} from '../controls/ChildItem';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function DetailsScreen(props) {
    const appContext = useContext(AppContext);
    const {fetchChildren, stateData} = appContext;
    const [child, setChild] = useState([]);

    useEffect(()=> {
        const {itemId} = props.route.params;

        const fetchData = async () =>{
           const childs = await fetchChildren(itemId);
           setChild(child.concat(childs));
        }

        fetchData();
        
    }, []);

    const gotoTemplateScreen = (id) => {
        props.navigation.push("Template", {itemId: id});
    }
    const pressChild = (id) => {
        props.navigation.push("Details", {itemId: id});
    }

    const renderSeparator = ()=>{
        return(
            <View style={{backgroundColor: "red", height: 5}}>
            </View>
        )
      };

    const renderItem = ({ item }) => (
        
            <View style={{flexDirection: "column", flex: 1}}>
                <TouchableHighlight
                key={item.ItemID}
                onPress = {()=> pressChild(item.ItemID)}
                >
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                        <Image source={{uri: stateData.scheme + "://" + stateData.host + item.ItemIcon, height: 30, width: 30}}></Image>
                        <Item title={item.ItemName} />
                    </View>
                </TouchableHighlight>
                <View style={{flexDirection: "row", margin: 2}}>
                    <TouchableHighlight onPress={()=> gotoTemplateScreen(item.TemplateID)}>
                        <View style={{flexDirection: "row"}}>
                            <Icon name="rocket" size={30} color="#900" /> 
                            <Text style={{marginLeft: 10}}>View Template</Text>
                        </View>
                       
                    </TouchableHighlight>
                </View>
            </View>
    );

    return (
        <View style={styles.container}>
           <FlatList
             data={child}
             renderItem={renderItem}
             keyExtractor={item => item.ItemID}
             ItemSeparatorComponent = {renderSeparator}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
