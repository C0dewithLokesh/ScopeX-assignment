import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';

interface CustomInputProps extends TextInputProps {
  customClasses?: string;
  containerStyle?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  containerStyle,
  customClasses,
  ...props
}) => {
  return (
    <View
      className={`flex flex-row border border-[#848484] items-center w-full rounded-[14px] ${containerStyle}`}>
      <TextInput
        className={`pl-4 flex-1 font-firaCode_regular text-black dark:text-white ${customClasses}`}
        placeholderTextColor={'#848484'}
        {...props}
      />
    </View>
  );
};

export default CustomInput;
