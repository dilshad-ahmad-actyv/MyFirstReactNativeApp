import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const Login = ({ navigation }) => {
  //global conext
  const [state, setState] = useContext(AuthContext);
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all the fields!");
        setLoading(false);
        return;
      }
      console.log({ email, password });
      const { data } = await axios.post("/auth/login", { email, password });
      console.log("Login data ===>", data);
      setState(data);

      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      Alert.alert(data.message);
      navigation.navigate("Home");
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <InputBox
        label="Email"
        keyBoardType="email-address"
        autoComplete="email"
        value={email}
        setValue={setEmail}
      />
      <InputBox
        label="Password"
        secureTextEntry={true}
        autoComplete="password"
        value={password}
        setValue={setPassword}
      />
      <SubmitButton
        handleSubmit={handleSubmit}
        label="Login"
        loading={loading}
      />
      <Text style={styles.linkText}>
        Not registered please{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  linkText: {
    textAlign: "center",
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Login;
