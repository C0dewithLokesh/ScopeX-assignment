import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Image, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import {useRecoilState} from 'recoil';
import tw from 'twrnc';
import PrimaryLayout from '../components/shared/layout/PrimaryLayout';
import {loadingState} from '../store/globalState';
import {userState} from '../store/userState';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {colorScheme} = useColorScheme();
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useRecoilState(loadingState);

  const handleSignOut = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
      Toast.show('Logout done', Toast.SHORT);
    } catch (error) {
      console.error('Error signing out: ', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrimaryLayout containerClasses="pt-2 justify-start">
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
          <View className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            {user?.photo && (
              <Image source={{uri: user?.photo}} className="w-full h-full" />
            )}
          </View>
          <View className="flex items-start" style={tw`gap-1`}>
            <Text className="text-black font-firaCode_regular dark:text-white text-xl">
              {user?.name || 'Guest'}
            </Text>
            <Text className="text-gray-500 font-firaCode_regular dark:text-gray-200">
              {user?.email || user?.phoneNumber || ''}
            </Text>
          </View>
        </View>
      </View>
    </PrimaryLayout>
  );
};

export default ProfileScreen;
