import { StyleSheet, SafeAreaView, View, useColorScheme, FlatList, Image } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import IconBorderedButton from '@/components/IconBorderedButton';
import ChipsSelection from '@/components/ChipsSelection';
import { useRef } from 'react';
import GroceryItem from '@/components/GroceryItem';

export default function HomeScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  const data = useRef(require('../../assets/products.json'))

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{backgroundColor: primaryColor, height: '100%'}}>
        <View style={{backgroundColor: secondBackgroundColor, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 10}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between', alignItems: 'center'}}>
            <HeaderText text='Daily Grocery' />
            <IconBorderedButton size={35} name='search-outline' isLightButton={useColorScheme() !== 'light'} onPress={() => {

            }} />
          </View>
          <ChipsSelection defaultSelection={0} style={{width: '100%', minHeight: 60}} elementTitles={['Fruit', 'Vegan', 'Vegetable', 'Bakery', 'Diary', 'Meat']} isLightElement={false} onItemSelected={(selectedIndex) => {

          }}/>
          <FlatList style={{marginVertical: 10}} data={data.current} numColumns={2} ItemSeparatorComponent={(_) => {
            return <View style={{ width: 10, height: 10 }}/>
          }} renderItem={({item}) => {
            return <GroceryItem item={item}/>
          }} />
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
