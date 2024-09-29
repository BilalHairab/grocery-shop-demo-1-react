import { SafeAreaView, View, FlatList } from 'react-native';

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
    if(selectedCategoryIndex === 0) {
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
          <ChipsSelection defaultSelection={selectedCategoryIndex} style={{ width: '100%', minHeight: 60 }} elementTitles={ordersTypes.current} isLightElement={false} onItemSelected={(selectedIndex) => {
            setSelectedCategoryIndex(selectedIndex)
          }} />

          <FlatList ListEmptyComponent={<View style={{height: '100%', flex: 1, alignSelf: 'center', alignContent: 'center'}}><TitleText style={{textAlign: 'center'}} text={'No previous orders.'} /></View>} keyExtractor={(item: OrderItem) => item.date + ""} style={{ marginVertical: 10, height: '100%' }} data={selectedOrders.reverse() ?? []} ItemSeparatorComponent={(_) => {
            return <View style={{ width: 10, height: 10 }} />
          }} renderItem={({ item, index }) => {
            return <OrderCard item={item} />
          }} />

        </View>
      </View>
    </SafeAreaView>
  );
}