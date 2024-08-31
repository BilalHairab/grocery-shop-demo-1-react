import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle, Image, View, TouchableOpacity } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import AccentText from "./AccentText";
import { useDispatch, useSelector } from "react-redux";
import cartActions from '@/reducers/cart/cartActions'
import { cartItemSelector } from "@/reducers/cart/cartSelectors";
import QuantityCounter from "./QuantityCounter";

type ItemProps = {
    item: any;
    isLightButton?: boolean;
    onItemPressed?: () => void;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ItemProps>

export default function CartItem(props: Props) {
    const dispatch = useDispatch();
    const itemInCart = useSelector(cartItemSelector(props.item.id))
    if(itemInCart === undefined) {
        return <View></View>;
    }
    return (
        <TouchableOpacity style={[styles.mainItem, props.style]} onPress={props.onItemPressed} >
            <View style={{ flexDirection: 'row', columnGap: 10, flex: 10 }}>
                <Image source={{ uri: props.item.filename }} style={{ width: 80, height: 100, borderRadius: 5, opacity: 0.7 }} resizeMode='stretch' />
                <View style={{ alignSelf: 'flex-start', flexDirection: 'column', height: '100%', paddingVertical: 10, justifyContent: 'space-between' }}>
                    <TitleText text={props.item.title} style={{ color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold' }}></TitleText>
                    <AccentText text={"AED " + props.item.price}/>
                </View>
            </View>
            <QuantityCounter counter={itemInCart.count} horizontal={false} maxAllowed={10} style={{ flex: 1 }} requestToUpdateCB={(quantity: number) => {
                if(quantity > 0) {
                    dispatch(cartActions.addItem(itemInCart.item))
                } else if (quantity < 0) {
                    dispatch(cartActions.removeItem(itemInCart.item))
                }
            } }/>
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