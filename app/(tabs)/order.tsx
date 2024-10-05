import { SafeAreaView, View, FlatList, Image } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import { useSelector } from 'react-redux';
import TitleText from '@/components/TitleText';
import { ordersSelector } from '@/reducers/order/orderSelectors';
import ChipsSelection from '@/components/ChipsSelection';
import { useEffect, useRef, useState } from 'react';
import { OrderItem, OrderState } from '@/reducers/order/orderReducer.types';
import OrderCard from '@/components/OrderCard';

export default function OrderScreen() {
  const ordersTypes = useRef(["All", "Done", "In Progress"])
  const orders = useSelector(ordersSelector);
  const [selectedOrders, setSelectedOrders] = useState<OrderItem[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  useEffect(() => {
    if (selectedCategoryIndex === 0) {
      setSelectedOrders(orders)
    } else if (selectedCategoryIndex === 1) {
      setSelectedOrders(orders.filter((item) => item.state === OrderState.DELIVERED));
    } else if (selectedCategoryIndex === 2) {
      setSelectedOrders(orders.filter((item) => item.state < OrderState.DELIVERED || item.state === OrderState.FINISHED));
    }
  }, [selectedCategoryIndex]);

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{ backgroundColor: primaryColor, height: '100%' }}>
        <View style={{ backgroundColor: secondBackgroundColor, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 10, rowGap: 5 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between', alignItems: 'center' }}>
            <HeaderText text='Orders' />
          </View>
          <ChipsSelection defaultSelection={selectedCategoryIndex} style={{ width: '100%', minHeight: '10%' }} elementTitles={ordersTypes.current} isLightElement={false} onItemSelected={(selectedIndex) => {
            setSelectedCategoryIndex(selectedIndex)
          }} />

          <View style={{ height: '100%', width: '100%' }}>
            {(selectedOrders ?? []).length > 0 ? <FlatList keyExtractor={(item: OrderItem) => item.date + ""} style={{ marginVertical: 10, height: '100%' }} data={selectedOrders.reverse() ?? []} ItemSeparatorComponent={(_) => {
              return <View style={{ width: 10, height: 10 }} />
            }} renderItem={({ item, index }) => {
              return <OrderCard item={item} />
            }} />
              : <View style={{ height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: 10 }}>
                <Image source={require('@/assets/images/empty-orders.jpg')} style={{ width: 250, height: 250 }} resizeMode='cover' />
                <TitleText style={{ textAlign: 'center', alignSelf: 'center', verticalAlign: 'middle', marginHorizontal: 10 }} text={'No previous orders.'} />
              </View>}
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}