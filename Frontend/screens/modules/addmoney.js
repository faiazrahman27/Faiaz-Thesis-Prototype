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
import { cardRegex, cvvRegex, expirydateRegex } from "../utils";
import { useAppcontext } from "../appcontext/useappcontext";
import Entypo from "@expo/vector-icons/Entypo";

function AddMoney({ navigation }) {
  const [amount, setamount] = useState("");
  const [cardnumber, setcardnumber] = useState("");
  const [date, setdate] = useState("");
  const [cvv, setcvv] = useState("");
  const [visible, setVisible] = useState(false);
  const [isloading, setisloading] = useState(false);

  const { route, user, token } = useAppcontext();

  const handlesubmit = async () => {
    try {
      if (!cardRegex.test(cardnumber)) {
        setVisible("Please enter Valid card number 15 or 16 digits");
        return;
      } else if (!cvvRegex.test(cvv)) {
        setVisible("Please enter Valid CVV number 3 digits");
        return;
      } else if (!expirydateRegex.test(date)) {
        setVisible("Please enter Valid Expiry date MM/YY");
        return;
      } else if (!amount) {
        setVisible("Please enter amount (USD)");
        return;
      }

      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("bank", user?.bank?.id);

      const response = await fetch(`${route}/api/deposits/`, {
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
        setcardnumber("");
        setdate("");
        setcvv("");
        setVisible("Amount (USD) Added Successfuly");
      }
    } catch (e) {
      setVisible(e);
      setisloading(false);
    }
  };

  const handlecardnochange = (text) => {
    const rawValue = text.replace(/\s+/g, "");
    if (rawValue.length <= 16) {
      const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      setcardnumber(formattedValue);
    }
  };

  const handlecvvchange = (text) => {
    if (text.length <= 3) {
      setcvv(text);
    }
  };
  const handledatechange = (text) => {
    if (text.length <= 5) {
      setdate(text);
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
      <Text style={styles.text}>Add Money</Text>
      <Text style={styles.text_login}>
        Please fill up your card details to add money into your account
      </Text>
      <View>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          placeholder="XXXX XXXX XXXX XXXX"
          mode="outlined"
          keyboardType="numeric"
          value={cardnumber}
          onChangeText={handlecardnochange}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
        />
      </View>
      <View style={styles.flexview}>
        <View style={styles.flexitem}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={cvv}
            placeholder="XXX"
            onChangeText={handlecvvchange}
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            outlineColor="#49454F42"
            activeOutlineColor="#49454F42"
            cursorColor="#72777A"
          />
        </View>
        <View style={styles.flexitem}>
          <Text style={styles.label}>EXP</Text>
          <TextInput
            mode="outlined"
            value={date}
            placeholder="MM/YY"
            onChangeText={handledatechange}
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            outlineColor="#49454F42"
            activeOutlineColor="#49454F42"
            cursorColor="#72777A"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="Enter your Amount here (USD).."
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
        Add
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

export default AddMoney;

const styles = StyleSheet.create({
  mainview: {
    padding: 20,
    backgroundColor: "#0e683d",
    justifyContent: "center",
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    alignSelf: "center",
  },
  flexview: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexitem: {
    width: "40%",
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
