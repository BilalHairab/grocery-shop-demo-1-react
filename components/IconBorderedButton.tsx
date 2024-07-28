import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from 'react-native';
import { Icon } from "./navigation/Icon";

type IconBorderedButtonProps = {
    name: any;
    onPress: () => void,
    size: number;
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<IconBorderedButtonProps>

export default function IconBorderedButton(props: Props) {
    return (<TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}><Icon name={props.name} size={props.size} color={props.isLightButton ? individualColors['backgroundLight'] : individualColors['backgroundDark']}/></TouchableOpacity>)
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        backgroundColor: 'tranparent',
        borderColor: individualColors.overflow,
        paddingVertical: 15,
        paddingHorizontal: 8,
        borderWidth: 1,
    },
});