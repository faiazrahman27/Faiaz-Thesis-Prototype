import { createContext, useReducer, useState, useEffect } from "react";
export const Appcontext = createContext();
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
SplashScreen.preventAutoHideAsync();

const Appreducer = (state, action) => {
  switch (action.type) {
    case "Set_data":
      return {
        ...state,
        token: action.payload.token,
        userid: action.payload.userid,
      };
    case "Set_user":
      return {
        ...state,
        user: action.payload,
      };

    case "Signout":
      return {
        user: null,
        userid: null,
        token: null,
        route: state.route,
      };

    default:
      return state;
  }
};

export const AppcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Appreducer, {
    user: null,
    userid: null,
    token: null,
    route: "http://192.168.100.46:8001",
  });

  const retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userid = await AsyncStorage.getItem("userid");

      if (token && userid) {
        dispatch({
          type: "Set_data",
          payload: { token: token, userid: userid },
        });

        SplashScreen.hideAsync();
      } else {
        SplashScreen.hideAsync();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Appcontext.Provider value={{ ...state, dispatch }}>
      {children}
    </Appcontext.Provider>
  );
};
