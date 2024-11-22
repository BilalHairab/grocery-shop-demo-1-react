import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { SafeAreaView, Image, View } from 'react-native';
import HeaderText from '@/components/HeaderText';
import { router } from 'expo-router';
import useCurrentOrder from '@/hooks/useCurrentOrder';
import { OrderState } from '@/reducers/order/orderReducer.types';
import RoundedButton from '@/components/RoundedButton';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

export default function CheckoutScreen() {
  const secondBackgroundColor = useThemeColor({}, 'background');
  const order = useCurrentOrder();
  const [done, setIsDone] = useState(false);
  const motorcycleImage = require('@/assets/images/motorcycle.png')
  const shopImage = require('@/assets/images/shop.png')
  const [index, setIndex] = useState(0);
  let orderCordinates = [
  { "latitude": 37.7973874, "longitude": -122.4222965 },
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
    if (order.activeOrder?.state === OrderState.DELIVERED) {
      setIsDone(true)
    }
  }, [order.activeOrder?.state]);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      if (index >= orderCordinates.length - 1) {
        order.notifyDelivered()
      } else {
        setIndex((prev) => prev + 1);
      }
    }, 2500);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [index]);

  return (
    <SafeAreaView style={{ backgroundColor: secondBackgroundColor, height: '100%' }}>
      <View style={{ height: '100%', marginHorizontal: 10, flex: 1, flexDirection: 'column', }}>

        <View style={{ flexDirection: 'row', paddingHorizontal: 5, columnGap: 10, alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
          <HeaderText text='Order Tracking' />
        </View>

        <MapView
          toolbarEnabled={true}
          ref={ref => {
            ref?.fitToSuppliedMarkers(['you', 'order'], { animated: true });
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
            apikey={GOOGLE_API_KEY}
            strokeWidth={4}
            strokeColor="blue"
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
            <Image source={motorcycleImage} style={{ width: 40, height: 40 }} />
          </Marker>
          <Marker
            key={2}
            identifier='Shop'
            coordinate={orderCordinates[0]}
            title={"Shop"}
          >
            <Image source={shopImage} style={{ width: 40, height: 40 }} />
          </Marker>
        </MapView>
        <View style={{ alignSelf: 'flex-end', width: '100%' }}>
          {done ? <RoundedButton style={{ marginTop: 40 }} title={'Finish'} isLightButton={true} onPress={() => {
            router.replace('done');
          }} /> : <RoundedButton style={{ marginTop: 40 }} title={'Ok, I\'ll be waiting'} isLightButton={true} onPress={() => {
            order.notifyFinished()
            router.replace('../(tabs)');
          }} />}
        </View>
      </View>
    </SafeAreaView>
  );
}
