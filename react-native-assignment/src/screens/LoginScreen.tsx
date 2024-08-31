import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import tw from 'twrnc';
import IconBtn from '../components/shared/buttons/IconBtn';

GoogleSignin.configure({
  scopes: ['openid', 'email', 'profile'],
  webClientId:
    '47684985729-p35ggalcseji24s1nlsd221bttcjrtvh.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      auth().signInWithCredential(googleCredential);
      // @ts-ignore
      navigation.replace('HomeScreen' as never);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services are not available');
      } else {
        Alert.alert('Error', 'Unknown error occurred');
      }
    }
  };

  return (
    <View
      className="w-full h-full p-5 pt-2 dark:bg-[#373737] flex items-center justify-center"
      style={tw`gap-20`}>
      <View className="flex flex-col items-center w-full">
        <Text
          className={
            'text-[#141414] dark:text-white text-xl font-semibold leading-normal capitalize'
          }>
          welcome
        </Text>
        <Text
          className={
            'text-[#787878] dark:text-white w-full text-center text-lg font-normal leading-normal'
          }>
          Sign In with <Text className="text-[#F16023]">Scopex Todo</Text>
        </Text>
      </View>

      <IconBtn
        icon={require('../../assets/images/google.png')}
        title="Sign in with Google"
        btnClassName={'bg-transparent border border-gray-300 w-[80%]'}
        textClassName="text-[#1F1E1E]"
        onClick={handleGoogleSignIn}
      />
    </View>
  );
};

export default LoginScreen;
