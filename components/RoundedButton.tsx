import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren, useRef } from "react";
import { TouchableOpacity, StyleProp, ViewStyle, View, TextStyle } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import DescriptionText from "./DescriptionText";

type ButtonProps = {
    title: string;
    onPress: () => void,
    disabled?: boolean,
    isLightButton?: boolean;
    isLarge?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ButtonProps>

export default function RoundedButton(props: Props) {
    const enabled = useRef(!(props.disabled ?? false))
    const textStyle = { color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' } as StyleProp<TextStyle>
    return (<TouchableOpacity style={[props.isLarge === false ? styles.smallButton: styles.largebutton, props.isLightButton ? styles.lightButton : styles.darkButton, props.style]} disabled={props.disabled ?? false} onPress={props.onPress}>
        {enabled.current && <View style={{ alignSelf: 'center', alignItems: 'center', alignContent: 'center' }}>{props.isLarge === false ? <DescriptionText style={textStyle} text={props.title} />: <TitleText style={textStyle} text={props.title} />}</View>}</TouchableOpacity>)
}

const styles = StyleSheet.create({
    smallButton: {
        borderRadius: 40,
        alignItems: 'center',
        padding: 10,
    },
    largebutton: {
        borderRadius: 15,
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