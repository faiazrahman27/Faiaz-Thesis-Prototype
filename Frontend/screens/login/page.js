import React, { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Button,
  TextInput,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { emailRegex } from "../utils";
import { useAppcontext } from "../appcontext/useappcontext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

function Login({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isloading, setisloading] = useState(false);

  const { route, dispatch } = useAppcontext();

  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };
  const handlesubmit = async () => {
    try {
      if (!password || !email) {
        setVisible("Please fill required fields!");
        return;
      }
      if (!emailRegex.test(email)) {
        setVisible("Enter a valid email pattern");
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const idToken = await user.getIdToken();
          storeData("token", idToken);
          const formData = new FormData();
          formData.append("idToken", idToken);
          const response = await fetch(`${route}/api/login/`, {
            method: "POST",
            body: formData,
          });
          const json = await response.json();

          if (!response.ok) {
            setisloading(false);
            setVisible(json.error);
          }

          if (response.ok) {
            setisloading(false);
            setVisible(json.messge);

            storeData("userid", JSON.stringify(json.id));
            dispatch({
              type: "Set_data",
              payload: { userid: json.id, token: idToken },
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          setVisible(error.message);
        });
    } catch (error) {
      setVisible(error);

      setisloading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainview} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/bijoypay.png")}
        />
      </View>
      <Text style={styles.text}>Login</Text>
      <Text style={styles.text_login}>Login to Continue</Text>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your Email here .."
          mode="outlined"
          testID="LoginEmailAddress"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setemail(text)}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your Password here .."
          mode="outlined"
          value={password}
          onChangeText={(text) => setpassword(text)}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#72777A"
          cursorColor="#72777A"
          secureTextEntry={showpassword ? false : true}
          right={
            <TextInput.Icon
              icon={showpassword ? "eye-off" : "eye"}
              color={"#72777A"}
              onPress={() => setshowpassword(!showpassword)}
            />
          }
        />
      </View>

      <View>
        {isloading && (
          <ActivityIndicator
            animating={isloading}
            color="#1679FF"
            size="small"
            style={{ margin: 10 }}
          />
        )}
      </View>
      <Button
        buttonColor="#ed1e24"
        textColor="white"
        mode="contained"
        disabled={isloading}
        onPress={handlesubmit}
        style={{ ...styles.button, marginBottom: 9 }}
      >
        Login
      </Button>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={() => setVisible(null)}
        action={{
          label: "Undo",
          onPress: () => setVisible(null),
        }}
      >
        {visible}
      </Snackbar>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  mainview: {
    padding: 20,
    backgroundColor: "#0e683d",
    justifyContent: "center",
    flex: 1,
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    alignSelf: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  text_login: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#a5c6b6",
    marginBottom: 18,
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",

    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 14,
  },
});
