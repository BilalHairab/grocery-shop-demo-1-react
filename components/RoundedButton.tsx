import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren, useRef } from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";

type ButtonProps = {
    title: string;
    onPress: () => void,
    disabled?: boolean,
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ButtonProps>

export default function RoundedButton(props: Props) {
    const enabled = useRef(!(props.disabled ?? false))
    return (<TouchableOpacity style={[styles.button, props.isLightButton ? styles.lightButton : styles.darkButton, props.style]} disabled={props.disabled ?? false} onPress={props.onPress}>
        {enabled.current && <TitleText style={{color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold'}} text={props.title}/>}</TouchableOpacity>)
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