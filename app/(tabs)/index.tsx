import { SafeAreaView, View, useColorScheme, FlatList } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import HeaderText from '@/components/HeaderText';
import IconBorderedButton from '@/components/IconBorderedButton';
import ChipsSelection from '@/components/ChipsSelection';
import { useRef, useState } from 'react';
import GroceryItem from '@/components/GroceryItem';

export default function HomeScreen() {
  const primaryColor = useThemeColor({}, 'primary');
  const secondBackgroundColor = useThemeColor({}, 'background');
  const categories = useRef(['All', 'Fruit', 'Vegan', 'Vegetable', 'Dairy', 'Bakery', 'Meat'])
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const data = useRef(require('../../assets/products.json'))

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: secondBackgroundColor, flexDirection: 'column' }}>
      <View style={{ backgroundColor: primaryColor, height: '100%' }}>
        <View style={{ backgroundColor: secondBackgroundColor, height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 10 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between', alignItems: 'center' }}>
            <HeaderText text='Daily Grocery' />
            <IconBorderedButton size={35} name='search-outline' isLightButton={useColorScheme() !== 'light'} onPress={() => {

            }} />
          </View>
          <ChipsSelection defaultSelection={selectedCategoryIndex} style={{ width: '100%', minHeight: 60 }} elementTitles={categories.current} isLightElement={false} onItemSelected={(selectedIndex) => {
            setSelectedCategoryIndex(selectedIndex)
          }} />
          <FlatList keyExtractor={(item) => item.id} style={{ marginVertical: 10, height: '100%' }} data={data.current.filter((product) => categories.current[selectedCategoryIndex].toLowerCase() === 'all' ? true : product.type.toLowerCase() === categories.current[selectedCategoryIndex].toLowerCase())} numColumns={2} ItemSeparatorComponent={(_) => {
            return <View style={{ width: 10, height: 10 }} />
          }} renderItem={({ item, index }) => {
            return <GroceryItem item={item} index={index} onItemPress={() => {

            }} />
          }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
