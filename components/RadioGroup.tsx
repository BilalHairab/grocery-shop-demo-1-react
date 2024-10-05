import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native';
import DescriptionText from './DescriptionText';
import { individualColors } from '@/constants/Colors';

type RadioButtonProps = {
    label: string;
    selected: boolean;
    onSelect: () => void;
}

const CustomRadioButton = (itemProps: RadioButtonProps) => (
    <TouchableOpacity
        style={[styles.radioButton,
            , itemProps.selected ? { borderColor: individualColors.backgroundLight, borderWidth: 2 } : {
                borderWidth: 0.5,
                borderColor: 'grey',
            }]}
        onPress={itemProps.onSelect}
    >
        <DescriptionText style={[styles.radioButtonText,
        ]} text={itemProps.label} />

    </TouchableOpacity>
);

const styles = StyleSheet.create({
    radioButton: {
        padding: 8,
        borderRadius: 8,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        height: 50
    },
    radioButtonText: {
        fontSize: 16,
    },
});
export type RadioGroupItem = {
    key: string, label: string, value: any
};

type RadioGroupProps = {
    items: RadioGroupItem[];
    onItemSelected: (item: RadioGroupItem) => void;
}
type Props = PropsWithChildren<RadioGroupProps>


const RadioGroup = (props: Props) => {
    const [selectedValue, setSelectedValue] = useState<RadioGroupItem>(props.items[0]);
    useEffect(() => {
        props.onItemSelected(selectedValue);
    }, [selectedValue])
    return (
        <View>
            {props.items.map((item) => {
                return <CustomRadioButton
                    key={item.key}
                    label={item.label}
                    selected={selectedValue.key === item.key}
                    onSelect={() => setSelectedValue(item)}
                />
            })}
        </View>
    );
};

export default RadioGroup;