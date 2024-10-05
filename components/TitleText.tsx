import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type TitleTextProps = {
    text: string;
    isLightText?: boolean;
    style?: StyleProp<TextStyle>;
}

type Props = PropsWithChildren<TitleTextProps>

export default function TitleText(props: Props) {
    return (
        <Text style={[{fontSize: 20, fontWeight: 'bold'}, props.style]}>{props.text}</Text>)
}