import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { SafeAreaView, Image, useColorScheme, View } from 'react-native';
import IconBorderedButton from '@/components/IconBorderedButton';
import HeaderText from '@/components/HeaderText';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const interval = useRef<NodeJS.Timeout | undefined>(undefined);
  const secondBackgroundColor = useThemeColor({}, 'background');
  const image = require('@/assets/images/motorcycle.png')
  const [index, setIndex] = useState(0);
  let orderCordinates = [{ latitude: 37.79825, longitude: -122.4224, },
  { "latitude": 37.79738, "longitude": -122.42208 },
  { "latitude": 37.79691, "longitude": -122.42199 },
  { "latitude": 37.79684, "longitude": -122.42253 },
  { "latitude": 37.79669, "longitude": -122.4237 },
  { "latitude": 37.79648, "longitude": -122.42542 },
  { "latitude": 37.79607, "longitude": -122.42856 },
  { "latitude": 37.79592, "longitude": -122.42974 },
  { "latitude": 37.79586, "longitude": -122.43021 },
  { "latitude": 37.79582, "longitude": -122.4302 },
  { "latitude": 37.79562, "longitude": -122.43016 },
  { "latitude": 37.7949, "longitude": -122.43001 },
  { "latitude": 37.79446, "longitude": -122.42992 },
  { "latitude": 37.79364, "longitude": -122.42976 },
  { "latitude": 37.79125, "longitude": -122.42928 },
  { "latitude": 37.78948, "longitude": -122.42892 },
  { "latitude": 37.78894, "longitude": -122.42881 },
  { "latitude": 37.78876, "longitude": -122.42877 },
  { "latitude": 37.78859, "longitude": -122.42874 },
  { "latitude": 37.78856, "longitude": -122.42898 },
  { "latitude": 37.78848, "longitude": -122.42965 },
  { "latitude": 37.78835, "longitude": -122.43068 },
  { "latitude": 37.78830, "longitude": -122.4323, }
  ];
  const destinationCordinates = { latitude: 37.78825, longitude: -122.4324, };

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      if(index >= orderCordinates.length - 1) {

      } else {
        setIndex((prev) => prev + 1);
      }
    }, 2500);

    //Clearing the interval
    return () => clearInterval(interval);
}, [index]);

  return (
    <SafeAreaView style={{ height: '100%', flexDirection: 'column', backgroundColor: secondBackgroundColor }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, columnGap: 10, alignItems: 'center', marginBottom: 10 }}>
            <IconBorderedButton size={35} name='arrow-back' isLightButton={useColorScheme() !== 'light'} onPress={() => {
              router.back();
            }} />

            <HeaderText text='Order Tracking' />
          </View>

      {<MapView
        toolbarEnabled={true}
        ref={ref => {
          ref?.fitToSuppliedMarkers(['you', 'order'], {animated: true});
        }}
        style={{ height: '60%' }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,

        }}
      >
        <MapViewDirections
          origin={orderCordinates[0]}
          destination={destinationCordinates}
          apikey={"AIzaSyCisiNCSjU18_FQ1poeryAyc2axS2YDa6E"} // insert your API Key here
          strokeWidth={4}
          strokeColor="hotpink"
        />
        <Marker
          key={0}
          identifier='you'
          coordinate={destinationCordinates}
          title={"YOU"}
          description={"Your delivery address"}
        />
        <Marker
          key={1}
          identifier='order'
          coordinate={orderCordinates[index]}
          title={"Your Order"}
        >
          <Image source={image} style={{ width: 40, height: 40 }} />
        </Marker>
      </MapView>}
    </SafeAreaView>
  );
}