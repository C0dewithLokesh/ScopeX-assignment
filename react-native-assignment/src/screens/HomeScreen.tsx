import React from 'react';
import {Text, View} from 'react-native';
import ThemeToggle from '../components/shared/buttons/ThemeToggle';

const HomeScreen = () => {
  return (
    <View className="w-full h-full p-5 pt-2 dark:bg-[#2C2C2C]">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-black font-firaCode_semiBold text-[30px] font-semibold dark:text-white">
          Todo
        </Text>
        <ThemeToggle />
      </View>
    </View>
  );
};

export default HomeScreen;
