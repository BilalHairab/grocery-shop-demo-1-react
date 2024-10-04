import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, StyleProp, ViewStyle, View, TextStyle } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import { Icon } from "./navigation/Icon";

type ButtonProps = {
    icon: any;
    label: string;
    onPress: () => void,
    disabled?: boolean,
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ButtonProps>

export default function ActionFullButton(props: Props) {
    // const textStyle = { color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' } as StyleProp<TextStyle>
    return (<TouchableOpacity style={[props.isLightButton ? styles.lightButton : styles.darkButton, styles.mainContainerStyle, props.style]} disabled={props.disabled ?? false} onPress={props.onPress}>
            <Icon name={props.icon} size={25} color={props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight']}/>
            <TitleText text={props.label} />
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        flexDirection: 'row',
        columnGap: 20,
        width: '100%',
        padding: 20,
        borderRadius: 20,
        backgroundColor: individualColors.overflow
    },
    lightButton: {
        backgroundColor: individualColors['backgroundLight']
    },
    darkButton: {
        backgroundColor: individualColors['backgroundDark']
    },
});