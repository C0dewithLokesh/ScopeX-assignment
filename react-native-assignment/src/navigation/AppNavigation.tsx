import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useColorScheme} from 'nativewind';
import React, {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import LoginScreen from '../screens/LoginScreen';
import {checkUserLoggedIn} from '../services/GoogleService';
import {userState} from '../store/userState';
import HomeTabNavigator from './tab/HomeTabNavigator';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const setUser = useSetRecoilState(userState);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const {setColorScheme} = useColorScheme();

  useEffect(() => {
    const loadColorScheme = async () => {
      try {
        const savedScheme: any = await AsyncStorage.getItem('colorScheme');
        if (savedScheme) {
          setColorScheme(savedScheme);
        }
      } catch (error) {
        console.error('Failed to load color scheme:', error);
      }
    };

    const userInfo = checkUserLoggedIn();

    if (userInfo) {
      loadColorScheme();
      setUser(userInfo);
      setInitialRoute(userInfo ? 'HomeScreen' : 'Login');
    } else {
      setInitialRoute('Login');
    }
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
