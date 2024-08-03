import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, Image, View } from "react-native";
import { StyleSheet } from 'react-native';
import TitleText from "./TitleText";
import { AirbnbRating } from "react-native-ratings";
import AccentText from "./AccentText";
import DescriptionText from "./DescriptionText";
import SolidSquaredIcon from "./SolidSquaredIcon";
type ItemProps = {
    item: any;
    index: number;
    onPress?: () => void,
    isLightButton?: boolean;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ItemProps>

export default function GroceryItem(props: Props) {
    return (<TouchableOpacity style={[styles.mainItem, props.style]} onPress={props.onPress} >
        <Image source={{ uri: props.item.filename}} style={{width: '100%', height: 150, borderRadius: 5, opacity: 0.7}} resizeMode='center' />
        <TitleText text={props.item.title} style={{color: props.isLightButton ? individualColors['backgroundDark'] : individualColors['backgroundLight'], fontWeight: 'bold', alignSelf: 'flex-start'}}></TitleText>
        <View style={{alignSelf: 'flex-start'}}>
            <AirbnbRating
            isDisabled={true}
            showRating={false}
            count={5}
            defaultRating={props.item.rating}
            size={10}
            />
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignSelf: 'flex-end'}}>
        <View>        
            <AccentText text={"AED " + props.item.price}/>
        </View>
        <View>
            <SolidSquaredIcon name={'add'} size={20} isLightButton={true} onPress={() => {

            }}/>
        </View>
        </View>
</TouchableOpacity>)
}

const styles = StyleSheet.create({
    mainItem: {
        borderRadius: 20,
        backgroundColor: individualColors['overflow'],
        flexDirection: 'column',
        flex: 1,
        rowGap: 5,
        padding: 10,
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