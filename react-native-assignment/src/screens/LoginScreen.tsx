import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useSetRecoilState} from 'recoil';
import tw from 'twrnc';
import IconBtn from '../components/shared/buttons/IconBtn';
import CustomInput from '../components/shared/input/CustomInput';
import {userState} from '../store/userState';

GoogleSignin.configure({
  scopes: ['openid', 'email', 'profile'],
  webClientId:
    '47684985729-p35ggalcseji24s1nlsd221bttcjrtvh.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const setUser = useSetRecoilState(userState);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const {idToken, user} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      auth().signInWithCredential(googleCredential);
      setUser(user);
      Toast.show('Sign-In Successful', Toast.SHORT);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        }),
      );
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
            'text-[#141414] dark:text-white text-xl font-firaCode_semiBold font-semibold leading-normal capitalize'
          }>
          welcome
        </Text>
        <Text
          className={
            'text-[#787878] dark:text-white w-full font-firaCode_regular text-center text-lg font-normal leading-normal'
          }>
          Sign In with <Text className="text-[#F16023]">Scopex Todo</Text>
        </Text>
      </View>

      <View className="flex items-center w-[80%]" style={tw`gap-3`}>
        <View className="flex items-center w-full" style={tw`gap-3`}>
          <CustomInput
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
          />
          <IconBtn title="Sign In" onClick={handleGoogleSignIn} />
        </View>

        <Text className=" text-gray-400">OR</Text>

        <IconBtn
          icon={require('../../assets/images/google.png')}
          title="Sign in with Google"
          btnClassName={'bg-transparent border border-gray-300'}
          textClassName="text-[#1F1E1E] dark:text-white"
          onClick={handleGoogleSignIn}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
