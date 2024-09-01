import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useSetRecoilState} from 'recoil';
import {addTodoItem} from '../../../helper';
import {todoState} from '../../store/todoState';
import IconBtn from '../shared/buttons/IconBtn';

const AddTodo = () => {
  const [todoInput, setTodoInput] = useState('');
  const setTodo = useSetRecoilState(todoState);
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!todoInput.trim()) {
      Toast.show('Please enter a todo', Toast.SHORT);
      setLoading(false);
      return;
    }

    try {
      const response = await addTodoItem(todoInput.trim());
      setTodoInput('');
      setTodo(response);
      Toast.show('Todo Added', Toast.SHORT);
    } catch (error) {
      Toast.show('Failed to add todo', Toast.SHORT);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex flex-row border border-[#848484] items-center w-full rounded-[20px]">
      <TextInput
        placeholder="Enter a todo..."
        value={todoInput}
        className="pl-4 flex-1 font-firaCode_regular text-black dark:text-white"
        placeholderTextColor={'#848484'}
        multiline
        editable={!loading}
        onChangeText={setTodoInput}
      />
      <IconBtn
        title="Add Todo"
        btnClassName="w-[30%] py-[14px]"
        textClassName="text-base"
        onClick={handleAddTodo}
      />
    </View>
  );
};

export default AddTodo;
