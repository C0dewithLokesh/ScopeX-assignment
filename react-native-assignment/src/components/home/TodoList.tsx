import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilState, useSetRecoilState} from 'recoil';
import tw from 'twrnc';
import {
  deleteTodoItem,
  getTodoItems,
  TodoItem,
  updateTodoItem,
} from '../../../helper';
import {editModalState, todoState} from '../../store/todoState';
import EditTodoModal from '../shared/modal/EditTodoModal';

const TodoList = () => {
  const isFocused = useIsFocused();
  const [todo, setTodo] = useRecoilState(todoState);
  const [loading, setLoading] = useState(false);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const setShowEditModal = useSetRecoilState(editModalState);
  const [currentTodoItem, setCurrentTodoItem] = useState<TodoItem | null>(null);

  const fetchTodoItems = async (page: number) => {
    if (loading || allItemsLoaded) {
      return;
    }
    setLoading(true);
    try {
      const items = await getTodoItems(page, 10);
      if (items.length === 0) {
        setAllItemsLoaded(true);
      } else {
        setTodo(prevItems => [...prevItems, ...items]);
        setCurrentPage(page);
      }
    } catch (error: any) {
      console.error('Error fetching todo items:', error);
      if (page === 0) {
        fetchTodoItems(0);
      } else {
        Alert.alert('Error', error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    fetchTodoItems(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const deleteAndRefresh = (itemId: string) => {
    deleteTodoItem(itemId)
      .then(() => {
        setTodo(prevItems => prevItems.filter(item => item.id !== itemId));
      })
      .catch(error => {
        console.error('Error deleting todo item:', error);
        Alert.alert('Error', error?.message);
      });
  };

  const handleUpdate = (updatedData: string) => {
    if (currentTodoItem) {
      const updatedItem = {...currentTodoItem, title: updatedData};
      updateAndRefresh(updatedItem);
      setCurrentTodoItem(null);
    }
  };

  const updateAndRefresh = (todoItem: TodoItem) => {
    updateTodoItem(todoItem)
      .then(() => {
        setTodo(prevItems =>
          prevItems.map(item => (item.id === todoItem.id ? todoItem : item)),
        );
        Toast.show('Todo Updated', Toast.SHORT);
      })
      .catch(error => {
        console.error('Error updating todo item:', error);
        Alert.alert('Error', error?.message);
      });
  };

  return (
    <>
      <FlatList
        data={todo}
        renderItem={({item, index}) => (
          <View
            key={index}
            className="w-full flex flex-row items-center justify-between px-5">
            <Text className="text-black dark:text-white text-semibold text-base">
              {item?.title}
            </Text>
            <View className="flex flex-row items-center" style={tw`gap-2`}>
              <Feather
                name="edit-3"
                size={25}
                color={'#F16023'}
                className="text-black dark:text-white"
                onPress={() => {
                  setShowEditModal(true);
                  setCurrentTodoItem(item);
                }}
              />
              <MaterialCommunityIcons
                name="delete"
                size={25}
                color={'red'}
                className="text-black dark:text-white"
                onPress={() => deleteAndRefresh(item.id)}
              />
            </View>
          </View>
        )}
        className="w-full"
        keyExtractor={item => item.id}
        onEndReached={() => fetchTodoItems(currentPage + 1)}
        contentContainerStyle={{gap: 20}}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color={'#F16023'} /> : null
        }
      />

      <EditTodoModal
        currentTodoItem={currentTodoItem?.title || ''}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default TodoList;
