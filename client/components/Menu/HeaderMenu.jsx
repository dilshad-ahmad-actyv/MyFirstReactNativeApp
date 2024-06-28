import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  const handleLogOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    Alert.alert("Logout Successfully!");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogOut}>
        <FontAwesome5
          name="sign-out-alt"
          color={"red"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 30,
  },
});

export default HeaderMenu;
