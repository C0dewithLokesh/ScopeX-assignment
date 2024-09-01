import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['openid', 'email', 'profile'],
  webClientId:
    '680486975426-223gd4pr4md7opmpaet0pnui4lh9s09i.apps.googleusercontent.com',
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
