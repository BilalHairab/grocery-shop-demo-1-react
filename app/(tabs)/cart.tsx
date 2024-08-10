import { SafeAreaView, View, useColorScheme, FlatList, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import IconBorderedButton from '@/components/IconBorderedButton';
import { useSelector } from 'react-redux';
import { fullCartSelector } from '@/reducers/cart/cartSelectors';
import CartItem from '@/components/CartItem';
import TitleText from '@/components/TitleText';

export default function CartScreen() {
  const cartItems = useSelector(fullCartSelector);
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{ backgroundColor: primaryColor, height: '100%' }}>
        <View style={{ backgroundColor: secondBackgroundColor, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 10 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between', alignItems: 'center' }}>
            <HeaderText text='Cart' />
            <IconBorderedButton size={35} name='search-outline' isLightButton={useColorScheme() !== 'light'} onPress={() => {

            }} />
          </View>
          <FlatList ListEmptyComponent={<View style={{height: '100%', flex: 1, alignSelf: 'center', alignContent: 'center'}}><TitleText style={{textAlign: 'center'}} text={'Nothing in cart, go add items from Home tab.'} /></View>} keyExtractor={(item: any) => item.item.id} style={{ marginVertical: 10, height: '100%' }} data={Object.values(cartItems) ?? []} ItemSeparatorComponent={(_) => {
            return <View style={{ width: 10, height: 10 }} />
          }} renderItem={({ item, index }) => {
            return <CartItem item={item.item}/>
          }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
