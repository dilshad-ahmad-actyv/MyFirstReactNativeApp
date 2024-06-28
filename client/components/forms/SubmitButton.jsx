import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ handleSubmit, label, loading }) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
      <Text style={styles.btnText}>{loading ? "Please wait..." : label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "#1e2225",
    height: 50,
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
    justifyContent: "center",
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "400",
    cursor: "pointer",
  },
});
export default SubmitButton;
