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
        tabBarInactiveTintColor: tabIconInactive,
        tabBarStyle: {
          backgroundColor: background,
          borderTopWidth: 0,
          height: 95,
          paddingVertical: 10
        }
      }}>
      <Tabs.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        component={OrderScreen}
        options={{
          title: 'Order',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
