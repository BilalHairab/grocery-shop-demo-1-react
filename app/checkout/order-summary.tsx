import { SafeAreaView, View, useColorScheme, FlatList, StyleSheet, ScrollView } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import IconBorderedButton from '@/components/IconBorderedButton';
import { useDispatch, useSelector } from 'react-redux';
import { fullCartSelector } from '@/reducers/cart/cartSelectors';
import TitleText from '@/components/TitleText';
import RoundedButton from '@/components/RoundedButton';
import { useCallback, useRef, useState } from 'react';
import { CartItemCounter } from '@/reducers/cart/cartReducer.types';
import { useNavigation, useRouter } from 'expo-router';
import OrderSummaryItem from '@/components/OrderSummaryItem';
import { individualColors } from '@/constants/Colors';
import RadioGroup, { RadioGroupItem } from '@/components/RadioGroup';

export default function OrderSummaryScreen() {
  const deliveryOptions = useRef([{key: 'no', label: "Pickup from Store"}, {key: 'normal', label: "Normal (1 days, +5 AED)"}, {key: 'express', label: "Instant (+10 AED)"}])
  const paymentOptions = useRef([{key: 'cod', label: "Cash On Delivery (+5 AED)"}, {key: 'credit_debit', label: "Credit/Debit Card"}])
  const [deliveryFees, setDeliveryFees] = useState(0)
  const [paymentFees, setPaymentFees] = useState(0)
  const router = useRouter();
  const navigation = useNavigation();
  const cartItems = useSelector(fullCartSelector);
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  const calculateTotalAmount = useCallback(() => {
    const items: CartItemCounter[] = Object.values(cartItems);
    let total = 0;
    for (const item of items) {
      total += (item.count * item.item.price)
    }
    total += deliveryFees;
    total += paymentFees;
    return total;
  }, [cartItems, deliveryFees, paymentFees]);
  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{ backgroundColor: primaryColor, height: '100%' }}>
        <ScrollView style={{ backgroundColor: secondBackgroundColor, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 10, rowGap: 5 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, columnGap: 10, alignItems: 'center' }}>
            <IconBorderedButton size={35} name='arrow-back' isLightButton={useColorScheme() !== 'light'} onPress={() => {
              router.back();
            }} />

            <HeaderText text='Order Summary' />
          </View>
          <TitleText text='Items' style={{paddingStart: 10, paddingTop: 15, marginBottom: 10}}/>
          <View style={{ borderRadius: 20, backgroundColor: individualColors['overflow'] }}>
            <FlatList
              keyExtractor={(item: any) => item.item.id} style={{ marginVertical: 10, height: 'auto', }} data={Object.values(cartItems) ?? []} ItemSeparatorComponent={(_) => {
                return <View style={{ width: 10, height: 10 }} />
              }} renderItem={({ item, index }) => {
                return <OrderSummaryItem item={item} />
              }} />

          </View>
          <TitleText text='Delivery' style={{paddingStart: 10, paddingTop: 15, marginBottom: 10}}/>
          <View style={{ borderRadius: 20, backgroundColor: individualColors['overflow'] }}>
            <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
            <RadioGroup items={deliveryOptions.current} 
            onItemSelected={(item: RadioGroupItem) => {
              if(item.key === 'no') {
                setDeliveryFees(0)
              } else if(item.key === 'normal') {
                setDeliveryFees(5)
              } else if(item.key === 'express') {
                setDeliveryFees(10)
              }
            }} />
            </View>
            </View>


            <TitleText text='Payment' style={{paddingStart: 10, paddingTop: 15, marginBottom: 10}}/>
          <View style={{ borderRadius: 20, backgroundColor: individualColors['overflow'] }}>
            <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
            <RadioGroup items={paymentOptions.current} 
            onItemSelected={(item: RadioGroupItem) => {
              if(item.key === 'cod') {
                setPaymentFees(5)
              } else if(item.key === 'credit_debit') {
                setPaymentFees(0)
              }
            }} />
            </View>

          </View>
          {Object.values(cartItems).length > 0 && <RoundedButton style={{ width: '100%', alignSelf: 'flex-end', marginTop: 10 }} title={`Finalize (${calculateTotalAmount().toFixed(2)} AED)`} isLightButton={true} onPress={() => {
            navigation.navigate({name: 'tracking'});
          }} />}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
