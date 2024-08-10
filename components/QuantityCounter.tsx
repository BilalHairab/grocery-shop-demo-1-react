import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren, useRef, useState } from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, Image, View } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import AccentText from "./AccentText";
import SolidSquaredIcon from "./SolidSquaredIcon";
import { useDispatch, useSelector } from "react-redux";
import cartActions from '@/reducers/cart/cartActions'
import { cartItemSelector } from "@/reducers/cart/cartSelectors";
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
        <View style={[styles.mainItem, props.style, { flexDirection: isHorizontal.current ? 'row' : 'column' }]} >
            <RoundedButton style={styles.button} title="+" disabled={props.maxAllowed !== undefined && (props.counter === props.maxAllowed)} isLightButton={false} onPress={() => {
                props.requestToUpdateCB(+1);
            }} />
            <TitleText text={`${props.counter}`} style={{ alignSelf: 'center' }}/>
            <RoundedButton style={styles.button} title="-" disabled={props.minAllowed !== undefined && (props.counter === props.minAllowed)} isLightButton={false} onPress={() => {
                props.requestToUpdateCB(-1);
            }} />
        </View>)
}

const styles = StyleSheet.create({
    mainItem: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginEnd: 5,
        alignItems: 'center'
    },
    button: {
        borderRadius: 100,
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: 'transparent'
    },
    lightButton: {
        backgroundColor: individualColors['backgroundLight']
    },
    darkButton: {
        backgroundColor: individualColors['backgroundDark']
    },
});