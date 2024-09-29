import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren, useRef } from "react";
import { StyleProp, ViewStyle, View, TouchableOpacity } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import RoundedButton from "./RoundedButton";
import DescriptionText from "./DescriptionText";
import HeaderText from "./HeaderText";

type QuantityCounterProps = {
    counter: number;
    horizontal: boolean;
    requestToUpdateCB: (quantity: number) => void;
    maxAllowed?: number;
    minAllowed?: number;
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<QuantityCounterProps>

export default function QuantityCounter(props: Props) {
    const isHorizontal = useRef(props.horizontal);
    return (
        <View style={[styles.mainItem, props.style, isHorizontal.current ? { flexDirection:  'row-reverse', columnGap: 10, alignSelf: 'center' } : {flexDirection: 'column', rowGap: 5, alignSelf: 'center'}, props.isLightButton ? styles.darkButton : styles.lightButton]} >
            <TouchableOpacity style={[styles.button]} disabled={props.maxAllowed !== undefined && (props.counter === props.maxAllowed)} onPress={() => {
                props.requestToUpdateCB(+1);
            }}><HeaderText text="+" isLightText={!props.isLightButton}/></TouchableOpacity>
            <TitleText text={`${props.counter}`} style={{ alignSelf: 'center', alignItems: 'center' }} isLightText={!props.isLightButton}/>
            <TouchableOpacity style={[styles.button]} disabled={props.maxAllowed !== undefined && (props.counter === props.maxAllowed)} onPress={() => {
                props.requestToUpdateCB(-1);
            }}><HeaderText text="-" isLightText={!props.isLightButton}/></TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    mainItem: {
        marginEnd: 5,
        alignItems: 'center',
        borderRadius: 100,
    },
    button: {
        alignItems: 'center',
        padding: 0,
        height: 40,
        width: 40
    },
    lightButton: {
        backgroundColor: individualColors['backgroundLight']
    },
    darkButton: {
        backgroundColor: individualColors['backgroundDark']
    },
});