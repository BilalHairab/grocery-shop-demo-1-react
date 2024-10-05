import { SafeAreaView, View, useColorScheme, FlatList, ScrollView, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import IconBorderedButton from '@/components/IconBorderedButton';
import TitleText from '@/components/TitleText';
import RoundedButton from '@/components/RoundedButton';
import { useCallback, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import OrderSummaryItem from '@/components/OrderSummaryItem';
import { individualColors } from '@/constants/Colors';
import RadioGroup, { RadioGroupItem } from '@/components/RadioGroup';
import { DeliveryOption, OrderState, PaymentOption } from '@/reducers/order/orderReducer.types';
import useCurrentOrder from '@/hooks/useCurrentOrder';
import AccentText from '@/components/AccentText';
import { CartItemCounter } from '@/reducers/cart/cartReducer.types';
import DescriptionText from '@/components/DescriptionText';

export default function OrderSummaryScreen() {
  const order = useCurrentOrder();
  const deliveryOptions = order.availableDeliveryMethods
  const paymentOptions = order.availablePaymentMethods
  const router = useRouter();
  const navigation = useNavigation();
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  useEffect(() => {
    if(order.activeOrder?.state === OrderState.PAID) {
      order.startDelivery()
    } else if (order.activeOrder?.state === OrderState.IN_DELIVERY) {
      navigation.navigate({ name: 'tracking' });
    } else if(order.activeOrder?.state === OrderState.DELIVERED || order.activeOrder?.state === OrderState.FINISHED) {
      navigation.navigate({ name: 'done' });
    }
  }, [order.activeOrder?.state])

  const calculateSubTotalAmount = useCallback(() => {
    if(order.activeOrder?.cart === undefined) {
      return 0.0;
    }
    const items: CartItemCounter[] = order.activeOrder?.cart;
    let total = 0;
    for(const item of items) {
        total += (item.count * item.item.price)
    }
    return total;
  }, [order.activeOrder?.cart]);

  useEffect(() => {
    if(order.error) {
      alert(order.error)
    }
  }, [order.error])

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{ backgroundColor: primaryColor, height: '100%' }}>
        <ScrollView style={{ backgroundColor: secondBackgroundColor, height: '100%', padding: 10, rowGap: 5 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, columnGap: 10, alignItems: 'center' }}>
            <IconBorderedButton size={35} name='arrow-back' isLightButton={useColorScheme() !== 'light'} onPress={() => {
              router.back();
            }} />

            <HeaderText text='Order Summary' />
          </View>
          <TitleText text='Delivery' style={{ paddingStart: 10, paddingTop: 15, marginBottom: 10 }} />
          <View style={{ borderRadius: 3, backgroundColor: individualColors['overflow'] }}>
            <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
              <RadioGroup items={deliveryOptions.map((option: DeliveryOption) => {
                return {
                  key: option.key,
                  labels: [option.label, option.subLabel, `+${option.fees} AED`],
                  value: option.fees as number,
                } as RadioGroupItem;
              })}
                onItemSelected={(item: RadioGroupItem) => {
                  order.setDelivery(item.key);
                }} />
            </View>
          </View>

          {paymentOptions.length > 0 && (<><TitleText text='Payment' style={{ paddingStart: 10, paddingTop: 15, marginBottom: 10 }} />
          <View style={{ borderRadius: 3, backgroundColor: individualColors['overflow'] }}>
            <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
              <RadioGroup items={paymentOptions.map((option: PaymentOption) => {
                return {
                  key: option.key,
                  labels: [option.label, `+${option.fees} AED`],
                  value: option.fees as number,
                } as RadioGroupItem;
              })}
                onItemSelected={(item: RadioGroupItem) => {
                  order.setPayment(item.key);
                }} />
            </View>
          </View></>)}
          
          <TitleText text='Order' style={{ paddingStart: 10, paddingTop: 15, marginBottom: 10 }} />
          <View style={{ borderRadius: 3, backgroundColor: individualColors['overflow'] }}>
            <FlatList
              keyExtractor={(item: any) => item.item.id} style={{ marginTop: 10, height: 'auto', }} data={Object.values(order.activeOrder?.cart ?? [])}
              renderItem={({ item, index }) => {
                return <OrderSummaryItem item={item} />
              }} />
            <View style={[styles.mainItem]}>
              <DescriptionText text={`Sub Total`} style={{ flex: 7, fontWeight: 'bold' }}></DescriptionText>
              <AccentText text={`AED ${(calculateSubTotalAmount()).toFixed(2)}`} />
            </View>
            <View style={{height: 10, padding: 5}}>
              <View style={{ height: 1, backgroundColor: 'grey' }}/>
            </View>
            <View style={[styles.mainItem]}>
              <DescriptionText text={`Delivery Fees`} style={{ flex: 7, fontWeight: 'bold' }}></DescriptionText>
              <AccentText text={`AED ${(order.activeOrder?.delivery?.fees ?? 0).toFixed(2)}`} />
            </View>
            <View style={[styles.mainItem]}>
              <DescriptionText text={`Payment Fees`} style={{ flex: 7, fontWeight: 'bold' }}></DescriptionText>
              <AccentText text={`AED ${((order.activeOrder?.payment?.fees ?? 0)).toFixed(2)}`} />
            </View>
            <View style={[styles.mainItem]}>
              <DescriptionText text={`Total`} style={{ flex: 7, fontWeight: 'bold' }}></DescriptionText>
              <AccentText text={`AED ${Number(order.total.toFixed(2)).toFixed(2)}`} />
            </View>

          </View>

          {Object.values(order.activeOrder?.cart ?? []).length > 0 && <RoundedButton style={{ width: '100%', alignSelf: 'flex-end', marginVertical: 10 }} title={`Proceed`} isLightButton={true} onPress={() => {
            order.pay()
          }} />}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    mainItem: {
      flexDirection: 'row',
      rowGap: 5,
      padding: 15,
      width: '100%',
      justifyContent: 'space-between'
  }
})