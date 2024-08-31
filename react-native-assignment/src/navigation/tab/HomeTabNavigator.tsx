import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name={'home'} size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather icon={"user"} size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
export default HomeTabNavigator;
