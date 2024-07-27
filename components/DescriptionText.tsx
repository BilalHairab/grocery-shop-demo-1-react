import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type DescriptionTextProps = {
    text: string;
    isLightText?: boolean;
    style?: StyleProp<TextStyle>;
}

type Props = PropsWithChildren<DescriptionTextProps>

export default function DescriptionText(props: Props) {
    return (
        <Text style={[{fontSize: 16, color: props.isLightText ? individualColors['backgroundDark'] : individualColors['backgroundLight']}, props.style]}>{props.text}</Text>)
}