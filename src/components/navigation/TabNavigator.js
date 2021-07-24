import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeStackNavigator,
  CategoriesStackNavigator,
  GameStackNavigator,
  ProfileStackNavigator
} from './StackNavigator';

const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/Ionicons';

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="home-outline" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStackNavigator}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => <Icon name="planet-outline" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Game"
        component={GameStackNavigator}
        options={{
          tabBarLabel: 'Game',
          tabBarIcon: ({ color, size }) => <Icon name="game-controller-outline" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Icon name="person-circle-outline" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};
