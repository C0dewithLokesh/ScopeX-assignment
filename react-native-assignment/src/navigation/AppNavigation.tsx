import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Test" component={} /> */}

        <Stack.Screen name="HomeScreen" component={HomeTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

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
