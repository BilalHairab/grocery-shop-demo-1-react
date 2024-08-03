import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type AccentTextProps = {
    text: string;
    style?: StyleProp<TextStyle>;
}

type Props = PropsWithChildren<AccentTextProps>

export default function AccentText(props: Props) {
    return (
        <Text style={[{fontSize: 18, color: individualColors['secondaryFocus']}]}>{props.text}</Text>)
}