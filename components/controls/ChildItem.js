import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export const Item = ({ title }) => (
    <View style={styles.item}>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
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
  

