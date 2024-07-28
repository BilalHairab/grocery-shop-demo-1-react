import { StyleSheet, SafeAreaView, View, useColorScheme } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import IconBorderedButton from '@/components/IconBorderedButton';
import ChipsSelection from '@/components/ChipsSelection';

export default function HomeScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{backgroundColor: primaryColor, height: '100%'}}>
        <View style={{backgroundColor: secondBackgroundColor, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 10}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between', alignItems: 'center'}}>
            <HeaderText text='Daily Grocery' />
            <IconBorderedButton size={35} name='search-outline' isLightButton={useColorScheme() !== 'light'} onPress={() => {

            }} />
          </View>
          <ChipsSelection defaultSelection={0} style={{width: '100%', marginTop: 10}} elementTitles={['Fruit', 'Fast-Food', 'Vegatibles', 'Grocery', 'Fresh']} isLightElement={false} onItemSelected={(selectedIndex) => {

          }}/>
        </View>  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
