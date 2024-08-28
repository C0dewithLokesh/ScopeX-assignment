import {useColorScheme} from 'nativewind';
import React from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

function App(): JSX.Element {
  const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <SafeAreaView>
      <View className="w-full h-full p-5 dark:bg-[#373737]">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-black font-semibold text-[30px] dark:text-white">
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
    </SafeAreaView>
  );
}

export default App;
