import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import FooterMenu from "../../components/Menu/FooterMenu";
import userIcon from "../../assets/user-icon.png";
import SubmitButton from "../../components/forms/SubmitButton";
import axios from "axios";

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const [name, setName] = useState(state?.user.name);
  const [password, setPassword] = useState(state?.user.password);
  const [email, setEmail] = useState(state?.user.email);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("update-user", {
        name,
        email,
        password,
      });
      Alert.alert(data.message);
      setState(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={userIcon} style={{ height: 200, width: 200 }} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            value={name}
            style={styles.inputBox}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput editable={false} value={email} style={styles.inputBox} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Pass</Text>
          <TextInput
            value={password}
            style={styles.inputBox}
            onChangeText={(pass) => {
              setPassword(pass);
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            editable={false}
            value={state?.user.role}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SubmitButton
            handleSubmit={handleSubmit}
            label="Update Profile"
            loading={loading}
          />
        </View>
      </ScrollView>
      <View style={styles.alignStyle}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  alignStyle: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 50,
  },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    marginHorizontal: 10,
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    width: 300,
    margin: "auto",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
});
export default Account;
