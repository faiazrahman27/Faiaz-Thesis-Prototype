import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function Exchange({ navigation }) {
  const [amount, setamount] = useState("");
  const [BDT_rate, setBDT_rate] = useState("");
  const [balance, setbalance] = useState("");
  const [usdTobdt, setusdTobdt] = useState(true);

  const getcurrrency = async () => {
    try {
      const response = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?base=USD&apikey=11f088ab029e4b379ea1cfa98f95ea12`,
        {}
      );
      const json = await response.json();

      if (response.ok) {
        setBDT_rate(json.rates["BDT"]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getcurrrency();
  }, []);

  useEffect(() => {
    if (balance) {
      if (usdTobdt) {
        setamount(JSON.stringify(balance * BDT_rate));
      } else {
        setamount(JSON.stringify(balance / BDT_rate));
      }
    } else {
      setamount("");
    }
  }, [balance]);

  return (
    <ScrollView contentContainerStyle={styles.mainview} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/bijoypay.png")}
        />
      </View>
      <Text style={styles.text}>Exchange Money</Text>
      <Text style={styles.text_login}>
        Please fill up the details for a smooth experience exchanging money with
        Government approved rates!
      </Text>

      <View style={styles.flexview}>
        <View style={styles.flexitem}>
          <Text style={styles.label}>Convert</Text>
          <TextInput
            mode="outlined"
            value={usdTobdt ? "USD" : "BDT"}
            readOnly
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            outlineColor="#49454F42"
            activeOutlineColor="#49454F42"
            cursorColor="#72777A"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setamount("");
            setbalance("");
            setusdTobdt(!usdTobdt);
          }}
        >
          <MaterialIcons name="currency-exchange" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.flexitem}>
          <Text style={styles.label}>To</Text>
          <TextInput
            mode="outlined"
            value={usdTobdt ? "BDT" : "USD"}
            readOnly
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            outlineColor="#49454F42"
            activeOutlineColor="#49454F42"
            cursorColor="#72777A"
          />
        </View>
      </View>
      <View>
        <Text style={styles.label}>{usdTobdt ? "USD " : "BDT"}</Text>
        <TextInput
          placeholder="Enter amount here.."
          mode="outlined"
          keyboardType="numeric"
          value={balance}
          onChangeText={(text) => setbalance(text)}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
        />
      </View>
      <View>
        <Text style={styles.label}>{usdTobdt ? "BDT " : "USD"}</Text>
        <TextInput
          mode="outlined"
          value={amount}
          readOnly
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
        />
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

export default Exchange;

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
  flexview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexitem: {
    width: "35%",
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
    color: "#000",
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
