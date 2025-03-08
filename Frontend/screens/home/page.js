import React, { useEffect, useState } from "react";

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

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useAppcontext } from "../appcontext/useappcontext";

function Home({ navigation }) {
  const [isloading, setisloading] = useState(false);

  const { user, userid, route, token, dispatch } = useAppcontext();

  const getuser = async () => {
    try {
      const response = await fetch(`${route}/api/users/${userid}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();

      if (!response.ok) {
        setisloading(false);
        setVisible(json.error);
      }

      if (response.ok) {
        setisloading(false);
        dispatch({ type: "Set_user", payload: json });
      }
    } catch (error) {
      setVisible(error);
      setisloading(false);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const handlelogout = () => {
    dispatch({ type: "Signout" });
  };
  const size = 35;
  const buttons_home = [
    {
      name: "Add Money",
      image_url: (
        <AntDesign
          style={styles.home_icon}
          name="pluscircle"
          size={size}
          color="white"
        />
      ),
      url: "addMoney",
    },
    {
      name: "Send Money",
      image_url: (
        <FontAwesome
          style={styles.home_icon}
          name="send-o"
          size={size}
          color="white"
        />
      ),
      url: "sendMoney",
    },
    {
      name: "WithDraw",
      image_url: (
        <Fontisto
          style={styles.home_icon}
          name="shopping-pos-machine"
          size={size}
          color="white"
        />
      ),
      url: "withDraw",
    },
    {
      name: "Details",
      image_url: (
        <FontAwesome
          style={styles.home_icon}
          name="user-circle-o"
          size={size}
          color="white"
        />
      ),
      url: "details",
    },
    {
      name: "History",
      image_url: (
        <Octicons
          style={styles.home_icon}
          name="history"
          size={size}
          color="white"
        />
      ),
      url: "history",
    },
    {
      name: "Support",
      image_url: (
        <MaterialIcons
          style={styles.home_icon}
          name="support-agent"
          size={size}
          color="white"
        />
      ),
      url: "support",
    },
    {
      name: "Exchange",
      image_url: (
        <MaterialIcons
          style={styles.home_icon}
          name="currency-exchange"
          size={size}
          color="white"
        />
      ),
      url: "exchange",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.mainview} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/bijoypay.png")}
        />
      </View>
      <Text style={{ ...styles.text, marginBottom: 8 }}>
        Welcome {user?.first_name}
      </Text>
      <Text style={styles.text}>Home Page </Text>
      <Text style={{ ...styles.text, marginBottom: 5 }}>Balance</Text>
      <Text style={{ ...styles.text, marginBottom: 30 }}>
        ${user?.bank?.balance?.toFixed(2)}
      </Text>
      <View style={styles.home_view}>
        {buttons_home.map((item) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.home_btn}
              onPress={() => navigation.navigate(item.url)}
            >
              {item.image_url}

              <Text style={styles.home_text}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Button
        buttonColor="#ed1e24"
        textColor="white"
        mode="contained"
        disabled={isloading}
        onPress={handlelogout}
        style={{ ...styles.button, marginBottom: 9 }}
      >
        Log Out
      </Button>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  mainview: {
    padding: 20,
    backgroundColor: "#0e683d",
    justifyContent: "center",
    flex: 1,
  },
  home_view: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingStart: "1%",
  },
  home_btn: {
    width: "33%",
    marginBottom: 15,
  },
  home_icon: {
    textAlign: "center",
  },

  home_text: {
    marginTop: 10,
    color: "white",
    fontSize: 16,
    textAlign: "center",
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
