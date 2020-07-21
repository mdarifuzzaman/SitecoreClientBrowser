import React, {useContext, useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import {AppContext} from '../../AppContext';

export default function PreviewScreen(props) {
    const appContext = useContext(AppContext);
    const {fetchChildren, stateData} = appContext;
    const [previewData, setPreviewData] = useState({});

    useEffect(()=> {
        const {itemId} = props.route.params;

        const fetchData = async () =>{
           const data = await fetchChildren(itemId);
           setPreviewData(data);
        }

        fetchData();
        
    }, []);

    const renderItem = ({ item }) => (
        
        <View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                <Image source={{uri: stateData.scheme + "://" + stateData.host + item.ItemIcon, height: 30, width: 30}}></Image>
                <View style={styles.item}>
                    <Text numberOfLines={1} style={styles.title}>{item.Type}</Text>
                    <Text>{item.TemplateName}</Text>
                    <Text>Source: {item.TemplateName}</Text>
                    <Text>Path: {item.ItemPath}</Text>
                    <Image source={{uri: stateData.scheme + "://" + stateData.host + stateData.ItemIcon, height: 20, width: 20}}></Image>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
           <FlatList
             data={previewData}
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
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    title: {
    fontSize: 25
    },
})