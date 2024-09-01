import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import tw from 'twrnc';
import {loadingState} from '../../../store/globalState';

const PrimaryLayout = ({
  children,
  containerClasses,
}: {
  children: React.ReactNode;
  containerClasses?: string;
}) => {
  const loading = useRecoilValue(loadingState);
  return (
    <View
      className="w-full h-full p-5 dark:bg-[#2C2C2C] flex items-center justify-center"
      style={tw`${containerClasses || ''}`}>
      {children}

      <Modal visible={loading} transparent>
        <View className="w-full h-full flex items-center justify-center bg-[#00000066]">
          <ActivityIndicator size="large" color={'#F16023'} />
        </View>
      </Modal>
    </View>
  );
};

export default PrimaryLayout;
