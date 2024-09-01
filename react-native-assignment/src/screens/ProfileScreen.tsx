import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Image, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import {useRecoilState} from 'recoil';
import tw from 'twrnc';
import {userState} from '../store/userState';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {colorScheme} = useColorScheme();
  const [user, setUser] = useRecoilState(userState);

  const handleSignOut = async () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
      Toast.show('Logout done', Toast.SHORT);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View className="w-full h-full p-5 pt-2 dark:bg-[#2C2C2C]">
      <View className="flex items-center w-full pt-5" style={tw`gap-6`}>
        <View className="w-full flex items-end">
          <Feather
            name="log-out"
            size={25}
            color={colorScheme === 'light' ? 'black' : 'white'}
            onPress={() => handleSignOut()}
          />
        </View>
        <View className="flex flex-row items-center w-full" style={tw`gap-6`}>
          <View className="w-20 h-20 rounded-full overflow-hidden">
            {user?.photo && (
              <Image source={{uri: user?.photo}} className="w-full h-full" />
            )}
          </View>
          <View className="flex items-start" style={tw`gap-1`}>
            <Text className="text-black font-firaCode_regular dark:text-white text-xl">
              {user?.name}
            </Text>
            <Text className="text-gray-500 font-firaCode_regular dark:text-gray-200">
              {user?.email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
