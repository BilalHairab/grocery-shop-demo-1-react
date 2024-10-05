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
import { Icon } from "./navigation/Icon";

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
    if (itemInCart === undefined) {
        return <View></View>;
    }
    return (
        <TouchableOpacity style={[styles.mainItem, props.style]} onPress={props.onItemPressed} >
            <View style={{ flexDirection: 'row', columnGap: 10, flex: 10 }}>
                <Image source={{ uri: props.item.filename }} style={{ width: 100, height: 120, borderRadius: 5, opacity: 0.7 }} resizeMode='stretch' />
                <View style={{ alignSelf: 'flex-start', flexDirection: 'column', height: '100%', width: '100%', paddingVertical: 10, rowGap: 15 }}>
                    <TitleText text={props.item.title} style={{ color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold' }}></TitleText>
                    <AccentText text={"AED " + props.item.price} />
                    <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'flex-end' }}>
                        <QuantityCounter counter={itemInCart.count} horizontal={true} maxAllowed={10} requestToUpdateCB={(quantity: number) => {
                            if (quantity > 0) {
                                dispatch(cartActions.addItem(itemInCart.item))
                            } else if (quantity < 0) {
                                dispatch(cartActions.removeItem(itemInCart.item))
                            }
                        }} />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ position: 'absolute', bottom: 15, right: 10 }} onPress={() => {
                dispatch(cartActions.clearItem(itemInCart.item.id))
            }}>
                <Icon name={"trash-outline"} size={27} color={individualColors.backgroundLight} />
            </TouchableOpacity>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    mainItem: {
        borderRadius: 20,
        backgroundColor: individualColors['overflow'],
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        flexDirection: 'row',
        flex: 1,
        rowGap: 5,
        padding: 10,
        marginHorizontal: 10,
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