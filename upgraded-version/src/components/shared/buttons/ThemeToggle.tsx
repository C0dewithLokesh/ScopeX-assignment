import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'nativewind';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ThemeToggle = () => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const [localScheme, setLocalScheme] = useState(colorScheme);

  const toggleColorScheme = async () => {
    const newScheme = localScheme === 'light' ? 'dark' : 'light';
    try {
      await AsyncStorage.setItem('colorScheme', newScheme);
      setLocalScheme(newScheme);
      setColorScheme(newScheme);
    } catch (error) {
      console.error('Failed to save color scheme:', error);
    }
  };

  return (
    <Pressable className="p-3" onPress={toggleColorScheme}>
      <Feather
        name={colorScheme === 'light' ? 'moon' : 'sun'}
        size={30}
        color={colorScheme === 'light' ? 'black' : 'white'}
      />
    </Pressable>
  );
};

export default ThemeToggle;
