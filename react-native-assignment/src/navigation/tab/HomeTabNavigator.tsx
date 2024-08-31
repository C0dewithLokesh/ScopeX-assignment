import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'nativewind';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const {colorScheme} = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tw`h-[60px] pb-2 items-center ${
          colorScheme === 'dark' ? 'bg-[#373737]' : ''
        }`,
        tabBarIconStyle: tw`mt-2`,
        tabBarActiveTintColor: '#F16023',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name={'home'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name={'user'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeTabNavigator;
