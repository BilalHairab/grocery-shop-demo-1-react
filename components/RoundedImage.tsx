import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle, View, Image, ColorValue } from "react-native";
import { StyleSheet } from 'react-native';

type ImageProps = {
    image: any,
    dimension: number,
    borderWidth?: number,
    borderColor?: ColorValue | undefined,
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ImageProps>

export default function RoundedImage(props: Props) {
    return (<View style={[styles.profileImgContainer, { borderColor: props.borderColor, borderWidth: props.borderWidth, height: props.dimension, width: props.dimension, borderRadius: props.dimension / 2 }]}>
        <Image source={props.image} style={[styles.profileImg, {height: props.dimension, width: props.dimension, borderRadius: props.dimension / 2}]} />
    </View>)
}

const styles = StyleSheet.create({
    profileImgContainer: {
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: 'hidden',
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
});
