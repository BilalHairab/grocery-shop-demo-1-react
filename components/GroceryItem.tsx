import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, Image } from "react-native";
import { StyleSheet } from 'react-native';
type ItemProps = {
    item: any;
    onPress?: () => void,
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ItemProps>

export default function GroceryItem(props: Props) {
    return (<TouchableOpacity style={[styles.mainItem, props.style]} onPress={props.onPress}>
        <Image source={{ uri: props.item.filename}} style={{width: '100%', height: 50}} />
        <Text style={{color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold', textAlign: 'center'}}>{props.item.title}</Text></TouchableOpacity>)
}

const styles = StyleSheet.create({
    mainItem: {
        borderRadius: 20,
        backgroundColor: individualColors['overflow'],
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    button: {
        borderRadius: 40,
        alignItems: 'center',
        padding: 15,
    },
    lightButton: {
        backgroundColor: individualColors['backgroundLight']
    },
    darkButton: {
        backgroundColor: individualColors['backgroundDark']
    },
});