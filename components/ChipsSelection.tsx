import { individualColors } from "@/constants/Colors";
import React, { PropsWithChildren, useState } from "react";
import { StyleProp, ViewStyle, FlatList, View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from 'react-native';

type ChipsSelectionProps = {
    elementTitles: string[];
    isLightElement: boolean;
    onItemSelected: (index: number) => void;
    defaultSelection?: number;
    style?: StyleProp<ViewStyle>;
}
type Props = PropsWithChildren<ChipsSelectionProps>

export default function ChipsSelection(props: Props) {
    const primary = props.isLightElement ? individualColors['backgroundDark'] : individualColors['overflow']
    const secondary = props.isLightElement ? individualColors['overflow'] : individualColors['backgroundDark']
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(props.defaultSelection);
    return (
        <FlatList 
            horizontal 
            data={props.elementTitles}
            style={props.style} 
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={(props) => {
                return <View style={{width: 10}} />
            }}
            keyExtractor={(item) => item} 
            renderItem={({item, index}) => {
                return <View>
                    <TouchableOpacity style={[styles.itemContainer, {backgroundColor: index === selectedIndex ? primary : secondary}]} onPress={() => {
                        setSelectedIndex(index)
                        props.onItemSelected(index)
                    }}>
                        <Text style={[styles.itemText, {color: index === selectedIndex ? secondary : primary}]}>{item}</Text>
                    </TouchableOpacity>
                </View>
            }}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    button: {
        borderRadius: 50,
        backgroundColor: 'tranparent',
        borderColor: individualColors.overflow,
        paddingVertical: 15,
        paddingHorizontal: 8,
        borderWidth: 1,
    },
});