import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import AppNavigation from './src/navigation/AppNavigation';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView>
      <RecoilRoot>
        <SafeAreaView className="flex-1">
          <AppNavigation />
        </SafeAreaView>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

export default App;
