import React, {useState} from 'react';
import {Modal, TextInput, View} from 'react-native';
import {useRecoilState} from 'recoil';
import tw from 'twrnc';
import {TodoItem} from '../../../../helper';
import {editModalState} from '../../../store/todoState';
import IconBtn from '../buttons/IconBtn';

const EditTodoModal = ({
  currentTodoItem,
  onUpdate,
  setCurrentTodoItem,
}: {
  currentTodoItem: string;
  onUpdate: (item: string) => void;
  setCurrentTodoItem: (item: TodoItem | null) => void;
}) => {
  const [showEditModal, setShowEditModal] = useRecoilState(editModalState);
  const [updatedTodoItem, setUpdatedTodoItem] = useState(currentTodoItem);

  return (
    <Modal
      visible={showEditModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowEditModal(!showEditModal)}>
      <View className="flex items-center justify-center w-full h-full">
        <View
          className="flex items-center justify-center bg-white w-[80%] p-5 rounded-3xl"
          style={tw`gap-4`}>
          <View className="flex flex-row border border-[#848484] items-center w-full rounded-[20px]">
            <TextInput
              placeholder="Enter a todo..."
              value={updatedTodoItem}
              className=" pl-4 flex-1 text-black dark:text-white text-base leading-[16]"
              placeholderTextColor={'#848484'}
              multiline
              onChangeText={setUpdatedTodoItem}
            />
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <IconBtn
              title="Cancel"
              btnClassName="w-[48%]"
              textClassName="text-base"
              onClick={() => {
                setShowEditModal(false);
                setCurrentTodoItem(null);
              }}
            />
            <IconBtn
              title="Update"
              btnClassName="w-[48%]"
              textClassName="text-base"
              onClick={() => {
                onUpdate(updatedTodoItem);
                setShowEditModal(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTodoModal;
