import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import Toast from "react-native-simple-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import tw from "twrnc";
import IconBtn from "../components/shared/buttons/IconBtn";
import CustomInput from "../components/shared/input/CustomInput";
import PrimaryLayout from "../components/shared/layout/PrimaryLayout";
import { loadingState } from "../store/globalState";
import { userState } from "../store/userState";

GoogleSignin.configure({
  scopes: ["openid", "email", "profile"],
  webClientId:
    "680486975426-223gd4pr4md7opmpaet0pnui4lh9s09i.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const setUser = useSetRecoilState(userState);
  const [confirm, setConfirm] = useState<any>(null);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useRecoilState(loadingState);

  // function onAuthStateChanged(user: any) {
  //   if (user) {
  //     // console.log(JSON.stringify(user, null, 2));
  //     // if (user?.phoneNumber) {
  //     //   setUser(user);
  //     // }
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  async function signInWithPhoneNumber() {
    if (loading) {
      return;
    }
    if (mobile === "") {
      Alert.alert("Invalid Mobile", "Mobile Number is required");
      return;
    }
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(`+91 ${mobile}`);
      setConfirm(confirmation);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function confirmCode() {
    if (loading) {
      return;
    }
    if (otp === "") {
      Alert.alert("Invalid OTP", "OTP is required");
      return;
    }
    try {
      setLoading(true);
      const response = await confirm.confirm(otp);
      setMobile("");
      setOtp("");
      setConfirm(null);
      setUser(response?.user);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        })
      );
    } catch (error: any) {
      console.log("Invalid code.");
      setLoading(false);
      Alert.alert("Error", error?.message);
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    if (loading) {
      return;
    }
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      auth().signInWithCredential(googleCredential);
      setUser(user);
      Toast.show("Sign-In Successful", Toast.SHORT);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        })
      );
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Google sign in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google sign in is already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Error", "Play services are not available");
      } else {
        Alert.alert("Error", "Unknown error occurred");
      }
    }
  };

  return (
    <PrimaryLayout containerClasses="gap-20">
      <View className="flex flex-col items-center w-full">
        <Text
          className={
            "text-[#141414] dark:text-white text-xl font-firaCode_semiBold font-semibold leading-normal capitalize"
          }
        >
          welcome
        </Text>
        <Text
          className={
            "text-[#787878] dark:text-white w-full font-firaCode_regular text-center text-lg font-normal leading-normal"
          }
        >
          Sign In with <Text className="text-[#F16023]">Scopex Todo</Text>
        </Text>
      </View>

      <View className="flex items-center w-[80%]" style={tw`gap-3`}>
        <View className="flex items-center w-full" style={tw`gap-3`}>
          <CustomInput
            placeholder="Enter Mobile Number"
            value={mobile}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={setMobile}
          />
          {confirm && (
            <CustomInput
              value={otp}
              placeholder="Enter OTP"
              keyboardType="numeric"
              maxLength={6}
              onChangeText={setOtp}
            />
          )}
          <IconBtn
            title={confirm ? "Verify OTP" : "Sign In"}
            onClick={() => {
              if (confirm) {
                confirmCode();
                return;
              }
              signInWithPhoneNumber();
            }}
          />
        </View>

        <Text className=" text-gray-400">OR</Text>

        <IconBtn
          icon={require("../../assets/images/google.png")}
          title="Sign in with Google"
          btnClassName={"bg-transparent border border-gray-300"}
          textClassName="text-[#1F1E1E] dark:text-white"
          onClick={handleGoogleSignIn}
        />
      </View>
    </PrimaryLayout>
  );
};

export default LoginScreen;
