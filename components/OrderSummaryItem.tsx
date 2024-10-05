import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import { StyleSheet } from 'react-native';
import AccentText from "./AccentText";
import { CartItemCounter } from "@/reducers/cart/cartReducer.types";
import DescriptionText from "./DescriptionText";

type ItemProps = {
    item: CartItemCounter;
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ItemProps>

export default function OrderSummaryItem(props: Props) {
    return (
        <View style={[styles.mainItem, props.style]}>
            <DescriptionText text={`${props.item.count} x ${props.item.item.title}`} style={{ flex: 7, color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold' }} />
            <AccentText text={`AED ${(props.item.item.price * props.item.count).toFixed(2)}`} />
        </View>)
}

const styles = StyleSheet.create({
    mainItem: {
        flexDirection: 'row',
        rowGap: 5,
        padding: 15,
        width: '100%',
        justifyContent: 'space-between'
    }
});