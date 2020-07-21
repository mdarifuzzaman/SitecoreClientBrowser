import React from 'react'
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'

export const TemplateItem = (props) => (
    <View style={styles.item}>
        <Text numberOfLines={1} style={styles.title}>{props.item.data.DisplayName}</Text>
        <Text>Path: {props.item.data.ItemPath}</Text>
        <Text>Name: {props.item.data.TemplateName}</Text>
        <Image source={{uri: props.item.state.scheme + "://" + props.item.state.host + props.item.data.ItemIcon, height: 20, width: 20}}></Image>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
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
  

