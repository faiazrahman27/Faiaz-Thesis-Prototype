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
import { PaperSelect } from "react-native-paper-select";
import * as DocumentPicker from "expo-document-picker";
import { useAppcontext } from "../appcontext/useappcontext";
import { emailRegex, bloodGroupRegex } from "../utils";

function Signup({ navigation }) {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [passport, setpassport] = useState("");
  const [bloodgroup, setbloodgroup] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const { route } = useAppcontext();

  const [visible, setVisible] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [occupation, setoccupation] = useState({
    value: "",
    list: [
      { _id: "Student", value: "Student" },
      { _id: "Freelancer", value: "Freelancer" },
      { _id: "SME Owner", value: "SME Owner" },
      { _id: "Medical Purpose Acc Opening", value: "Medical Purpose Acc Opening" },
      { _id: "Other", value: "Other" },
    ],
    selectedList: [],
    error: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setSelectedFile({
        uri: result.assets[0].uri,
        name: result.assets[0].name,
      });
    }
  };

  const handlesubmit = async () => {
    try {
      if (
        !name ||
        !password ||
        !email ||
        !address ||
        !passport ||
        !bloodgroup ||
        !occupation.value
      ) {
        setVisible("Please fill all required fields!");
        return;
      }

      if (password.length < 6) {
        setVisible("Password should be at least 6 characters!");
        return;
      }
      if (!emailRegex.test(email)) {
        setVisible("Enter a valid email address.");
        return;
      }
      if (!bloodGroupRegex.test(bloodgroup)) {
        setVisible("Invalid blood group! Enter a valid type (e.g., A+, O-).");
        return;
      }
      if (!selectedFile) {
        setVisible("Upload a Verification Document.");
        return;
      }

      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("passport_number", passport);
      formData.append("blood_group", bloodgroup);
      formData.append("occupation", occupation.selectedList[0]?._id);
      formData.append("document", {
        uri: selectedFile.uri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      const response = await fetch(`${route}/api/signup/`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        setisloading(false);
        const errorMessage = json.message || "Signup failed! Please try again.";
        setVisible(errorMessage);
        return;
      }

      if (response.ok) {
        setisloading(false);
        navigation.navigate("login");
      }
    } catch (error) {
      setVisible(error.message || "An unexpected error occurred.");
      setisloading(false);
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: "black",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.mainview} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/bijoypay.png")}
          />
        </View>
        <Text style={styles.text}>Create a New Account</Text>
        <Text style={styles.text_login}>
          Don't have an Account? Sign Up here!
        </Text>
        <View>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your Full Name here .."
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
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your Email address here .."
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
            activeOutlineColor="#49454F42"
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
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Enter your Full Address here (with Post Code) .."
            mode="outlined"
            value={address}
            onChangeText={(text) => setaddress(text)}
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            outlineColor="#49454F42"
            activeOutlineColor="#49454F42"
            cursorColor="#72777A"
          />
        </View>
        <View>
          <Text style={styles.label}>Passport No.</Text>
          <TextInput
            placeholder="Enter your Passport No. here .."
            mode="outlined"
            value={passport}
            onChangeText={(text) => setpassport(text)}
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            outlineColor="#49454F42"
            activeOutlineColor="#49454F42"
            cursorColor="#72777A"
          />
        </View>
        <View>
          <Text style={styles.label}>Blood Group</Text>
          <TextInput
            placeholder="e.g., A+, O-."
            mode="outlined"
            value={bloodgroup}
            onChangeText={(text) => setbloodgroup(text)}
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            outlineColor="#49454F42"
            activeOutlineColor="#49454F42"
            cursorColor="#72777A"
          />
        </View>
        <View>
          <Text style={styles.label}>Occupation/Case</Text>
          <PaperSelect
            label="Select your Occupation/Case"
            value={occupation.value}
            onSelection={(value) => {
              setoccupation({
                ...occupation,
                value: value.text,
                selectedList: value.selectedList,
                error: "",
              });
            }}
            arrayList={[...occupation.list]}
            selectedArrayList={occupation.selectedList}
            errorText={occupation.error}
            multiEnable={false}
            textInputMode="outlined"
            textInputStyle={{
              color: "#ffffff",
              backgroundColor: "#a5c6b6",
            }}
            dialogStyle={{
              backgroundColor: "#ffffff",
            }}
            checkboxProps={{
              checkboxColor: "purple",
              checkboxUncheckedColor: "#000000",
            }}
            searchbarProps={{
              iconColor: "#000000",
              color: "#000000",
              cursorColor: "#000000",
            }}
          />
        </View>
        <Button
          buttonColor="#fff"
          textColor="black"
          mode="contained"
          disabled={isloading}
          onPress={pickDocument}
          style={{ ...styles.button, marginBottom: 9 }}
        >
          {selectedFile ? selectedFile.name : "Upload Verification Document"}
        </Button>

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
          Sign Up
        </Button>
        <Snackbar
          visible={!!visible}
          duration={3000}
          onDismiss={() => setVisible(null)}
          action={{
            label: "Undo",
            onPress: () => setVisible(null),
          }}
        >
          {typeof visible === "string" ? visible : "An error occurred"}
        </Snackbar>
      </ScrollView>
    </PaperProvider>
  );
}

export default Signup;

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
  button: {
    marginTop: 20,
    borderRadius: 14,
  },
});
