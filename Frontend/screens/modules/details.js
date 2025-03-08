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
  MD3LightTheme as DefaultTheme,
  ActivityIndicator,
  PaperProvider,
} from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import { useAppcontext } from "../appcontext/useappcontext";
function Details({ navigation }) {
  const { user } = useAppcontext();
  const [email, setemail] = useState(user?.email);
  const [name, setname] = useState(user?.first_name);
  const [address, setaddress] = useState(user?.profile?.address);
  const [passport, setpassport] = useState(user?.profile?.passport_number);
  const [bloodgroup, setbloodgroup] = useState(user?.profile?.blood_group || "");
  const [occupation, setoccupation] = useState(user?.profile?.occupation);

  return (
    <ScrollView contentContainerStyle={styles.mainview} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/bijoypay.png")}
        />
      </View>
      <Text style={styles.text}>Your Account Details</Text>

      <View>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name here .."
          mode="outlined"
          value={name}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
          readOnly
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your Email here .."
          mode="outlined"
          testID="LoginEmailAddress"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
          readOnly
        />
      </View>

      <View>
        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="Enter your Address here .."
          mode="outlined"
          value={address}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
          readOnly
        />
      </View>
      <View>
        <Text style={styles.label}>Passport No.</Text>
        <TextInput
          placeholder="Enter your Passport No. here .."
          mode="outlined"
          value={passport}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
          readOnly
        />
      </View>
      <View>
        <Text style={styles.label}>Blood Group</Text>
        <TextInput
          placeholder="e.g., A+, O-."
          mode="outlined"
          value={bloodgroup}
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          outlineColor="#49454F42"
          activeOutlineColor="#49454F42"
          cursorColor="#72777A"
          readOnly

        />
      </View>
      <View>
        <Text style={styles.label}>Occupation</Text>
        <TextInput
          placeholder="Enter your Occupation  here .."
          mode="outlined"
          value={occupation}
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

export default Details;

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
  text: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  text_login: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    color: "#ffffff",
    backgroundColor: "#a5c6b6",
    marginBottom: 18,
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",

    marginBottom: 5,
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
