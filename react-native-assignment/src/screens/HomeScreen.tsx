import React from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import AddTodo from '../components/home/AddTodo';
import TodoList from '../components/home/TodoList';
import ThemeToggle from '../components/shared/buttons/ThemeToggle';

const HomeScreen = () => {
  return (
    <View
      className="w-full h-full p-5 pt-2 dark:bg-[#2C2C2C]"
      style={tw`gap-2`}>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-black font-firaCode_semiBold text-[30px] font-semibold dark:text-white">
          Todo
        </Text>
        <ThemeToggle />
      </View>

      <View className="flex items-center w-full" style={tw`gap-6`}>
        <AddTodo />
        <TodoList />
      </View>
    </View>
  );
};

export default HomeScreen;
