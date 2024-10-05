import { SafeAreaView, View, FlatList, Image } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import { useDispatch, useSelector } from 'react-redux';
import { fullCartSelector } from '@/reducers/cart/cartSelectors';
import CartItem from '@/components/CartItem';
import TitleText from '@/components/TitleText';
import RoundedButton from '@/components/RoundedButton';
import AccentText from '@/components/AccentText';
import { useCallback } from 'react';
import { CartItemCounter } from '@/reducers/cart/cartReducer.types';
import { router } from 'expo-router';
import cartActions from '@/reducers/cart/cartActions';
import useCurrentOrder from '@/hooks/useCurrentOrder';

export default function CartScreen() {
  const order = useCurrentOrder();
  const cartItems = useSelector(fullCartSelector);
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  const dispatch = useDispatch();
  const calculateTotalAmount = useCallback(() => {
    if(cartItems === undefined) {
      return 0.0;
    }
    const items: CartItemCounter[] = Object.values(cartItems);
    let total = 0;
    for(const item of items) {
        total += (item.count * item.item.price)
    }
    return total;
  }, [cartItems]);
  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{ backgroundColor: primaryColor, height: '100%' }}>
        <View style={{ backgroundColor: secondBackgroundColor, height: '100%', padding: 10, rowGap: 5 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between', alignItems: 'center' }}>
            <HeaderText text='Cart' />
          </View>
          <View style={{height: '100%', width: '100%', flex: 1 }}>
            {(Object.values(cartItems) ?? []).length > 0 ? <FlatList 
              keyExtractor={(item: any) => item.item.id}
              style={{ marginVertical: 10, height: '100%', width: '100%', paddingTop: 10,  }} 
              data={Object.values(cartItems) ?? []} 
              ItemSeparatorComponent={(_) => {
                  return <View style={{ width: 10, height: 10 }} />
                }} 
              renderItem={({ item, index }) => {
                return <CartItem item={item.item} onItemPressed={() => {
                  dispatch(cartActions.setViewingItem(item.item));
                  router.push('/(product)');
                }}/>
            }} /> : <View style={{height: '100%', flex: 1, flexDirection: 'column', alignItems:'center', justifyContent: 'center', rowGap: 10 }}>
              <Image source={require('@/assets/images/empty-cart.jpg')} style={{width: 250, height: 250 }} resizeMode='cover' />
            <TitleText style={{textAlign: 'center', alignSelf: 'center', verticalAlign: 'middle', marginHorizontal: 10}} text={'Nothing in cart, go add items from Home tab.'} />
          </View>}
            

          </View>
          <AccentText text={`Total: ${calculateTotalAmount().toFixed(2)} AED`} style={{textAlign: 'center'}} />
          {Object.values(cartItems).length > 0 && <RoundedButton style={{width: '100%', alignSelf: 'flex-end'}} title='Checkout' isLightButton={true} onPress={() => {
              order.startOrder(Object.values(cartItems));
              router.push('/checkout');
          }}/>}

        </View>
      </View>
    </SafeAreaView>
  );
}
