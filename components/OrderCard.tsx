import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren, useCallback } from "react";
import { StyleProp, ViewStyle, View, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import AccentText from "./AccentText";
import { OrderItem, OrderState } from "@/reducers/order/orderReducer.types";
import { CartItemCounter } from "@/reducers/cart/cartReducer.types";
import DescriptionText from "./DescriptionText";

type ItemProps = {
    item: OrderItem;
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ItemProps>

export default function OrderCard(props: Props) {
    const pendingOrderImage = require('@/assets/images/pending-order.png')
    const doneOrderImage = require('@/assets/images/done-order.png')
    const cashPaymentImage = require('@/assets/images/cash-payment.png')
    const cardPaymentImage = require('@/assets/images/card-payment.png')
    const noDeliveryImage = require('@/assets/images/no-delivery.png')
    const expressDeliveryImage = require('@/assets/images/express-delivery.png')
    const normalDeliveryImage = require('@/assets/images/normal-delivery.png')
  
    const getDeliveryImage = useCallback(() => {
        if(props.item.delivery?.key === "no") {
            return noDeliveryImage;
        }
        if(props.item.delivery?.key === "normal") {
            return normalDeliveryImage;
        }
        return expressDeliveryImage;
    }, [props.item]);
  
    const getPaymentImage = useCallback(() => {
        if(props.item.delivery?.key === "no") {
            return undefined;
        }
        if(props.item.payment?.key === "cod") {
            return cashPaymentImage;
        }
        return cardPaymentImage;
    }, [props.item]);
  
    const getOrderStateImage = useCallback(() => {
        if(props.item.state === OrderState.DELIVERED) {
            return doneOrderImage;
        }
        return pendingOrderImage;
    }, [props.item]);
  
    const calculateTotalAmount = useCallback(() => {
        const items: CartItemCounter[] = Object.values(props.item.cart);
        let total = 0;
        for (const item of items) {
          total += (item.count * item.item.price)
        }
        total += props.item.delivery?.fees ?? 0;
        total += props.item.payment?.fees ?? 0;
        return total;
    }, [props.item]);

    return (
        <TouchableOpacity style={[styles.mainItem, props.style]} >
            <View style={{ flexDirection: 'column', rowGap: 10 }}>
                <View style={{ flexDirection: 'row', width:'100%', columnGap: 10, justifyContent: 'space-between' }}>
                    <TitleText text={`${props.item.cart.length} Items`} />
                    <AccentText text={`${calculateTotalAmount().toFixed(2)} AED`} />
                </View>
                <View style={{ flexDirection: 'row', width:'100%', columnGap: 10, justifyContent: 'space-between' }}>
                    <DescriptionText text={`${new Date(props.item.date).toDateString()}`} style={{textAlign: 'left', alignSelf: 'flex-start'}}/>
                </View>
                <View style={{ flexDirection: 'row', width:'100%', columnGap: 10, justifyContent: 'space-between' }}>
                    <Image source={getDeliveryImage()} style={{ width: 30, height: 30 }}/>
                    <Image source={getPaymentImage()} style={{ width: 30, height: 30 }}/>
                    <Image source={getOrderStateImage()} style={{ width: 30, height: 30 }}/>
                </View>
            </View>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    mainItem: {
        borderRadius: 20,
        backgroundColor: individualColors['overflow'],
        flexDirection: 'row',
        flex: 1,
        rowGap: 5,
        padding: 10,
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 40,
        alignItems: 'center',
        padding: 15,
    },
    lightButton: {
        backgroundColor: individualColors['backgroundLight']
    },
    darkButton: {
        backgroundColor: individualColors['backgroundDark']
    },
});