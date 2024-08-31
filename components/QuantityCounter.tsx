import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren, useRef } from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import RoundedButton from "./RoundedButton";

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
        <View style={[styles.mainItem, props.style, isHorizontal.current ? { flexDirection:  'row-reverse', columnGap: 10 } : {flexDirection: 'column', rowGap: 5}]} >
            <RoundedButton style={[styles.button]} title="+" disabled={props.maxAllowed !== undefined && (props.counter === props.maxAllowed)} isLightButton={!props.isLightButton} onPress={() => {
                props.requestToUpdateCB(+1);
            }} />
            <TitleText text={`${props.counter}`} style={{ alignSelf: 'center' }}/>
            <RoundedButton style={[styles.button]} title="-" disabled={props.minAllowed !== undefined && (props.counter === props.minAllowed)} isLightButton={!props.isLightButton} onPress={() => {
                props.requestToUpdateCB(-1);
            }} />
        </View>)
}

const styles = StyleSheet.create({
    mainItem: {
        marginEnd: 5,
        alignItems: 'center' 
    },
    button: {
        borderRadius: 100,
        alignItems: 'center',
        padding: 0,
        height: 35,
        width: 35
    },
    lightButton: {
        backgroundColor: individualColors['backgroundLight']
    },
    darkButton: {
        backgroundColor: individualColors['backgroundDark']
    },
});