import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
    View, TouchableOpacity,
    StyleSheet
} from 'react-native';
import DescriptionText from './DescriptionText';
import { individualColors } from '@/constants/Colors';
import TitleText from './TitleText';

type RadioButtonProps = {
    labels: string[];
    selected: boolean;
    onSelect: () => void;
}

const CustomRadioButton = (itemProps: RadioButtonProps) => (
    <TouchableOpacity
        style={[styles.radioButton,
            , itemProps.selected ? { borderColor: individualColors.backgroundLight, borderWidth: 2, backgroundColor: individualColors.backgroundDark } : {
                borderWidth: 0.5,
                borderColor: 'grey',
            }]}
        onPress={itemProps.onSelect}
    >
        <TitleText style={[styles.radioButtonText,
        ]} text={itemProps.labels[0]} />

        <DescriptionText style={[styles.radioButtonText,
                ]} text={`${itemProps.labels[1]}`} />

        {itemProps.labels.length > 2 && <DescriptionText style={[styles.radioButtonText,
                ]} text={`${itemProps.labels[2]}`} />}

    </TouchableOpacity>
);

const styles = StyleSheet.create({
    radioButton: {
        padding: 8,
        borderRadius: 8,
        marginVertical: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: "100%",
        rowGap: 5,
    },
    radioButtonText: {
        fontSize: 16,
    },
});
export type RadioGroupItem = {
    key: string, labels: string[], value: any
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
                    labels={item.labels}
                    selected={selectedValue.key === item.key}
                    onSelect={() => setSelectedValue(item)}
                />
            })}
        </View>
    );
};

export default RadioGroup;