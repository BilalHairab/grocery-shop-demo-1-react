import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type HeaderTextProps = {
    text: string;
    isLightText?: boolean;
    style?: StyleProp<TextStyle>;
}

type Props = PropsWithChildren<HeaderTextProps>

export default function HeaderText(props: Props) {
    return (
        <Text style={[{fontSize: 30, color: props.isLightText ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold'}, props.style]}>{props.text}</Text>)
}