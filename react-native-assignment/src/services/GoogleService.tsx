import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['openid', 'email', 'profile'],
  webClientId:
    '47684985729-p35ggalcseji24s1nlsd221bttcjrtvh.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});

export const checkUserLoggedIn = () => {
  try {
    const userInfo = GoogleSignin.getCurrentUser();
    return userInfo?.user;
  } catch (error) {
    console.log('Error checking user login status: ', error);
  }
};
