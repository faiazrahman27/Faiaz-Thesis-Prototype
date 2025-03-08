import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import {
  Button,
  TextInput,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { useAppcontext } from "../appcontext/useappcontext";
import Entypo from "@expo/vector-icons/Entypo";

function TransactionHistory({ navigation }) {
  const { route, token, user } = useAppcontext();

  const [callagain, setcallagain] = useState(false);
  const [data, setdata] = useState([]);
  const getdata = async () => {
    try {
      const response = await fetch(
        `${route}/api/bank/${user?.bank?.id}/transactions-history/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setdata(json);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getdata();
  }, [callagain]);

  return (
    <View style={styles.mainview}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/bijoypay.png")}
        />
      </View>
      <Text style={styles.heading}>Transaction History</Text>
      <View style={styles.view}>
        <Text style={{ ...styles.text, width: "40%" }}>Time & Date</Text>
        <Text style={styles.text}>Cash In / Out</Text>
        <Text style={styles.text}>Type</Text>
      </View>
      <FlatList
        onRefresh={() => {
          setcallagain(!callagain);
        }}
        refreshing={false}
        data={data}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={(data, index, separator) => {
          return (
            <View key={data.item?.date} style={styles.view}>
              <Text style={{ ...styles.text, width: "40%" }}>
                {data?.item?.date.substring(11, 19)}{" "}
                {new Date(
                  data?.item?.date.substring(0, 10)
                )?.toLocaleDateString("en-GB")}
              </Text>
              <Text style={styles.text}>
                {data?.item?.transaction_type == "Deposit" ||
                data?.item?.transaction_type == "Received"
                  ? "+"
                  : "-"}
                ${data?.item?.number?.toFixed(2)}
              </Text>
              <Text style={styles.text}>{data?.item?.transaction_type}</Text>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.homeiconview}
        onPress={() => navigation.navigate("home")}
      >
        <Entypo style={styles.homeicon} name="home" size={45} color="#0e683d" />
      </TouchableOpacity>
    </View>
  );
}

export default TransactionHistory;

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
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center",
  },

  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 40,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",

    width: "25%",
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
