import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ActivityIndicator, SafeAreaView, useColorScheme, View, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IconBorderedButton from '@/components/IconBorderedButton';
import { router } from 'expo-router';
import { cartViewingItemSelector, fullCartSelector } from '@/reducers/cart/cartSelectors';
import HeaderText from '@/components/HeaderText';
import QuantityCounter from '@/components/QuantityCounter';
import { AirbnbRating } from 'react-native-ratings';
import DescriptionText from '@/components/DescriptionText';
import RoundedButton from '@/components/RoundedButton';
import cartActions from '@/reducers/cart/cartActions';
import AccentText from '@/components/AccentText';
import { individualColors } from '@/constants/Colors';

export default function ProductDetailsScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const dispatch = useDispatch();
  const secondBackgroundColor = useThemeColor({}, 'background');
  const currentItem = useSelector(cartViewingItemSelector);
  const itemInCart = useSelector(fullCartSelector)[currentItem?.id ?? -1];
  return (
    <SafeAreaView style={{ height: '100%', flexDirection: 'column', backgroundColor: secondBackgroundColor }}>
      {currentItem ? (
      <View style={{height: '100%'}}>
        <View style={{height: '55%'}}>
          <Image source={{ uri: currentItem.filename }} style={{ width: '100%', height: '100%', alignSelf: 'center' }} resizeMode='stretch' />
          <IconBorderedButton style={{ position: 'absolute', top: 15, left: 10 }} size={35} name='arrow-back' isLightButton={useColorScheme() !== 'light'} onPress={() => {
              router.back();
            }} />
        </View>
        <View style={{height: '60%', width: '100%', position: 'absolute', top: '50%', borderTopStartRadius: 20, borderTopEndRadius: 20, backgroundColor: individualColors.backgroundDark, padding: 10, rowGap: 15}} >
        <View style={{ flexDirection: 'row' }}>
            <HeaderText text={currentItem.title} style={{ flex: 7 }} />
            {itemInCart && <QuantityCounter style={{ columnGap: 10, flex: 3 }} counter={itemInCart?.count ?? 0} horizontal={true} requestToUpdateCB={(quantity: number) => {
                if (quantity > 0) {
                    dispatch(cartActions.addItem(currentItem));
                  } else {
                    dispatch(cartActions.removeItem(currentItem));
                  }
            }} />}
          </View>
          <View style={{ alignSelf: 'flex-start' }}>
            <AccentText text={currentItem.price.toFixed(2) + " AED/ item"} />
            {itemInCart?.count > 1 && <AccentText text={(currentItem.price * itemInCart?.count).toFixed(2) + " AED"} />}
          </View>

          <View style={{ alignSelf: 'flex-start' }}>
            <AirbnbRating
                isDisabled={true}
                showRating={false}
                count={5}
                defaultRating={currentItem.rating}
                size={10}
              />
          </View>

          <View style={{ alignSelf: 'flex-start' }}>
            <DescriptionText
              text={currentItem.description}
            />
          </View>

          {(!itemInCart?.count || itemInCart?.count === 0) && <RoundedButton style={{width: '100%', alignSelf: 'flex-end'}} title='Add to Cart' isLightButton={true} onPress={() => {
            dispatch(cartActions.addItem(currentItem));
          }}/>}

        </View>
      </View>
    ): <ActivityIndicator size={400} />}
    </SafeAreaView>
  );
}
