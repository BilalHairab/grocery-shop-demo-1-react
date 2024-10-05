import React from 'react';

import { Icon } from '@/components/navigation/Icon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.';
import OrderScreen from './order';
import CartScreen from './cart';
import { useThemeColor } from '@/hooks/useThemeColor';
import ProfileScreen from './profile';

export default function TabLayout() {
  const background = useThemeColor({}, 'primary');
  const tabIconActive = useThemeColor({}, 'tabIconSelected');
  const tabIconInactive = useThemeColor({}, 'tabIconDefault');

  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: tabIconActive,
        headerShown: false,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: background,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.2,
          shadowRadius: 5,
          height: 95,
          paddingTop: 10
        }
      }}>
      <Tabs.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} color={color} size={focused ? 30 : 20}/>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'cart' : 'cart-outline'} color={color} size={focused ? 30 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        component={OrderScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'list' : 'list-outline'} color={color} size={focused ? 30 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} color={color} size={focused ? 30 : 20} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
