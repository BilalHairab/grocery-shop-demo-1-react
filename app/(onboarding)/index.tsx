import DescriptionText from '@/components/DescriptionText';
import RoundedButton from '@/components/RoundedButton';
import TitleText from '@/components/TitleText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import userActions from '@/reducers/user/userActions'

export default function OnBoardingScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ height: '100%', flexDirection: 'column' }}>
      <View style={{backgroundColor: primaryColor}}>
        <View style={{ backgroundColor: secondBackgroundColor, height: '55%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
          <Image source={require("@/assets/images/intro-1585235194.jpg")} style={{width: '100%', height: '100%', alignSelf: 'center', borderRadius: 10}}/>
        </View>
        <View style={{ backgroundColor: primaryColor, height: '45%', marginHorizontal: 20, paddingVertical: 20, rowGap: 30, flexDirection: 'column', alignItems: 'center' }}>
          <TitleText text='Welcome to Grocery Shop' />
          <DescriptionText text='Emark on a culinary journey with fresh ingredients brought right to your kitchen.' style={{textAlign: 'center'}} />
          <RoundedButton style={{width: '100%', alignSelf: 'flex-end'}} title='Continue' isLightButton={true} onPress={() => {
            dispatch(userActions.login({username: 'Bilal', latitude: 0, longtitude: 0, address: 'Dubai 12655'}));
          }}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
