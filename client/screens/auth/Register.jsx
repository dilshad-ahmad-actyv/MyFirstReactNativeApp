import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/forms/InputBox";
import SubmitButton from "../../components/forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all the fields!");
        setLoading(false);
        return;
      }

      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      Alert.alert(data && data.message);
      navigation.navigate("Login");
      setLoading(false);
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <InputBox label="Name" value={name} setValue={setName} />
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
        label="Register"
        loading={loading}
      />
      <Text style={styles.linkText}>
        Already registered please{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
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
  loginLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Register;
