import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import LoginScreen from '../screens/LoginScreen';
import HomeTabNavigator from './tab/HomeTabNavigator';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['openid', 'email', 'profile'],
      webClientId:
        '47684985729-p35ggalcseji24s1nlsd221bttcjrtvh.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
      profileImageSize: 120,
    });

    const checkUserLoggedIn = async () => {
      try {
        const userInfo = GoogleSignin.getCurrentUser();
        setInitialRoute(userInfo ? 'HomeScreen' : 'Login');
      } catch (error) {
        console.log('Error checking user login status: ', error);
        setInitialRoute('Login');
      }
    };

    checkUserLoggedIn();
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
