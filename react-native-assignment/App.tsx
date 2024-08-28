import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{}}>
      <View className="w-full h-full">
        <Text className="text-black text-xl">Todo</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
