import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, FlatList,TouchableHighlight, Image } from 'react-native'
import {AppContext} from '../../AppContext';
import {TemplateItem} from '../controls/ChildTemplateItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TemplateScreen(props) {

    const appContext = useContext(AppContext);
    const [templateData, setTemplateData] = useState({});
    const {fetchChildren, stateData} = appContext;

    useEffect(()=> {
        const {itemId} = props.route.params;

        const fetchData = async () =>{
           const data = await fetchChildren(itemId);
           setTemplateData(data);
           console.log(data);
        }

        fetchData();
        
    }, []);

    const gotoPreview  = (id) => {
        props.navigation.navigate("Preview", {itemId: id});
    }
    const renderItem = ({ item }) => (
        
        <View>
            <TouchableHighlight onPress={()=> gotoPreview(item.ItemID)}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                    <Image source={{uri: stateData.scheme + "://" + stateData.host + item.ItemIcon, height: 30, width: 30}}></Image>
                    <TemplateItem item={{data: item, state: stateData}} />
                </View>
            </TouchableHighlight>
        </View>
    );

    return (
        <View style={styles.container}>
           <FlatList
             data={templateData}
             renderItem={renderItem}
             keyExtractor={item => item.ItemID}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        marginLeft: 5,
        justifyContent: 'center',
    },
    buttonStyle: {
        marginVertical: 10,
        marginHorizontal: 10,
        marginBottom: 20
    }
})
