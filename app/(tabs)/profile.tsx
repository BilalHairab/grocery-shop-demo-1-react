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
import RoundedImage from '@/components/RoundedImage';
import DescriptionText from '@/components/DescriptionText';
import ActionFullButton from '@/components/ActionFullButton';

export default function ProfileScreen() {
  const actions = useRef([
    {icon: 'key-outline',
      label: 'Change Password'
    },
    {icon: 'location-outline',
      label: 'Addresses Book'
    },
    {icon: 'call-outline',
      label: 'Contact Us'
    },
    {icon: 'information-circle-outline',
      label: 'About'
    },
  ])
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{ backgroundColor: primaryColor, height: '100%' }}>
        <View style={{ backgroundColor: secondBackgroundColor, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 10, rowGap: 5 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between', alignItems: 'center' }}>
            <HeaderText text='Profile' />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'column', rowGap: 10, marginTop: 20, width: "100%"}}>
            <RoundedImage image={require("@/assets/images/man-person-icon.png")} dimension={120} borderColor='grey' borderWidth={2} />
            <TitleText text={'Bilal Hairab'} style={{textAlign: 'center'}} />
            <DescriptionText text={'bilal.hairab@gmail.com'} style={{textAlign: 'center'}} />
          </View>

          <View style={{alignItems: 'flex-start', flexDirection: 'column', rowGap: 20, marginTop: 40, marginEnd: 10, width: "100%"}}>
            {actions.current.map((action) => {
              return <ActionFullButton icon={action.icon} label={action.label} onPress={() => {

              } } />
            })}
          </View>


        </View>
      </View>
    </SafeAreaView>
  );
}