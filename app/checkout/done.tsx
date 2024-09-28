import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

import { SafeAreaView, View } from 'react-native';
import HeaderText from '@/components/HeaderText';
import { router } from 'expo-router';
import RoundedButton from '@/components/RoundedButton';
import useCurrentOrder from '@/hooks/useCurrentOrder';
import TitleText from '@/components/TitleText';

export default function OrderDoneScreen() {
  const secondBackgroundColor = useThemeColor({}, 'background');
  const order = useCurrentOrder()
  return (
    <SafeAreaView style={{ height: '100%', flexDirection: 'column', backgroundColor: secondBackgroundColor }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 5, columnGap: 10, alignItems: 'center', marginVertical: 10, marginStart: 10 }}>
        <HeaderText text='Order Completed' />
      </View>

      <View style={{height: '100%', flex: 1, justifyContent: 'space-around'}}>
        <View style={{alignItems: 'center', width: '100%'}}>
          <TitleText text={order.activeOrder === undefined ? 'The order you requested has been delivered to you, thank you and buy again!': 'The order should be ready soon at the store, go pick it up!'} style={{textAlign: 'center', marginHorizontal: 10}}/>
          <RoundedButton style={{ marginTop: 40, width: '100%' }} title={'Okay'} isLightButton={true} onPress={() => {
            router.replace('../(tabs)');
          }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
