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
import Entypo from "@expo/vector-icons/Entypo";

function Support({ navigation }) {
  //   const { route, dispatch } = useAppcontext();

  return (
    <ScrollView contentContainerStyle={styles.mainview} style={{ flex: 1 }}>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/bijoypay.png")}
          />
        </View>
        <Text style={styles.text}>Customer Support</Text>
      </View>
      <View>
        <Text style={styles.text_login}>
          Please call us at +88015247247 toll free for support.
        </Text>
        <Text style={styles.text_login}>We have 24/7 customer care.</Text>
        <Text style={styles.text_login}>Thank You for Your Patience</Text>
      </View>
      <TouchableOpacity
        style={styles.homeiconview}
        onPress={() => navigation.navigate("home")}
      >
        <Entypo style={styles.homeicon} name="home" size={45} color="#0e683d" />
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Support;

const styles = StyleSheet.create({
  mainview: {
    padding: 20,
    backgroundColor: "#0e683d",
    justifyContent: "space-between",
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
    marginBottom: 10,
  },
  text_login: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
  },

  homeiconview: {
    marginTop: 20,

    alignItems: "center",
  },
  homeicon: {
    width: 65,
    textAlign: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 1000,
  },
});
