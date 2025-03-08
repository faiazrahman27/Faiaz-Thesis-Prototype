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
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import { ibanRegex } from "../utils";
import { useAppcontext } from "../appcontext/useappcontext";
import Entypo from "@expo/vector-icons/Entypo";

function WithDraw({ navigation }) {
  const [amount, setamount] = useState("");
  const [iban, setiban] = useState("");
  const [name, setname] = useState("");
  const [visible, setVisible] = useState(false);
  const [isloading, setisloading] = useState(false);

  const { route, user, token } = useAppcontext();

  const handlesubmit = async () => {
    try {
      if (!amount || !name) {
        setVisible("Please fill all fields");
        return;
      } else if (!ibanRegex.test(iban)) {
        setVisible("Please provide a valid IBAN");
        return;
      }

      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("bank", user?.bank?.id);

      const response = await fetch(`${route}/api/withdrawals/`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: formData,
      });
      const json = await response.json();

      if (!response.ok) {
        setisloading(false);
        setVisible(json);
      }
      if (response.ok) {
        setisloading(false);
        setamount("");
        setiban("");
        setname("");
        setVisible("Amount sent Successfuly");
      }
    } catch (e) {
      setVisible(e);
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
      <Text style={styles.text}>Withdraw Money</Text>
      <Text style={styles.text_login}>
        Please fill up the form for the withdraw
      </Text>
      <View>
        <Text style={styles.label}>IBAN Number</Text>
        <TextInput
          placeholder="e.g. GB33BUKB20201555555555"
          mode="outlined"
          value={iban}
          onChangeText={(text) => setiban(text)}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
        />
      </View>
      <View>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your Full name here .."
          mode="outlined"
          value={name}
          onChangeText={(text) => setname(text)}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
        />
      </View>

      <View>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="Enter your Amount here (USD) .."
          mode="outlined"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setamount(text)}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#72777A"
          cursorColor="#72777A"
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
        Send
      </Button>

      <TouchableOpacity
        style={styles.homeiconview}
        onPress={() => navigation.navigate("home")}
      >
        <Entypo style={styles.homeicon} name="home" size={45} color="#0e683d" />
      </TouchableOpacity>
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

export default WithDraw;

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
    marginBottom: 10,
  },
  text_login: {
    fontSize: 14,
    fontWeight: "400",
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
