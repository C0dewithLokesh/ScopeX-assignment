import React from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import AddTodo from '../components/home/AddTodo';
import TodoList from '../components/home/TodoList';
import ThemeToggle from '../components/shared/buttons/ThemeToggle';
import PrimaryLayout from '../components/shared/layout/PrimaryLayout';

const HomeScreen = () => {
  return (
    <PrimaryLayout containerClasses="pt-5 gap-2">
      <View className="flex flex-row items-center justify-between w-full">
        <Text className="text-black font-firaCode_semiBold text-[30px] font-semibold dark:text-white">
          Todo
        </Text>
        <ThemeToggle />
      </View>

      <View className="flex items-center w-full" style={tw`gap-6`}>
        <AddTodo />
        <TodoList />
      </View>
    </PrimaryLayout>
  );
};

export default HomeScreen;
