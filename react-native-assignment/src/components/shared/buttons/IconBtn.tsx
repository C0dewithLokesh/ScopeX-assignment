import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import tw from 'twrnc';

const IconBtn = ({
  btnClassName,
  textClassName,
  title,
  icon,
  onClick,
}: {
  btnClassName?: string;
  textClassName?: string;
  title: string;
  icon?: any;
  onClick?: () => void;
}) => {
  return (
    <Pressable
      className={`flex flex-row items-center justify-center bg-[#F16023] rounded-[14px] w-full py-2 ${btnClassName}`}
      style={tw`gap-4`}
      onPress={onClick}>
      {icon && <Image source={icon} className={'w-5 h-5'} />}
      <Text
        className={`text-white text-center text-xl leading-[21] font-firaCode_medium font-medium capitalize ${textClassName}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default IconBtn;
