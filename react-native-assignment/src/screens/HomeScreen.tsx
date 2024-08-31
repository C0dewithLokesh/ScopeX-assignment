import {useColorScheme} from 'nativewind';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <View className="w-full h-full p-5 pt-2 dark:bg-[#373737]">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-black font-firaCode_semiBold text-[30px] font-semibold dark:text-white">
          Todo
        </Text>
        <Pressable className="p-3" onPress={toggleColorScheme}>
          <Feather
            name={colorScheme === 'light' ? 'moon' : 'sun'}
            size={30}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
