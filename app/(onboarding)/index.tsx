import DescriptionText from '@/components/DescriptionText';
import RoundedButton from '@/components/RoundedButton';
import TitleText from '@/components/TitleText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AuthAction } from '@/reducers/user/userReducer.types';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function OnBoardingScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ height: '100%', flexDirection: 'column' }}>
      <View style={{backgroundColor: primaryColor}}>
        <View style={{ backgroundColor: secondBackgroundColor, height: '55%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>

        </View>
        <View style={{ backgroundColor: primaryColor, height: '45%', marginHorizontal: 20, paddingVertical: 20, rowGap: 30, flexDirection: 'column', alignItems: 'center' }}>
          <TitleText text='Welcome to Grocery Shop' />
          <DescriptionText text='Emark on a culinary journey with fresh ingredients brought right to your kitchen.' style={{textAlign: 'center'}} />
          <RoundedButton style={{width: '100%', alignSelf: 'flex-end'}} title='Continue' isLightButton={true} onPress={() => {
            dispatch({type: 'login', payload: {username: 'Bilal', latitude: 0, longtitude: 0, address: 'Dubai 12655'}} as AuthAction);
          }}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
