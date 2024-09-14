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
        { backgroundColor: itemProps.selected ? '#007BFF' : 'transparent' }]}
        onPress={itemProps.onSelect}
    >
        <DescriptionText style={[styles.radioButtonText,
        { color: itemProps.selected ? individualColors.backgroundDark : individualColors.backgroundLight }]} text={itemProps.label}/>
            
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    radioButton: {
        paddingVertical: 8,
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#007BFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        height: 50
    },
    radioButtonText: {
        padding: 10,
        fontSize: 16,
    },
});
export type RadioGroupItem = {
    key: string, label: string
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
                    label={item.label}
                    selected={selectedValue.key === item.key}
                    onSelect={() => setSelectedValue(item)}
                />
            })}
        </View>
    );
};

export default RadioGroup;