import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from 'react-native';
import { Icon } from "./navigation/Icon";

type SolidSquaredIconProps = {
    name: any;
    onPress: () => void,
    size: number;
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<SolidSquaredIconProps>

export default function SolidSquaredIcon(props: Props) {
    return (<TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}><Icon name={props.name} size={props.size} color={props.isLightButton ? individualColors['backgroundLight'] : individualColors['backgroundDark']} style={{alignSelf:'center', verticalAlign: 'middle'}}/></TouchableOpacity>)
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        backgroundColor: individualColors.secondaryFocus,
        borderColor: 'transparent',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
    },
});