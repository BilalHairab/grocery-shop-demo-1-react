import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from 'react-native';

type ButtonProps = {
    title: string;
    onPress: () => void,
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ButtonProps>

export default function RoundedButton(props: Props) {
    return (<TouchableOpacity style={[styles.button, props.isLightButton ? styles.lightButton : styles.darkButton, props.style]} onPress={props.onPress}>
        <Text style={{color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold'}}>{props.title}</Text></TouchableOpacity>)
}

const styles = StyleSheet.create({
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