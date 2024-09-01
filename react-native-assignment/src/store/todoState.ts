import {atom} from 'recoil';
import {TodoItem} from '../../helper';

export const todoState = atom<TodoItem[]>({
  key: 'todoState',
  default: [],
});

export const editModalState = atom<boolean>({
  key: 'editModalState',
  default: false,
});
