import {atom} from 'recoil';

interface UserTypes {
  email?: string | null;
  familyName?: string | null;
  givenName?: string | null;
  id?: string | null;
  name?: string | null;
  photo?: string | null;
}

export const userState = atom<UserTypes | null>({
  key: 'userState',
  default: {},
});
