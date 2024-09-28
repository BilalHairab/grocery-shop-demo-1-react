import { SafeAreaView, View, useColorScheme, FlatList, ScrollView } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import IconBorderedButton from '@/components/IconBorderedButton';
import TitleText from '@/components/TitleText';
import RoundedButton from '@/components/RoundedButton';
import { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import OrderSummaryItem from '@/components/OrderSummaryItem';
import { individualColors } from '@/constants/Colors';
import RadioGroup, { RadioGroupItem } from '@/components/RadioGroup';
import { DeliveryOption, OrderState, PaymentOption } from '@/reducers/order/orderReducer.types';
import useCurrentOrder from '@/hooks/useCurrentOrder';

export default function OrderSummaryScreen() {
  const order = useCurrentOrder();
  const deliveryOptions = order.availableDeliveryMethods
  const paymentOptions = order.availablePaymentMethods
  const router = useRouter();
  const navigation = useNavigation();
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  useEffect(() => {
    if(order.activeOrder?.state === undefined) {
      return;
    }
    if(order.activeOrder?.state === OrderState.PAID) {
      order.startDelivery()
    } else if (order.activeOrder?.state === OrderState.IN_DELIVERY) {
      navigation.navigate({ name: 'tracking' });
    } else if(order.activeOrder?.state === OrderState.DELIVERED){

    }
  }, [order.activeOrder?.state])

  useEffect(() => {
    if(order.error) {
      alert(order.error)
    }
  }, [order.error])

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
          <TitleText text='Items' style={{ paddingStart: 10, paddingTop: 15, marginBottom: 10 }} />
          <View style={{ borderRadius: 20, backgroundColor: individualColors['overflow'] }}>
            <FlatList
              keyExtractor={(item: any) => item.item.id} style={{ marginVertical: 10, height: 'auto', }} data={Object.values(order.activeOrder?.cart ?? [])} ItemSeparatorComponent={(_) => {
                return <View style={{ width: 10, height: 10 }} />
              }} renderItem={({ item, index }) => {
                return <OrderSummaryItem item={item} />
              }} />

          </View>
          <TitleText text='Delivery' style={{ paddingStart: 10, paddingTop: 15, marginBottom: 10 }} />
          <View style={{ borderRadius: 20, backgroundColor: individualColors['overflow'] }}>
            <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
              <RadioGroup items={deliveryOptions.map((option: DeliveryOption) => {
                return {
                  key: option.key,
                  label: option.label,
                  value: option.fees as number,
                } as RadioGroupItem;
              })}
                onItemSelected={(item: RadioGroupItem) => {
                  order.setDelivery(item.key);
                }} />
            </View>
          </View>

          {paymentOptions.length > 0 && (<><TitleText text='Payment' style={{ paddingStart: 10, paddingTop: 15, marginBottom: 10 }} />
          <View style={{ borderRadius: 20, backgroundColor: individualColors['overflow'] }}>
            <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
              <RadioGroup items={paymentOptions.map((option: PaymentOption) => {
                return {
                  key: option.key,
                  label: option.label,
                  value: option.fees as number,
                } as RadioGroupItem;
              })}
                onItemSelected={(item: RadioGroupItem) => {
                  order.setPayment(item.key);
                }} />
            </View>
          </View></>)}
          
          {Object.values(order.activeOrder?.cart ?? []).length > 0 && <RoundedButton style={{ width: '100%', alignSelf: 'flex-end', marginTop: 10 }} title={`Finalize (${Number(order.total.toFixed(2))} AED)`} isLightButton={true} onPress={() => {
            order.pay()
          }} />}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
