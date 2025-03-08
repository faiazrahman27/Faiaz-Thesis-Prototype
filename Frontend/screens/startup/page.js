import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";

function StartPage({ navigation }) {
  return (
    <View style={styles.mainview}>
      <Text style={styles.text}>Welcome!</Text>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/bijoypay.png")}
        />
      </View>
      <Text style={{ ...styles.text, marginBottom: 70 }}>BIJOY PAY</Text>
      <Button
        buttonColor="#ed1e24"
        textColor="white"
        mode="contained"
        onPress={() => navigation.navigate("login")}
        style={{ ...styles.button, marginBottom: 9 }}
      >
        Log In
      </Button>
      <Button
        buttonColor="#ed1e24"
        textColor="white"
        mode="contained"
        onPress={() => navigation.navigate("signup")}
        style={{ ...styles.button, marginBottom: 9 }}
      >
        Sign Up
      </Button>
    </View>
  );
}

export default StartPage;

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "#0e683d",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 40,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 70,
  },

  button: {
    width: 250,
    borderRadius: 14,
    fontWeight: "600",
  },
});
