import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, StyleProp, ViewStyle, Image, View } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import { AirbnbRating } from "react-native-ratings";
import AccentText from "./AccentText";
import { useDispatch, useSelector } from "react-redux";
import cartActions from '@/reducers/cart/cartActions'
import { cartItemSelector, fullCartSelector } from "@/reducers/cart/cartSelectors";
import QuantityCounter from "./QuantityCounter";
import RoundedButton from "./RoundedButton";

type ItemProps = {
    item: any;
    index: number;
    onItemPress?: () => void,
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ItemProps>

export default function GroceryItem(props: Props) {
    const dispatch = useDispatch();
    const existInCart = useSelector(cartItemSelector(props.item.id))
    //Important to re-render on each update
    const itemInCart = useSelector(fullCartSelector)[existInCart?.id ?? -1];

    return (<TouchableOpacity style={[styles.mainItem, props.style]} onPress={props.onItemPress} >
        <Image source={{ uri: props.item.filename }} style={{ width: '100%', height: 150, borderRadius: 5, opacity: 0.9 }} resizeMode='cover' />
        <TitleText text={props.item.title} style={{ fontWeight: 'bold', alignSelf: 'flex-start' }}></TitleText>
        <View style={{ alignSelf: 'flex-start' }}>
            <AirbnbRating
                isDisabled={true}
                showRating={false}
                count={5}
                defaultRating={props.item.rating}
                size={10}
            />
        </View>
        <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignSelf: 'flex-end' }}>
            <View>
                <AccentText text={"AED " + props.item.price} />
            </View>
        </View>
        <View style={{height: '10%', width: '100%', flex: 1}}>
                {existInCart ? <QuantityCounter style={{ width: '100%', justifyContent: 'space-between', height: 40 }} counter={existInCart?.count ?? 0} horizontal={true} requestToUpdateCB={(quantity: number) => {
                if (quantity > 0) {
                    dispatch(cartActions.addItem(props.item));
                  } else {
                    dispatch(cartActions.removeItem(props.item));
                  }
            }} /> : <RoundedButton isLarge={false} style={[existInCart ? { backgroundColor: individualColors.primary } : {}, {height: 40}]} title={'Add to cart'} isLightButton={true} onPress={() => {
                    if (existInCart) {
                        dispatch(cartActions.removeItem(props.item));
                    } else {
                        dispatch(cartActions.addItem(props.item));
                    }
                }} />}
            </View>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    mainItem: {
        borderRadius: 20,
        backgroundColor: individualColors['overflow'],
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 10,
        rowGap: 5,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 6,
      alignItems: 'center'
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