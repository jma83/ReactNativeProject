import React from 'react';
import { createStackNavigator, navigation, route } from '@react-navigation/stack';

import Home from '@screens/home/Home';
import Profile from '@screens/profile/Profile';
import Game from '@screens/game/Game';
import StartGame from '@screens/game/StartGame';
import Categories from '@screens/categories/Categories';
import Welcome from '@screens/welcome/Welcome';
import ContentDetail from '@components/contentDetail/ContentDetail';
import CategoryContent from '@components/categoryContent/CategoryContent';
import EndGame from '@screens/game/EndGame';

const Stack = createStackNavigator();

const WelcomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ContentDetail" component={ContentDetail} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CategoryContent" component={CategoryContent} />
      <Stack.Screen name="ContentDetail" component={ContentDetail} />
    </Stack.Navigator>
  );
};

const GameStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="StartGame" component={StartGame} listeners={{ navigation, route }} />
      <Stack.Screen name="EndGame" component={EndGame} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  CategoriesStackNavigator,
  GameStackNavigator,
  ProfileStackNavigator,
  WelcomeStackNavigator
};
